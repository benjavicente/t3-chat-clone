import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/org/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/org/create"!</div>
}
