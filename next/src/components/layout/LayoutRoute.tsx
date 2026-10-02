import { Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

import Layout from '@/components/layout/Layout'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LayoutRoute() {
  useDocumentTitle()

  return (
    <Layout>
      <Outlet />
      <Toaster />
    </Layout>
  )
}
