import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { getInitialCsvSchema } from '@/api/personalize';
import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import Input from '@/components/ui/form/Input';
import Option from '@/components/ui/form/Option';
import Select from '@/components/ui/form/Select';
import {
  PersonalizationQuestionnaire,
  SurveyContext,
} from '@/models/personalizationQuestionnaire';

interface PersonalizationProps {
  questionnaireId: string;
  data: PersonalizationQuestionnaire;
}

/** Display the personalization windows */
export default function CreatePersonalization({
  questionnaireId,
  data,
}: Readonly<PersonalizationProps>) {
  const { t } = useTranslation();
  const emptyFileInputRef = useRef<HTMLInputElement>(null);
  const surveyContext: SurveyContext[] = [
    {
      name: 'HOUSEHOLD',
      value: 'Ménage',
    },
    {
      name: 'BUSINESS',
      value: 'Entreprise',
    },
  ];

  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const onContextChange = (context: SurveyContext) => {
    setQuestionnaire({
      ...questionnaire,
      context: {
        ...(questionnaire.context ? questionnaire.context : {}),
        name: context.name,
        value: context.value,
      },
    });
  };

  const onSurveyUnitDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }

    setQuestionnaire((state) => ({
      ...state,
      surveyUnitData: fileList[0],
    }));
  };

  const { refetch: fetchCsvSchema } = useQuery({
    queryKey: ['personalization-csv-schema', { questionnaireId }],
    queryFn: () => getInitialCsvSchema(questionnaireId),
    enabled: false,
  });

  function onDownload() {
    const promise = fetchCsvSchema();
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.create.download_success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]">
      <div className="flex flex-col ">
        <h3>{data.label}</h3>
        <span className="text-sm text-gray-600 mt-1">
          Modes: {data.modes.map((mode) => mode.name).join(', ')}
        </span>
      </div>
      <div className={`grid overflow-hidden grid-rows-[1fr] transition-all`}>
        <div className="overflow-hidden space-y-3 my-2">
          <label
            htmlFor="context-select"
            className="block text-sm font-medium text-gray-700"
          >
            {t('personalization.create.context')}
          </label>
          <Select
            onChange={(v: unknown) => {
              if (v && typeof v === 'object' && 'name' in v) {
                onContextChange(v as SurveyContext);
              }
            }}
            value={questionnaire.context?.name ?? ''}
          >
            {surveyContext.map((context: SurveyContext) => (
              <Option key={context.name} value={context}>
                {context.value}
              </Option>
            ))}
          </Select>

          <div className="flex gap-x-2 mt-6">
            <Button onClick={onDownload}>
              {t('personalization.create.schema')}
            </Button>
            <Input
              type="file"
              ref={emptyFileInputRef}
              style={{ display: 'none' }}
              onChange={onSurveyUnitDataChange}
            />
            <Button onClick={() => emptyFileInputRef.current?.click()}>
              {t('personalization.create.upload_empty')}
            </Button>
          </div>
          <Dialog
            label={t('common.validate')}
            title={t('personalization.create.createQuestionnaire', {
              label: data.label,
            })}
            body={'questionnaire_add_save'}
            onValidate={() => {}}
            buttonTitle={t('personalization.create.createQuestionnaire')}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
