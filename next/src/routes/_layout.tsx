import { createFileRoute } from '@tanstack/react-router'

import LayoutRoute from '../components/layout/LayoutRoute'

/** Display the global layout of the app, available on every pages. */
export const Route = createFileRoute('/_layout')({
  component: LayoutRoute,
})
