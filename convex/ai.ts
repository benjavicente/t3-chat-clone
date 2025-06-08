import { Agent } from "@convex-dev/agent";

import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { components } from "#convex/api";

export const ai = new Agent(components.agent, {
	// Default model
	chat: openai.chat("chatgpt-4o-latest"),
});
