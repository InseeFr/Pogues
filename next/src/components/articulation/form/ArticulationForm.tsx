import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/ui/form/Form';
import Label from '@/components/ui/form/Label';
import VTLEditor from '@/components/ui/form/VTLEditor';
import {
  type ArticulationItems,
  defaultArticulationItems,
} from '@/models/articulation';
import type { Variable } from '@/models/variables';

import ArticulationVariableLabel from '../ArticulationVariableLabel';
import { type FormValues, schema } from './schema';

interface ArticulationFormProps {
  questionnaireId: string;
  articulationItems?: ArticulationItems;
  variables?: Variable[];
  onSubmit: SubmitHandler<FormValues>;
}

export default function ArticulationForm({
  questionnaireId,
  articulationItems = defaultArticulationItems,
  variables = [],
  onSubmit,
}: Readonly<ArticulationFormProps>) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { items: defaultArticulationItems },
    values: { items: articulationItems },
  });

  const handleCancel = () => {
    navigate({
      to: '/questionnaire/$questionnaireId/articulation',
      params: { questionnaireId },
      ignoreBlocker: true,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      isDirty={isDirty}
      isValid={isValid}
      isSubmitted={isSubmitted}
    >
      {articulationItems.map((item, index) => (
        <div key={item.label} className="space-y-1">
          <Label className="block font-semibold text-sm" required>
            <ArticulationVariableLabel label={item.label} />
          </Label>
          <Controller
            name={`items.${index as 0 | 1 | 2}.value`} // not clean, but by default it does not understand there are only those 3 index values
            control={control}
            render={({ field, fieldState: { error } }) => (
              <VTLEditor
                className="h-20"
                error={error?.message}
                data-testid={`items.${index}.value`}
                suggestionsVariables={variables}
                {...field}
              />
            )}
          />
        </div>
      ))}
    </Form>
  );
}
