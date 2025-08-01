import { defaultArticulationItems } from '@/models/articulation';
import { Variable } from '@/models/variables';

import ArticulationForm, { FormValues } from '../form/ArticulationForm';

interface CreateArticulationProps {
  questionnaireId: string;
  variables?: Variable[];
}

/** Allow to create articulation */
export default function CreateArticulation({
  questionnaireId,
  variables,
}: Readonly<CreateArticulationProps>) {
  // TODO : handle submit when endpoint will exist.
  // for now : just log form values to see the output
  const onSubmit = (items: FormValues) => {
    console.log(items);
  };

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <ArticulationForm
        questionnaireId={questionnaireId}
        articulationItems={defaultArticulationItems}
        variables={variables}
        onSubmit={onSubmit}
      />
    </div>
  );
}
