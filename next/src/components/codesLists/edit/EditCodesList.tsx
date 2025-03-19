import { useTranslation } from 'react-i18next';

import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import { CodesList } from '@/models/codesLists';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables/variables';

import EditCodesListForm from './EditCodesListForm';

interface EditCodesListProps {
  codesList?: CodesList;
  questionnaireId: string;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
}

/** Allow to edit an existing code list. */
export default function EditCodesList({
  codesList,
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<EditCodesListProps>) {
  const { t } = useTranslation();

  return (
    <>
      <ContentHeader
        title={t('codesList.edit.title', { label: codesList?.label })}
      />
      <ContentMain>
        {!codesList ? (
          <div>Not found</div>
        ) : (
          <div className="bg-default p-4 border border-default shadow-xl">
            <EditCodesListForm
              codesList={codesList}
              questionnaireId={questionnaireId}
              formulasLanguage={formulasLanguage}
              variables={variables}
            />
          </div>
        )}
      </ContentMain>
    </>
  );
}
