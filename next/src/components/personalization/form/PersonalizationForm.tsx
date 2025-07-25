import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Papa, { type ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  checkInterrogationsData,
  getInitialCsvSchema,
} from '@/api/personalization';
import { getFileFromParseResult } from '@/api/utils/personalization';
import Button, { ButtonStyle } from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';
import Input from '@/components/ui/form/Input';
import Option from '@/components/ui/form/Option';
import Select from '@/components/ui/form/Select';
import {
  FileType,
  PersonalizationQuestionnaire,
  SurveyContext,
  SurveyContextEnum,
  SurveyContextValueEnum,
  UploadError,
} from '@/models/personalizationQuestionnaire';

import ErrorTile from '../overview/ErrorTile';
import CsvViewerTable from './CsvViewerTable';
import JsonViewer from './JsonViewer';

interface PersonalizationFormProps {
  questionnaireId: string;
  questionnaire: PersonalizationQuestionnaire;
  setQuestionnaire: (questionnaire: PersonalizationQuestionnaire) => void;
  errorUpload: UploadError | null;
  setErrorUpload: (error: UploadError | null) => void;
  handleSubmit: (questionnaire: PersonalizationQuestionnaire) => void;
  fileData?: ParseResult | null;
}

/** Display the personalization windows */
export default function PersonalizationForm({
  questionnaireId,
  questionnaire,
  setQuestionnaire,
  errorUpload,
  setErrorUpload,
  fileData = null,
  handleSubmit = () => {},
}: Readonly<PersonalizationFormProps>) {
  const { t } = useTranslation();
  const emptyFileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const surveyContext: SurveyContext[] = [
    {
      name: SurveyContextEnum.HOUSEHOLD,
      value: SurveyContextValueEnum.HOUSEHOLD,
    },
    {
      name: SurveyContextEnum.BUSINESS,
      value: SurveyContextValueEnum.BUSINESS,
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
  const [fileType, setFileType] = useState<FileType>(fileTypes[0]);
  const [parsedFileData, setParsedFileData] = useState<
    ParseResult | string | null
  >(null);

  useEffect(() => {
    if (fileData) {
      setParsedFileData(fileData);
      setQuestionnaire({
        ...questionnaire,
        interrogationData: getFileFromParseResult(fileData),
      });
    }
  }, [fileData]);

  const checkFileData = useMutation({
    mutationFn: (file: File) => {
      return checkInterrogationsData(questionnaireId, file);
    },
    onError: (error: AxiosError) => {
      toast.error(t('personalization.create.uploadError'));
      setErrorUpload(error.response?.data as UploadError);
    },
    onSuccess: () => {
      toast.success(t('personalization.create.uploadSuccess'));
      setErrorUpload(null);
      queryClient.invalidateQueries({
        queryKey: ['checkFileData', { questionnaireId }],
      });
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

  const onInterrogationDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = event.target.files;
    if (!fileList) {
      return;
    }
    const file = fileList[0];
    if (fileType.name === 'JSON') {
      file.text().then((text) => {
        setParsedFileData(text);
      });
    } else {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: ParseResult<unknown>) => {
          setParsedFileData(result);
        },
      });
    }
    setQuestionnaire({
      ...questionnaire,
      interrogationData: fileList[0],
    });
    checkFileData.mutate(file);
  };

  const { refetch: fetchCsvSchema } = useQuery({
    queryKey: ['personalization-csv-schema', { questionnaireId }],
    queryFn: async () => {
      const result = await getInitialCsvSchema(questionnaireId);
      return result ?? null;
    },
    enabled: false,
  });

  function onDownload() {
    const promise = fetchCsvSchema();
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('personalization.create.downloadSuccess'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="overflow-hidden space-y-3 my-2">
      <label
        htmlFor="context-select"
        className="block text-md font-medium text-gray-700"
      >
        {t('personalization.create.context')}
      </label>
      <div className="flex flex-row items-end gap-2">
        <div className="w-[70%]">
          <Select
            onChange={(v: unknown) => {
              if (v && typeof v === 'object' && 'name' in v) {
                onContextChange(v as SurveyContext);
              }
            }}
            value={
              surveyContext.find(
                (c) => c.name === questionnaire.context?.name,
              ) ?? ''
            }
          >
            {surveyContext.map((context: SurveyContext) => (
              <Option key={context.name} value={context}>
                {context.value}
              </Option>
            ))}
          </Select>
        </div>
        <Button
          onClick={onDownload}
          disabled={fileType.name !== 'CSV'}
          buttonStyle={ButtonStyle.Secondary}
        >
          {t('personalization.create.expectedFileSchema')}
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
          onChange={onInterrogationDataChange}
          accept={fileType.value}
        />
        <Button
          onClick={() => emptyFileInputRef.current?.click()}
          buttonStyle={ButtonStyle.Primary}
        >
          {t('personalization.create.uploadData')}
        </Button>
        <span className="text-sm text-gray-600 ml-2">
          {questionnaire.interrogationData?.name ||
            t('personalization.create.noFileChosen')}
        </span>
      </div>
      {errorUpload && <ErrorTile error={errorUpload} />}
      {fileType.name === 'CSV' && parsedFileData && (
        <CsvViewerTable parsedCsv={parsedFileData} />
      )}
      {fileType.name === 'JSON' && parsedFileData && (
        <JsonViewer data={parsedFileData} />
      )}
      <div className="w-auto inline-block my-1">
        <Dialog
          label={t('common.validate')}
          title={t('personalization.create.createQuestionnaire', {
            label: questionnaire.label,
          })}
          body={t('personalization.create.createQuestionnaireDescription')}
          onValidate={() => handleSubmit(questionnaire)}
          buttonTitle={t('personalization.create.createQuestionnaire')}
          disabled={
            !questionnaire.interrogationData ||
            !questionnaire.context?.name ||
            errorUpload !== null
          }
        />
      </div>
    </div>
  );
}
