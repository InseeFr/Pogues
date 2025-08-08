import { useTranslation } from 'react-i18next';

import Avatar from '@/components/ui/Avatar';
import Menu from '@/components/ui/Menu';
import LogoutIcon from '@/components/ui/icons/LogoutIcon';
import { useOidc } from '@/contexts/oidc';
import { User as UserType } from '@/hooks/useAuth';

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
  const logoutEnabled = import.meta.env.VITE_ENABLE_LOGOUT === 'true';

  function onLogout() {
    logout({
      redirectTo: 'home',
    });
  }
  return (
    <Menu
      items={[
        !isUserLoggedIn
          ? {
              label: t('common.login'),
              icon: <LogoutIcon />,
              onClick: () => {
                // Not active yet, button will be set later
              },
              disabled: true,
            }
          : {
              label: t('common.logoutDialog.label'),
              icon: <LogoutIcon />,
              onClick: onLogout,
              disabled: !logoutEnabled,
            },
      ]}
    >
      <Avatar initials={initials} />
    </Menu>
  );
}
