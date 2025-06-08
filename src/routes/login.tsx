import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	beforeLoad: async ({ context }) => {
		const authed = await context.auth.waitAuthenticated();
		if (authed) throw redirect({ to: "/" });
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { signIn } = useAuthActions();
	return (
		<div>
			<h1>Login</h1>
			<button type="button" onClick={() => void signIn("github")}>
				Sign in with GitHub
			</button>
		</div>
	);
}
