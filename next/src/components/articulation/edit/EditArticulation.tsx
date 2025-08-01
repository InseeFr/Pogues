import { ArticulationItems } from '@/models/articulation';
import { Variable } from '@/models/variables';

import ArticulationForm, { FormValues } from '../form/ArticulationForm';

interface EditArticulationProps {
  questionnaireId: string;
  variables?: Variable[];
  articulationItems?: ArticulationItems;
}

/** Allow to edit articulation variables */
export default function EditArticulation({
  questionnaireId,
  variables,
  articulationItems,
}: Readonly<EditArticulationProps>) {
  // TODO : add submit function when endpoint will exist.
  // for now : just log form values to see the output
  const onSubmit = (items: FormValues) => {
    console.log(items);
  };

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <ArticulationForm
        questionnaireId={questionnaireId}
        articulationItems={articulationItems}
        variables={variables}
        onSubmit={onSubmit}
      />
    </div>
  );
}
