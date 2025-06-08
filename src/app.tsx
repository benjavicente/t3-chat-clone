import { useAuth } from "@/integrations/convex/auth";
import { AppConvexProvider } from "@/integrations/convex/provider";
import { queryClient } from "@/integrations/convex/query";
import { type Register, RouterProvider } from "@tanstack/react-router";
import { useMemo } from "react";
import type { RouterContext } from "./integrations/context";
import { merge } from "./integrations/merge";

export function App({ router }: { router: Register["router"] }) {
	return (
		<AppConvexProvider>
			<AppRouter router={router} />
		</AppConvexProvider>
	);
}

function AppRouter({ router }: { router: Register["router"] }) {
	const auth = useAuth();
	const context = useMemo<RouterContext>(
		() => ({
			auth,
			queryClient,
			queries: {},
			withAddedQueries(queries) {
				return { queries: merge(this.queries, queries) };
			},
		}),
		[auth],
	);
	return <RouterProvider router={router} context={context} />;
}
