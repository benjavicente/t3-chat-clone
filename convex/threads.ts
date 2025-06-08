import { google } from "@ai-sdk/google";
import { v } from "convex/values";
import { mutation, query } from "#convex/server";
import { ai } from "./ai";

export const list = query({
	args: {
		organizationId: v.id("organizations"),
	},
	handler: async (ctx) => {},
});

export const create = mutation({
	args: {},
	handler: async (ctx): Promise<{ threadId: string }> => {
		const userId = await getUserId(ctx);
		// Start a new thread for the user.
		const { threadId } = await ai.createThread(ctx, { userId });
		ai.generateText(
			ctx,
			{},
			{
				model: google.chat("gemini-2.5-flash-preview-04-17"),
			},
		);
		return { threadId };
	},
});
