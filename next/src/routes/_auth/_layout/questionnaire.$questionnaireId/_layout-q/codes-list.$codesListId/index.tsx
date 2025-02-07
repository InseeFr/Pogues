import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello
      "/_auth/_layout/questionnaire/$questionnaireId/_layout-q/codes-list/$codesListId/"!
    </div>
  );
}
