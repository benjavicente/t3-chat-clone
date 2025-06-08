import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { Suspense, use } from "react";
import { api } from "#convex/api";

export const Route = createFileRoute("/_authed/demo/convex")({
	component: App,
});

function Products() {
	const products = useQuery(api.products.get);
	const self = useQuery(api.users.self);

	return (
		<div>
			<h1>Convex Demo</h1>
			<h1>Welcome, {self?.name || "Guest"}!</h1>
			<h2>Products</h2>
			<ul>
				{(products || []).map((p) => (
					<li key={p._id}>
						{p.title} - {p.price}
					</li>
				))}
			</ul>
		</div>
	);
}

function App() {
	return (
		<div className="p-4">
			<Suspense fallback={<div>Loading...</div>}>
				<Products />
			</Suspense>
		</div>
	);
}
