import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createSystem = mutation({
    args: {
        title: v.string(),
        goalId: v.string(),
        userId: v.string()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("systems", {
            userId: args.userId,
            goalId: args.goalId,
            title: args.title
        })
    }
})