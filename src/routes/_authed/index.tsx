import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/")({
	component: App,
	loader: async ({ context }) => {
		const orgs = await context.queryClient.fetchQuery(context.queries.organizations.list);
		if (orgs.length === 0) {
			throw redirect({ to: "/org/create" });
		}
		if (orgs.length === 1) {
			throw redirect({ to: "/org/$organizationId/chat", params: { organizationId: orgs[0]._id } });
		}
	},
});

function App() {
	const queries = Route.useRouteContext({ select: (context) => context.queries });
	const { data: organizations } = useSuspenseQuery(queries.organizations.list);

	return (
		<div className="text-center">
			<div>Select an organization</div>
			<div>
				{organizations.map((org) => (
					<div key={org._id}>
						<Link to="/org/$organizationId" params={{ organizationId: org._id }}>
							{org.name} ({org.membership.role})
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
