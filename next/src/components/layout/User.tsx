import { useTranslation } from 'react-i18next'

import Avatar from '@/components/ui/Avatar'
import Menu from '@/components/ui/Menu'
import LogoutIcon from '@/components/ui/icons/LogoutIcon'
import { User as UserType } from '@/hooks/useUser'
import { useOidc } from '@/lib/auth/oidc'

interface UserProps {
  user?: UserType
}

/** Compute initials of the current user to display as an avatar. */
export default function User({ user }: Readonly<UserProps>) {
  const { t } = useTranslation()
  const { isUserLoggedIn, logout = () => {} } = useOidc()
  const initials =
    user?.givenName && user?.familyName
      ? `${user.givenName.charAt(0).toUpperCase()}${user.familyName.charAt(0).toUpperCase()}`
      : ''

  function onLogout() {
    logout({
      redirectTo: 'home',
    })
  }

  return isUserLoggedIn ? (
    <Menu
      label="Open user navigation menu"
      items={[
        {
          label: t('common.logout'),
          Icon: <LogoutIcon height="17px" width="17px" />,
          onClick: onLogout,
        },
      ]}
    >
      <Avatar initials={initials} />
    </Menu>
  ) : null
}
