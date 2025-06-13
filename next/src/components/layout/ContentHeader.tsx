import { useTranslation } from 'react-i18next';

import Breadcrumb from '@/components/ui/Breadcrumb';

interface ContentHeaderProps {
  /** Action to display on the right. Should be a button. */
  action?: React.ReactNode;
  /** Display a warning if the current content is readonly. */
  isReadonly?: boolean;
  title: string;
}

/** Header to use on top of the content. Display breadcrumb and custom title. */
export default function ContentHeader({
  action,
  isReadonly = false,
  title,
}: Readonly<ContentHeaderProps>) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] px-12 py-6 bg-default border-b border-default items-end">
        <div>
          <Breadcrumb />
          <h1>{title}</h1>
        </div>
        <div>{action}</div>
      </div>
      {isReadonly ? (
        <div className="px-12 p-3 bg-blue-200 border-b border-default">
          {t('common.versionIsOnReadonly')}
        </div>
      ) : null}
    </>
  );
}
