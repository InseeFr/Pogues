import { useRouteMatch } from 'react-router-dom';

/**
 * Whether or not the app is currently on readonly.
 *
 * It should be readonly when one is browsing an older version.
 */
export const useReadonly = () => {
  const { path } = useRouteMatch();
  const isVersionPage = path.startsWith(
    '/questionnaire/:id/version/:versionId',
  );
  return isVersionPage;
};
