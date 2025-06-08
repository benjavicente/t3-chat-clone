import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { convex } from "./client";
import { queryClient } from "./query";

export function AppConvexProvider({ children }: { children: React.ReactNode }) {
	return (
		<ConvexAuthProvider client={convex}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ConvexAuthProvider>
	);
}
