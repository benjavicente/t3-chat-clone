import { getAuthUserId } from "@convex-dev/auth/server";
import { customCtx, customQuery } from "convex-helpers/server/customFunctions";
import { ConvexError, v } from "convex/values";
import { query } from "#convex/server";
import { authedQuery } from "./auth";

export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) return [];

		const memberships = await ctx.db
			.query("organizationMemberships")
			.withIndex("userId", (q) => q.eq("userId", userId))
			.collect();

		return Promise.all(
			memberships.map(async (membership) => {
				const org = await ctx.db.get(membership.orgId);
				if (!org) throw new Error(`Organization with ID ${membership.orgId} not found`);

				return {
					...org,
					membership: {
						role: membership.role,
					},
				};
			}),
		);
	},
});

export const insideOrganizationQuery = customQuery(authedQuery, {
	args: { organizationId: v.id("organizations") },

	input: async (ctx, { organizationId }) => {
		console.log(ctx.user);
		// const membership = await ctx.db
		// 	.query("organizationMemberships")
		// 	.withIndex("userId", (q) => q.eq("userId", ctx.user._id).eq("orgId", organizationId))
		// 	.unique();

		// if (!membership) {
		// 	throw new ConvexError("User is not a member of the organization");
		// }

		// const organization = await ctx.db.get(organizationId);
		// if (!organization) {
		// 	throw new Error(`Organization with ID ${organizationId} not found`);
		// }

		return { ctx: { organization: null }, args: {} };
	},
});

export const get = insideOrganizationQuery({
	handler(ctx) {
		console.log(ctx.organization, ctx.user);
	},
});
