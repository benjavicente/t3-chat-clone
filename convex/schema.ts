import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,
	users: defineTable({
		name: v.string(),
		image: v.optional(v.string()),
		email: v.string(),
		emailVerificationTime: v.optional(v.number()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.number()),
		isAnonymous: v.optional(v.boolean()),
	}).index("email", ["email"]),
	organizations: defineTable({
		name: v.string(),
	}),
	organizationMemberships: defineTable({
		userId: v.id("users"),
		orgId: v.id("organizations"),
		role: v.union(v.literal("admin"), v.literal("member")),
	})
		.index("userId", ["userId", "orgId"])
		.index("orgId", ["orgId"]),
	products: defineTable({
		title: v.string(),
		imageId: v.string(),
		price: v.number(),
	}),
});
