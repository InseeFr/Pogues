import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables';

import CreateCodesListForm from './CreateCodesListForm';

interface CreateCodesListProps {
  questionnaireId: string;
  formulasLanguage?: FormulasLanguages;
  variables: Variable[];
}

/** Allow to create a new codes list through a form. */
export default function CreateCodesList({
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<CreateCodesListProps>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateCodesListForm
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
      />
    </div>
  );
}
