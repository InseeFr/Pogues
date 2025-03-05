import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables/variables';

import CreateCodesListCSVImport from './CreateCodesListCSVImport';
import CreateCodesListForm from './CreateCodesListForm';

interface CreateCodesListProps {
  questionnaireId: string;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
}

/**
 * Allow to create a new codes list (either by filling the form or by importing
 * a CSV).
 */
export default function CreateCodesList({
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<CreateCodesListProps>) {
  const { t } = useTranslation();

  return (
    <div>
      <ContentHeader title={t('codesList.create.title')} />
      <ContentMain>
        <CreateCodesListCSVImport />
        <div className="bg-default p-4 border border-default shadow-xl">
          <CreateCodesListForm
            questionnaireId={questionnaireId}
            formulasLanguage={formulasLanguage}
            variables={variables}
          />
        </div>
      </ContentMain>
    </div>
  );
}
