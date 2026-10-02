import { Link, isMatch, useMatches } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

/**
 * Display the current breadcrumb of the app based on crumbs provided by the
 * route pages.
 *
 * Each crumb is clickable to navigate quickly to another part of the app.
 */
export default function Breadcrumb() {
  const { t } = useTranslation()
  const matches = useMatches()
  if (matches.some((match) => match.status === 'pending')) return null

  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, 'loaderData.crumb'),
  )

  return (
    <nav aria-label={t('common.breadcrumb')}>
      <ul className="flex gap-2 items-center">
        {matchesWithCrumbs.map((match, i) => {
          const isCurrent = i + 1 === matchesWithCrumbs.length
          return (
            <li className="flex gap-2" key={match.id}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="text-default font-semibold"
                >
                  {match.loaderData?.crumb}
                </span>
              ) : (
                <Link
                  className="text-action-primary font-semibold hover:underline"
                  to={match.fullPath}
                >
                  {match.loaderData?.crumb}
                </Link>
              )}
              {!isCurrent ? (
                <span className="text-disabled" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
