import type { TableNames } from "#convex/dataModel";
import { internalMutation } from "#convex/server";

export const nuke = internalMutation({
	args: {},
	handler: async (ctx) => {
		const tables: TableNames[] = [
			"authAccounts",
			"authRateLimits",
			"authRefreshTokens",
			"authSessions",
			"authVerificationCodes",
			"authVerifiers",
			"organizationMemberships",
			"organizations",
			"users",
		];
		for (const table of tables) {
			for (const record of await ctx.db.query(table).collect()) {
				await ctx.db.delete(record._id);
			}
		}
	},
});
