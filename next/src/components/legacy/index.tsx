// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Main } from '@pogues-legacy/App';
import { ErrorBoundary } from 'react-error-boundary';

export const LegacyComponent = () => {
  return (
    <ErrorBoundary
      fallback={
        <div>
          Un problème est survenu, si le problème persiste, veuillez contacter
          l'assistance.
        </div>
      }
    >
      <Main />
    </ErrorBoundary>
  );
};
