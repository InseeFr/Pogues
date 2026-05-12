import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import z from 'zod'

import ContentMain from '@/components/layout/ContentMain'
import Login from '@/components/login/Login'
import { useOidc } from '@/lib/auth/oidc'

const loginSeachParamSchema = z.object({
  redirectUri: z.string().optional(),
})

export const Route = createFileRoute('/_layout/login')({
  component: RouteComponent,
  loader: ({ context: { t, user } }) => ({
    crumb: t('common.login'),
    userStamp: user!.stamp!,
  }),
  validateSearch: (search) => loginSeachParamSchema.parse(search),
})

function RouteComponent() {
  const navigate = useNavigate()
  const search = useSearch({ from: '/_layout/login' })
  const { isUserLoggedIn, login } = useOidc()

  const redirectUri = search.redirectUri || '/questionnaires'

  // In case we return with browser navigation to login page when use is loggedIn, fallback to redirectUri
  if (isUserLoggedIn) navigate({ to: redirectUri })

  const onLogin = () => {
    if (!isUserLoggedIn) login({ redirectUrl: redirectUri })
  }

  return (
    <ContentMain>
      <Login login={onLogin} />
    </ContentMain>
  )
}
