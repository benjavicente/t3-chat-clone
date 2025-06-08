import GitHub from "@auth/core/providers/github";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { customMutation, customQuery } from "convex-helpers/server/customFunctions";
import { ConvexError } from "convex/values";
import { type MutationCtx, mutation, query } from "#convex/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [GitHub],
	callbacks: {
		afterUserCreatedOrUpdated: async (ctx: MutationCtx, { userId, existingUserId }) => {
			if (existingUserId) {
				// Already exists, no need to setup
				return;
			}

			const user = await ctx.db.get(userId);
			if (!user) throw new Error("User not found after creation or update");

			const orgId = await ctx.db.insert("organizations", {
				name: `${user.name}'s Org`,
			});

			await ctx.db.insert("organizationMemberships", { userId, orgId, role: "admin" });
		},
	},
});

export const authedQuery = customQuery(query, {
	args: {},
	input: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) throw new ConvexError("User not authenticated");
		const user = await ctx.db.get(userId);
		if (!user) throw new ConvexError("User not found");

		return { ctx: { user }, args: {} };
	},
});

authedQuery({
	handler(ctx, args_0) {
		ctx.user;
	},
});

export const authedMutation = customMutation(mutation, {
	args: {},
	input: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) throw new ConvexError("User not authenticated");
		const user = await ctx.db.get(userId);
		if (!user) throw new ConvexError("User not found");
		return { ctx: { user }, args: {} };
	},
});
