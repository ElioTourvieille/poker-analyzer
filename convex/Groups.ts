import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const createGroup = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.runQuery(internal.betterAuth.getSession, {
      sessionToken: args.sessionToken,
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const groupId = await ctx.db.insert("groups", {
      name: args.name,
      owner: args.userId,
      members: [args.userId],
      createdAt: Date.now(),
    });
    
    await ctx.db.patch(args.userId, {
      groupeId: groupId,
    });

    return groupId;
  },
});

export const getGroupsForUser = query({
  args: { 
    userId: v.id("users"),
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
      .query("groups")
      .withIndex("by_member", q => q.eq("members", [args.userId]))
      .collect();
  },
});
