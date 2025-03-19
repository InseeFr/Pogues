import { Link } from '@tanstack/react-router';

import OpenInNewIcon from '@/components/ui/icons/OpenInNewIcon';
import { User as UserType } from '@/hooks/useAuth';

import User from './User';

interface HeaderProps {
  user?: UserType;
}

/**
 * Header of the application.
 *
 * It should contains buttons for actions that are often used or that have the
 * same use globally (e.g. create new questionnaire, see documentation...).
 */
export default function Header({ user }: Readonly<HeaderProps>) {
  const appVersion = import.meta.env.APP_VERSION;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] bg-negative text-negative fill-negative items-center">
      <div className="px-3 py-2">
        <h1>
          <Link to="/">Pogues</Link>
        </h1>{' '}
        <div className="text-sm">v{appVersion}</div>
      </div>
      <div className="flex justify-center gap-x-4">
        <a
          className="flex items-center hover:underline gap-x-1"
          href="https://inseefr.github.io/Bowie/1._Pogues/"
          target="_blank"
        >
          Documentation
          <div>
            <OpenInNewIcon height="16" width="16" />
          </div>
        </a>
      </div>
      <div className="p-3 grid grid-flow-col items-center gap-x-3">
        <User user={user} />
      </div>
    </div>
  );
}
