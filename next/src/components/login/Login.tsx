import { useTranslation } from 'react-i18next';

import Button, { ButtonStyle } from '@/components/ui/Button';
import { useOidc } from '@/contexts/oidc';

export default function Login() {
  const { t } = useTranslation();

  const { login } = useOidc({ assert: 'user not logged in' });

  const onLogin = () => {
    login({
      redirectUrl: '/questionnaires',
      doesCurrentHrefRequiresAuth: false,
    });
  };

  return (
    <div className="text-center space-y-3">
      <p>{t('common.pleaseLogin')}</p>
      <Button onClick={onLogin} buttonStyle={ButtonStyle.Primary}>
        {t('common.login')}
      </Button>
    </div>
  );
}
