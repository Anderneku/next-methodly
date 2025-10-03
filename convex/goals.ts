import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createNewGoal = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("goals", {
      userId: args.userId,
      description: args.description,
      title: args.title,
    });
  },
});

export const getGoals = query({
    args: {
        userId: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("goals").withIndex("by_userId", q => q.eq("userId", args.userId)).collect();
    },
})
