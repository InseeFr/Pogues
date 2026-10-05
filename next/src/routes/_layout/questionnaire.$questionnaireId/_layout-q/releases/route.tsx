import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_layout/questionnaire/$questionnaireId/_layout-q/releases',
)({
  loader: async ({ context: { t } }) => {
    return { crumb: t('crumb.releases') }
  },
})
