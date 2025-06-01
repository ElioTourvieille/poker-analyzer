import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createGroup = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity();
    if (!userId) {
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
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
      const user = await ctx.auth.getUserIdentity();
      if (!user) throw new Error("Not authenticated");
  
      return await ctx.db
        .query("groups")
        .withIndex("by_member", q => q.eq("members", [user.subject as Id<"users">]))
        .collect();
    },
  });
