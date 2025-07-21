import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import Avatar from '@/components/ui/Avatar';
import Dialog from '@/components/ui/Dialog';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isUserLoggedIn, logout } = useOidc();
  const initials = `${user?.givenName?.charAt(0).toUpperCase()}${user?.familyName?.charAt(0).toUpperCase()}`;

  function onLogout() {
    logout({
      redirectTo: 'home',
    });
    setDialogOpen(false);
  }
  return (
    <>
      <Menu
        items={[
          !isUserLoggedIn
            ? {
                label: t('common.login'),
                icon: <LogoutIcon />,
                onClick: () => {
                  // Not active yet, button will be set later
                },
              }
            : {
                label: t('common.logout'),
                icon: <LogoutIcon />,
                onClick: () => setDialogOpen(true),
              },
        ]}
      >
        <Avatar initials={initials} />
      </Menu>
      <Dialog
        label={t('common.logoutDialog.label')}
        title={t('common.logoutDialog.title')}
        body={t('common.logoutDialog.body')}
        onValidate={onLogout}
        controlledOpen={dialogOpen}
        setControlledOpen={setDialogOpen}
      />
    </>
  );
}
