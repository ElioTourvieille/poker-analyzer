import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    groupeId: v.optional(v.id("groups")),
  }),

  groups: defineTable({
    name: v.string(),
    owner: v.id("users"),
    members: v.array(v.id("users")),
    createdAt: v.number(),
  }).index("by_member", ["members"]),

  hands: defineTable({
    userId: v.id("users"),
    groupId: v.optional(v.id("groups")),
    stackSize: v.number(),
    actions: v.array(v.string()),
    vilainInfo: v.optional(v.string()),
    result: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_group", ["groupId"]),

  comments: defineTable({
    handId: v.id("hands"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  }),
});
