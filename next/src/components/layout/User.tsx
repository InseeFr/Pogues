import { useTranslation } from 'react-i18next';

import Avatar from '@/components/ui/Avatar';
import Menu from '@/components/ui/Menu';
import LogoutIcon from '@/components/ui/icons/LogoutIcon';
import { User as UserType } from '@/hooks/useAuth';
import { useOidc } from '@/lib/auth/oidc';

interface UserProps {
  user?: UserType;
}

/** Compute initials of the current user to display as an avatar. */
export default function User({ user }: Readonly<UserProps>) {
  const { t } = useTranslation();
  const { isUserLoggedIn, logout } = useOidc();
  const initials =
    user?.givenName && user?.familyName
      ? `${user.givenName.charAt(0).toUpperCase()}${user.familyName.charAt(0).toUpperCase()}`
      : '';

  function onLogout() {
    logout({
      redirectTo: 'home',
    });
  }

  return isUserLoggedIn ? (
    <Menu
      items={[
        {
          label: t('common.logout'),
          icon: <LogoutIcon />,
          onClick: onLogout,
        },
      ]}
    >
      <Avatar initials={initials} />
    </Menu>
  ) : null;
}
