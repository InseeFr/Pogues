import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

import Layout from '@/components/layout/Layout';

/** Display the global layout of the app, available on every pages. */
export const Route = createFileRoute('/_auth/_layout')({
  component: () => (
    <Layout>
      <Outlet />
      <Toaster />
    </Layout>
  ),
});
