import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { seriesQueryOptions } from '@/api/series'
import { stampsQueryOptions } from '@/api/stamps'
import ContentHeader from '@/components/layout/ContentHeader'
import ContentMain from '@/components/layout/ContentMain'
import CreateQuestionnaire from '@/components/questionnaires/create/CreateQuestionnaire'
import { loginLoader } from '@/utils/loginLoader'

export const Route = createFileRoute('/_layout/questionnaires/new')({
  component: RouteComponent,
  beforeLoad: async () => loginLoader(),
  loader: async ({ context: { t, user, queryClient } }) => {
    const [series, stamps] = await Promise.all([
      queryClient.fetchQuery(seriesQueryOptions()),
      queryClient.fetchQuery(stampsQueryOptions()),
    ])

    return {
      crumb: t('common.new'),
      userStamp: user!.stamp!,
      series,
      stamps,
    }
  },
})

function RouteComponent() {
  const { t } = useTranslation()
  const { userStamp, series, stamps } = Route.useLoaderData()
  return (
    <>
      <ContentHeader title={t('questionnaire.create.title')} />
      <ContentMain>
        <CreateQuestionnaire
          userStamp={userStamp}
          series={series}
          stamps={stamps}
        />
      </ContentMain>
    </>
  )
}
