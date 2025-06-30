import { useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Papa, { ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { checkSurveyUnitsCSV, getInitialCsvSchema } from '@/api/personalize';
import Button, { ButtonStyle } from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import Input from '@/components/ui/form/Input';
import Option from '@/components/ui/form/Option';
import Select from '@/components/ui/form/Select';
import {
  FileType,
  PersonalizationQuestionnaire,
  SurveyContext,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import CsvViewerTable from './CsvViewerTable';
import ErrorUploadFile from './Error';

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
  const fileTypes: FileType[] = [
    {
      name: 'CSV',
      value: 'text/csv',
    },
    {
      name: 'JSON',
      value: 'application/json',
    },
  ];
  const [questionnaire, setQuestionnaire] =
    useState<PersonalizationQuestionnaire>(data);

  const [fileType, setFileType] = useState<FileType>(fileTypes[0]);
  const [parsedCsv, setParsedCsv] = useState<ParseResult>(null);
  const [errorUpload, setErrorUpload] = useState<UploadError | null>(null);

  const checkCsvData = useMutation({
    mutationFn: (file: File) => {
      return checkSurveyUnitsCSV(questionnaireId, file);
    },
    onError: (error: AxiosError) => {
      console.log('Error checking CSV data:', error.response?.data);
      toast.error(t('personalization.create.upload_error'));
      setErrorUpload(error.response?.data as UploadError);
    },
    onSuccess: () => {
      toast.success(t('personalization.create.upload_success'));
    },
  });

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

  const onFileTypeChange = (fileType: FileType) => {
    setFileType(fileType);
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

    Papa.parse(fileList[0], {
      header: true,
      complete: (result: ParseResult) => {
        setParsedCsv(result);
      },
    });
    const test = checkCsvData.mutate(fileList[0]);
    console.log('Check CSV data:', test);
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
          {t('personalization.overview.modes')}:{' '}
          {data.modes.map((mode) => mode.name).join(', ')}
        </span>
      </div>
      <div className={`grid overflow-hidden grid-rows-[1fr] transition-all`}>
        <div className="overflow-hidden space-y-3 my-1">
          <label
            htmlFor="context-select"
            className="block text-sm font-medium text-gray-700"
          >
            {t('personalization.create.context')}
          </label>
          <div className="flex flex-row items-end gap-2">
            <div className="w-[80%]">
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
            </div>
            <Button onClick={onDownload}>
              {t('personalization.create.schema')}
            </Button>
          </div>
          <div className="flex flex-row gap-x-2 mt-6 items-center">
            <Select
              onChange={(v: unknown) => {
                if (v && typeof v === 'object' && 'name' in v) {
                  onFileTypeChange(v as FileType);
                }
              }}
              value={fileType}
            >
              {fileTypes.map((type) => (
                <Option key={type.value} value={type}>
                  {type.name}
                </Option>
              ))}
            </Select>
            <Input
              type="file"
              ref={emptyFileInputRef}
              style={{ display: 'none' }}
              onChange={onSurveyUnitDataChange}
            />
            <Button
              onClick={() => emptyFileInputRef.current?.click()}
              buttonStyle={ButtonStyle.Primary}
            >
              {t('personalization.create.upload_data')}
            </Button>
            <span className="text-sm text-gray-600 ml-2">
              {questionnaire.surveyUnitData?.name ||
                t('personalization.create.no_file_chosen')}
            </span>
          </div>
          {errorUpload && <ErrorUploadFile error={errorUpload} />}
          {parsedCsv && parsedCsv.data.length > 0 && (
            <CsvViewerTable parsedCsv={parsedCsv} />
          )}
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
