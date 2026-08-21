import {
  ErrorComponent as RouteErrorComponent,
  createFileRoute,
} from '@tanstack/react-router'

import ContactUs from '@/components/contactUs/ContactUs'
import ContentMain from '@/components/layout/ContentMain'
import ErrorComponent, {
  type LegacyPoguesError,
} from '@/components/layout/ErrorComponent'

const notFoundError: LegacyPoguesError = {
  name: 'NotFoundError',
  message: 'Not found',
  statusCode: 404,
}

export const Route = createFileRoute('/_layout/contactUs')({
  component: RouteComponent,
  errorComponent: ({ error }) => <RouteErrorComponent error={error} />,
  loader: ({ context: { t } }) => ({
    crumb: t('common.contactUs.title'),
  }),
})

function RouteComponent() {
  const isContactEnabled = import.meta.env.VITE_ENABLE_CONTACT

  if (!isContactEnabled) {
    return <ErrorComponent error={notFoundError} />
  }

  return (
    <ContentMain>
      <ContactUs />
    </ContentMain>
  )
}
