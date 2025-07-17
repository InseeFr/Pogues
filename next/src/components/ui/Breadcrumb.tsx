import { Link, isMatch, useMatches } from '@tanstack/react-router';

/**
 * Display the current breadcrumb of the app based on crumbs provided by the
 * route pages.
 *
 * Each crumb is clickable to navigate quickly to another part of the app.
 */
export default function Breadcrumb() {
  const matches = useMatches();
  if (matches.some((match) => match.status === 'pending')) return null;

  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, 'loaderData.crumb'),
  );

  return (
    <nav>
      <ul className="flex gap-2 items-center">
        {matchesWithCrumbs.map((match, i) => (
          <li className="flex gap-2" key={match.id}>
            <Link
              className="text-action-primary last:text-default font-semibold"
              to={match.fullPath}
            >
              {match.loaderData?.crumb}
            </Link>
            {i + 1 < matchesWithCrumbs.length ? (
              <span className="text-disabled" aria-current="page">
                {'/'}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
