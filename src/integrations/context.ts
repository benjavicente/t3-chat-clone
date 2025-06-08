import type { convexQuery } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import type { useAuth } from "./convex/auth";
import type { MergeTwo } from "./merge";

type Queries = Record<string, ReturnType<typeof convexQuery>>;

export interface RouterContext<Q extends Queries = Queries> {
	auth: ReturnType<typeof useAuth>;
	queryClient: QueryClient;
	queries: Q;
	/* Return this to inject queries to the current context */
	withAddedQueries<NewQ>(queries: NewQ): { queries: MergeTwo<Queries, NewQ> };
}
