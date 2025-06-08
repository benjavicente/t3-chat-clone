import { convexQuery } from "@convex-dev/react-query";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "#convex/api";

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ context }) => {
		const authed = await context.auth.waitAuthenticated();
		if (!authed) throw redirect({ to: "/login" });

		return context.withAddedQueries({
			organizations: {
				list: convexQuery(api.organizations.list, {}),
			},
			users: {
				self: convexQuery(api.users.self, {}),
			},
		});
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
