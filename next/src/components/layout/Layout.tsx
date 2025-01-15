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
    <div className="bg-main">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
}
