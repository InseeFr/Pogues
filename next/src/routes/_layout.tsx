import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

import { DirtyStateDialog } from '@/components/dirtyState/DirtyStateDialog';
import Layout from '@/components/layout/Layout';

/** Display the global layout of the app, available on every pages. */
export const Route = createFileRoute('/_layout')({
  component: () => (
    <Layout>
      <DirtyStateDialog />
      <Outlet />
      <Toaster />
    </Layout>
  ),
});
