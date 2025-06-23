import { useRouteContext } from '@tanstack/react-router';

import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

/** Global layout of the app, used for every page. */
export default function Layout({ children }: Readonly<LayoutProps>) {
  const { user } = useRouteContext({
    from: '__root__',
  });
  return (
    <div className="grid grid-rows-[var(--header-height)_1fr] h-screen bg-main">
      <Header user={user} />
      <main className="bg-main">{children}</main>
    </div>
  );
}
