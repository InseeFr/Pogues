// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Main } from '@pogues-legacy/App';
import { createFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';

export const Route = createFileRoute(
  '/questionnaire/$questionnaireId/tcm-composition',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ErrorBoundary
      fallback={<div>Le vieux Pogues n'est pas disponible en mode dev.</div>}
    >
      <Main />
    </ErrorBoundary>
  );
}
