import { useMatches } from '@tanstack/react-router'

import { useEffect } from 'react'

export function useDocumentTitle() {
  const matches = useMatches()

  const crumb = [...matches]
    .reverse()
    .map((match) => (match.loaderData as { crumb?: string } | undefined)?.crumb)
    .find((crumb): crumb is string => Boolean(crumb))

  useEffect(() => {
    document.title = crumb ? `${crumb} - Pogues` : 'Pogues'
  }, [crumb])
}
