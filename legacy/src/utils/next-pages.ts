import { createContext, useContext, useMemo } from 'react';

/**
 * Whether loops are created and edited in the pages of the new application
 * instead of the legacy modals.
 */
export function isNextLoopPageEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_NEXT_LOOP_PAGE === 'true';
}

/**
 * Navigate to a page of the new application.
 *
 * The legacy router does not share its history with the router of the new
 * application, so the new application provides its own navigation function
 * when it loads the legacy app. This avoids a full page reload (which would
 * re-run the whole OIDC flow).
 *
 * Defaults to a full page load when legacy is run standalone.
 */
export const NextNavigationContext = createContext<(path: string) => void>(
  (path) => window.location.assign(path),
);

/** Navigation functions to the pages of the new application. */
export function useNextPages() {
  const navigateToNextPage = useContext(NextNavigationContext);

  return useMemo(
    () => ({
      /** Navigate to the page of the new application for creating a loop. */
      navigateToNewLoopPage: (questionnaireId: string) =>
        navigateToNextPage(`/questionnaire/${questionnaireId}/loops/new`),
      /** Navigate to the page of the new application for editing a loop. */
      navigateToEditLoopPage: (questionnaireId: string, loopId: string) =>
        navigateToNextPage(
          `/questionnaire/${questionnaireId}/loops/loop/${loopId}`,
        ),
    }),
    [navigateToNextPage],
  );
}
