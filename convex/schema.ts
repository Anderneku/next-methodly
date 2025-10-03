import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
  }).index("by_clerkId", ["clerkId"]),

  goals: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.string()
  }).index("by_userId", ["userId"]),

  systems: defineTable({
    userId: v.string(),
    goalId: v.string(),
    title: v.string()
  }).index("by_userId_goalId", ["userId", "goalId"]),

  daily_entries: defineTable({
    userId: v.string(),
    date: v.string(),
    year: v.string(),
    month: v.string(),
    status: v.array(
        v.object({
            goalId: v.string(),
            goalTitle: v.string(),
            systems: v.array(
                v.object({
                    id: v.string(),
                    title: v.string(),
                    completed: v.boolean()
                })
            )
        })
    )
  }).index("by_date_userId", ["date", "userId"]).index("by_userId_year", ["userId", "year"])
});
