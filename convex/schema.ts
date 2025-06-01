import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  hands: defineTable({
    id: v.string(),
    player: v.string(),
    hand: v.string(),
    flop: v.string(),
    turn: v.string(),
    river: v.string(),
    actions: v.array(v.string()),
    result: v.string(),
    date: v.string(),
    tournament: v.optional(v.string()),
    buyIn: v.optional(v.number()),
    notes: v.optional(v.string()),
  }),
});
