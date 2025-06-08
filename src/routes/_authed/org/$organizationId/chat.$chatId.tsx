import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authed/org/$organizationId/chat/$chatId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/org/$organizationId/chat/$chatId"!</div>
}
