import { createFileRoute } from '@tanstack/react-router'

// This is used only for the crumb part, ignore it
// There is no loops overview page yet, so its crumb must not be clickable
export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/loops',
)({
  loader: ({ context: { t } }) => ({
    crumb: t('crumb.loops'),
    disableCrumbLink: true,
  }),
})
