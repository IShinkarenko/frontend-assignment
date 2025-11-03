import { Outlet } from '@tanstack/react-router'
import { RootLayout } from 'src/layouts/RootLayout'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
})
