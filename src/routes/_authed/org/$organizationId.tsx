import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { api } from "#convex/api";
import type { Id } from "#convex/dataModel";

export const Route = createFileRoute("/_authed/org/$organizationId")({
	beforeLoad: ({ context, params }) =>
		context.withAddedQueries({
			threads: {
				list: convexQuery(api.threads.list, { organizationId: params.organizationId as Id<"organizations"> }),
			},
		}),
	loader: async ({ params, context }) => {
		await context.queryClient.prefetchQuery(context.queries.threads.list);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const queries = Route.useRouteContext({ select: (context) => context.queries });
	// const { data: threads } = useSuspenseQuery(queries.threads.list);

	return (
		<div className="size-full bg-stone-900 flex">
			<div className="w-md">{/* <div>{threads}</div> */}</div>
			<div className="bg-stone-800 fl">
				<Outlet />
			</div>
		</div>
	);
}
