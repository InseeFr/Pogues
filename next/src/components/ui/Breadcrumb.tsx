import { Link, isMatch, useMatches } from '@tanstack/react-router';

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
              className="text-action-primary font-semibold last:text-default"
              from={match.fullPath}
            >
              {match.loaderData?.crumb}
            </Link>
            {i + 1 < matchesWithCrumbs.length ? (
              <span className="text-disabled">{'/'}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
