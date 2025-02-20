import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';

import CreateCodesListCSVImport from './CreateCodesListCSVImport';
import CreateCodesListForm from './CreateCodesListForm';

interface CreateCodesListProps {
  questionnaireId: string;
}

/**
 * Allow to create a new codes list (either by filling the form or by importing
 * a CSV).
 */
export default function CreateCodesList({
  questionnaireId,
}: Readonly<CreateCodesListProps>) {
  const { t } = useTranslation();

  return (
    <div>
      <ContentHeader title={t('codesList.create.title')} />
      <ContentMain>
        <CreateCodesListCSVImport />
        <div className="bg-default p-4 border border-default shadow-xl">
          <CreateCodesListForm questionnaireId={questionnaireId} />
        </div>
      </ContentMain>
    </div>
  );
}
