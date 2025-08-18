import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Papa, { type ParseResult } from 'papaparse';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  checkInterrogationsData,
  getInitialCsvSchema,
  personalizationKeys,
} from '@/api/personalization';
import { getFileFromParseResult } from '@/api/utils/personalization';
import Button, { ButtonStyle } from '@/components/ui/Button';
import ButtonIcon, { ButtonIconStyle } from '@/components/ui/ButtonIcon';
import DialogButton from '@/components/ui/DialogButton';
import Input from '@/components/ui/form/Input';
import RadioGroup from '@/components/ui/form/RadioGroup';
import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import {
  FileType,
  PersonalizationQuestionnaire,
  SurveyContext,
  SurveyContextEnum,
  SurveyContextValueEnum,
  UploadMessage,
} from '@/models/personalizationQuestionnaire';

import UploadMessageTile from '../overview/UploadMessageTile';
import CsvViewerTable from './CsvViewerTable';
import JsonViewer from './JsonViewer';

interface PersonalizationFormProps {
  questionnaireId: string;
  questionnaire: PersonalizationQuestionnaire;
  setQuestionnaire: (questionnaire: PersonalizationQuestionnaire) => void;
  handleSubmit: (questionnaire: PersonalizationQuestionnaire) => void;
  fileData?: ParseResult<unknown> | string | null;
}

/** Display the personalization windows */
export default function PersonalizationForm({
  questionnaireId,
  questionnaire,
  setQuestionnaire,
  fileData = null,
  handleSubmit = () => {},
}: Readonly<PersonalizationFormProps>) {
  const { t } = useTranslation();
  const emptyFileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [isErrorUpload, setIsErrorUpload] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<UploadMessage | null>(
    null,
  );

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
      name: t('personalization.create.csvDescription'),
      value: 'text/csv',
    },
    {
      name: t('personalization.create.jsonDescription'),
      value: 'application/json',
    },
  ];
  const [fileType, setFileType] = useState<FileType>(
    typeof fileData === 'string' && fileData
      ? fileTypes[1] // JSON
      : fileTypes[0], // CSV
  );
  const [parsedFileData, setParsedFileData] = useState<
    ParseResult<unknown> | string | null
  >(null);

  useEffect(() => {
    if (fileData) {
      setParsedFileData(fileData);
      if (typeof fileData !== 'string' && 'data' in fileData) {
        setFileType(fileTypes[0]); // CSV
      } else {
        setFileType(fileTypes[1]); // JSON
      }
      setQuestionnaire({
        ...questionnaire,
        interrogationData: getFileFromParseResult(fileData),
      });
    }
  }, [fileData]);

  const checkFileData = useMutation({
    mutationFn: (file: File) => {
      return checkInterrogationsData(questionnaireId, file).then((response) => {
        setUploadMessage(response as UploadMessage);
        setIsErrorUpload(false);
      });
    },
    onError: (error: AxiosError) => {
      toast.error(t('personalization.create.uploadError'));
      setUploadMessage(error.response?.data as UploadMessage);
      console.error('File data checked with error:', error);
      setIsErrorUpload(true);
    },
    onSuccess: () => {
      toast.success(t('personalization.create.uploadSuccess'));
      queryClient.invalidateQueries({
        queryKey: personalizationKeys.checkFileData(questionnaireId),
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
    onRemoveFile();
  };

  const onRemoveFile = () => {
    setParsedFileData(null);
    setQuestionnaire({
      ...questionnaire,
      interrogationData: undefined,
    });
    setIsErrorUpload(false);
    setUploadMessage(null);
  };

  const onInterrogationDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }
    onRemoveFile();
    const file = fileList[0];

    if (file.type !== fileType.value) {
      toast.error(
        t('personalization.create.invalidFileType', {
          expected: fileType.value,
        }),
      );
      event.target.value = '';
      return;
    }
    if (fileType.value === 'application/json') {
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
    queryKey: personalizationKeys.csvSchema(questionnaireId),
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
    <div className="flex flex-col min-h-[400px]">
      <div className="overflow-hidden space-y-3 my-2">
        <div className="flex flex-row items-end gap-2">
          <RadioGroup
            label={t('personalization.create.context')}
            options={surveyContext.map((context) => ({
              label: context.value ?? '',
              value: context.name,
            }))}
            defaultValue={questionnaire.context?.name}
            onChange={(value: unknown) => {
              const selected = surveyContext.find((c) => c.name === value);
              if (selected) {
                onContextChange(selected);
              }
            }}
          />
        </div>
        <div className="flex flex-row items-end gap-2 mt-6">
          <RadioGroup
            label={t('personalization.create.personalizationType')}
            options={fileTypes.map((type) => ({
              label: type.name ?? '',
              value: type.value,
            }))}
            defaultValue={fileType.value}
            onChange={(value: unknown) => {
              const selected = fileTypes.find((t) => t.value === value);
              if (selected) {
                onFileTypeChange(selected);
              }
            }}
          />
        </div>
        <div className="flex flex-row gap-x-2 mt-2 items-center">
          <Input
            type="file"
            ref={emptyFileInputRef}
            style={{ display: 'none' }}
            onChange={onInterrogationDataChange}
            accept={fileType.value}
            data-testid="file-upload"
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
          {parsedFileData && (
            <div className="flex-1 flex justify-end">
              <ButtonIcon
                className="h-12"
                Icon={DeleteIcon}
                title={t('common.delete')}
                onClick={onRemoveFile}
                buttonStyle={ButtonIconStyle.Delete}
              />
            </div>
          )}
        </div>
        <Button
          onClick={onDownload}
          disabled={fileType.name !== 'CSV'}
          buttonStyle={ButtonStyle.Secondary}
        >
          {t('personalization.create.expectedFileSchema')}
        </Button>
        {uploadMessage && uploadMessage.message && (
          <UploadMessageTile
            messages={uploadMessage}
            isErrorUpload={isErrorUpload}
          />
        )}
        {fileType.value === 'text/csv' &&
          parsedFileData &&
          typeof parsedFileData === 'object' && (
            <CsvViewerTable
              data-testid="csv-viewer-table"
              parsedCsv={parsedFileData}
            />
          )}
        {fileType.value === 'application/json' &&
          parsedFileData &&
          typeof parsedFileData === 'string' && (
            <JsonViewer data-testid="json-viewer" data={parsedFileData} />
          )}
      </div>
      <div className="mt-auto w-auto inline-block my-1">
        <DialogButton
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
            isErrorUpload
          }
        />
      </div>
    </div>
  );
}
