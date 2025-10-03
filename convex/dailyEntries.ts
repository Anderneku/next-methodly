import { v, VObject } from "convex/values";
import { mutation, query } from "./_generated/server";
import { title } from "process";

type SystemObject = {
  id: string;
  title: string;
  completed: boolean;
};

type GoalObject = {
  goalId: string;
  goalTitle: string;
  systems: SystemObject[];
};

export const createDailyEntry = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const [year, month, day] = formattedDate.split("-");
    const exists = await ctx.db
      .query("daily_entries")
      .withIndex("by_date_userId", (q) =>
        q.eq("date", formattedDate).eq("userId", args.userId)
      )
      .first();
    if (exists) return;

    const goals = await ctx.db
      .query("goals")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const goalsArray: GoalObject[] = [];

    for (const goal of goals) {
      const goalObj = {} as GoalObject;
      goalObj.goalId = goal._id;
      goalObj.goalTitle = goal.title;
      const systemsArray: SystemObject[] = [];
      const systems = await ctx.db
        .query("systems")
        .withIndex("by_userId_goalId", (q) =>
          q.eq("userId", args.userId).eq("goalId", goal._id)
        )
        .collect();
      for (const system of systems) {
        systemsArray.push({
          id: crypto.randomUUID().toString(),
          title: system.title,
          completed: false,
        });
      }
      goalObj.systems = systemsArray;
      goalsArray.push(goalObj);
    }
    await ctx.db.insert("daily_entries", {
      date: formattedDate,
      year: year,
      month: month,
      userId: args.userId,
      status: goalsArray,
    });
  },
});

export const getTodaysEntry = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    return await ctx.db
      .query("daily_entries")
      .withIndex("by_date_userId", (q) =>
        q.eq("date", formattedDate).eq("userId", args.userId)
      )
      .first();
  },
});

export const updateCheckbox = mutation({
  args: {
    systemId: v.string(),
    goalId: v.string(),
    entryId: v.id("daily_entries"),
  },
  handler: async (ctx, args) => {
    const TodayEntry = await ctx.db.get(args.entryId);
    if (!TodayEntry) throw new Error("Entry Not Found");

    const updatedTodayEntry = TodayEntry.status.map((goal) => {
      if (goal.goalId == args.goalId) {
        return {
          ...goal,
          systems: goal.systems.map((system) => {
            return system.id == args.systemId
              ? { ...system, completed: !system.completed }
              : system;
          }),
        };
      }
      return goal;
    });
    await ctx.db.patch(args.entryId, { status: updatedTodayEntry });
  },
});

export const syncDailyEntryGoals = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const currentEntry = await ctx.db
      .query("daily_entries")
      .withIndex("by_date_userId", (q) =>
        q.eq("date", formattedDate).eq("userId", args.userId)
      )
      .first();
    if (!currentEntry) throw new Error("Daily entry not found");

    // Get all goals (even the newly created one)
    const allGoals = await ctx.db
      .query("goals")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
    // Get all goal ids in the current daily entry (that doesnt have the new goal's id)
    const existingGoalIds = new Set(
      currentEntry.status.map((goal) => goal.goalId)
    );
    // add all goals that it's id isnt in existing goal ids in the entry, to the newGoals array (new goals)
    const newGoals = allGoals.filter((goal) => !existingGoalIds.has(goal._id));

    const updatedStatusItems = newGoals.map((goal) => {
      return {
        goalId: goal._id,
        goalTitle: goal.title,
        systems: [],
      };
    });
    await ctx.db.patch(currentEntry._id, {
      status: [...currentEntry.status, ...updatedStatusItems],
    });
  },
});

export const syncDailyEntrySystems = mutation({
  args: {
    userId: v.string(),
    goalId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the current entry
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const currentEntry = await ctx.db
      .query("daily_entries")
      .withIndex("by_date_userId", (q) =>
        q.eq("date", formattedDate).eq("userId", args.userId)
      )
      .first();
    if (!currentEntry) throw new Error("Daily entry not found");

    // Get all the systems
    const allSystems = await ctx.db
      .query("systems")
      .withIndex("by_userId_goalId", (q) =>
        q.eq("userId", args.userId).eq("goalId", args.goalId)
      )
      .collect();
    // Get all Ids of all
    const existingSystemIds = new Set();
    for (const goal of currentEntry.status) {
      if (goal.goalId == args.goalId) {
        for (const system of goal.systems) {
          existingSystemIds.add(system.id);
        }
      }
    }

    // Create newSystems array of systems whose ids arent in the current entry
    const newSystems = allSystems.filter(
      (system) => !existingSystemIds.has(system._id)
    );

    // Update the system
    const updatedStatus = currentEntry.status.map((goal) => {
      if (goal.goalId == args.goalId) {
        return {
          ...goal,
          systems: [
            ...goal.systems,
            ...newSystems.map((system) => ({
              id: system._id,
              title: system.title,
              completed: false,
            })),
          ],
        };
      }
      return goal;
    });
    await ctx.db.patch(currentEntry._id, { status: updatedStatus });
  },
});

export const getSystems = query({
  args: {
    userId: v.string(),
    goalId: v.string(),
  },
  handler: async (ctx, args) => {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const currentEntry = await ctx.db
      .query("daily_entries")
      .withIndex("by_date_userId", (q) =>
        q.eq("date", formattedDate).eq("userId", args.userId)
      )
      .first();
    if (!currentEntry) throw new Error("Daily entry not found");

    const systemsList: SystemObject[] = [];
    for (const goal of currentEntry.status) {
      if (goal.goalId == args.goalId) {
        for (const system of goal.systems) {
          systemsList.push(system);
        }
      }
    }
    return systemsList;
  },
});

