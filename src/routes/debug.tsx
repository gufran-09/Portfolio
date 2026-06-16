import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/debug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/debug"!</div>
}
