import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/org/$organizationId/")({
	loader: async ({ params }) => {
		console.log(params);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authed/$org/"!</div>;
}
