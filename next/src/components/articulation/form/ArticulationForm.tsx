import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Form from '@/components/ui/form/Form';
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
    clearErrors,
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted },
    setError,
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
        <Controller
          key={item.label}
          name={`items.${index as 0 | 1 | 2}.value`} // not clean, but by default it does not understand there are only those 3 index values
          control={control}
          render={({
            field: { name, value, onChange },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <VTLEditor
              clearErrors={() => clearErrors(name)}
              dirty={isDirty}
              error={error}
              invalid={invalid}
              label={<ArticulationVariableLabel label={item.label} />}
              name={name}
              onChange={onChange}
              required
              setError={(error) => setError(name, error)}
              suggestionsVariables={variables}
              touched={isTouched}
              value={value}
            />
          )}
        />
      ))}
    </Form>
  );
}
