import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";

export const createHand = mutation({
    args: {
        userId: v.id("users"),
        groupId: v.id("groups"),
        stackSize: v.number(),
        actions: v.array(v.string()),
        vilainInfo: v.optional(v.string()),
        result: v.optional(v.string()),
        notes: v.optional(v.string()),
        sessionToken: v.string(),
    },
    handler: async (ctx, args) => {
        const session = await ctx.runQuery(internal.betterAuth.getSession, {
            sessionToken: args.sessionToken,
        });

        if (!session) {
            throw new Error("Unauthorized");
        }

        const handId = await ctx.db.insert("hands", {
            userId: args.userId,
            groupId: args.groupId,
            stackSize: args.stackSize,
            actions: args.actions,
            vilainInfo: args.vilainInfo,
            result: args.result,
            notes: args.notes,
            createdAt: Date.now(),
        });

        return handId;
    }
})

export const getHandsByGroup = query({
    args: { 
        groupId: v.id("groups"),
        sessionToken: v.string(),
    },
    handler: async (ctx, args) => {
        const session = await ctx.runQuery(internal.betterAuth.getSession, {
            sessionToken: args.sessionToken,
        });

        if (!session) {
            throw new Error("Unauthorized");
        }

        return await ctx.db
            .query("hands")
            .withIndex("by_group", q => q.eq("groupId", args.groupId))
            .order("desc")
            .collect();
    },
});
  