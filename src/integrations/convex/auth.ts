import { useConvexAuth } from "convex/react";
import { useRef, useState } from "react";

export function useAuth() {
	const authState = useConvexAuth();
	const [prevLoadingState, setPrevLoadingState] = useState(authState.isLoading);
	const resolvers = useRef(Promise.withResolvers<boolean>());

	if (authState.isLoading !== prevLoadingState) {
		if (authState.isLoading) {
			// isLoading went back to a loading state, reset promise
			resolvers.current = Promise.withResolvers<boolean>();
		} else {
			// Auth is ready, resolve
			resolvers.current.resolve(authState.isAuthenticated);
		}
		setPrevLoadingState(authState.isLoading);
	}

	return {
		waitAuthenticated: () => resolvers.current.promise,
	};
}
