import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { codesListsKeys, putCodesList } from '@/api/codesLists';
import { CodesList } from '@/models/codesLists';
import { FormulasLanguages } from '@/models/questionnaires';
import { Variable } from '@/models/variables';
import { uid } from '@/utils/utils';
import { type FormValues } from '../form/schema';

import CodesListForm from '../form/CodesListForm';
import ImportCodesListFromCsv from './ImportCodesListFromCsv';

interface CreateCodesListWithImportProps {
    questionnaireId: string;
    formulasLanguage?: FormulasLanguages;
    variables: Variable[];
}

export default function CreateCodesListWithImport({
    questionnaireId,
    formulasLanguage,
    variables,
}: Readonly<CreateCodesListWithImportProps>) {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [manualFormValues, setManualFormValues] = useState<FormValues>({
        label: '',
        codes: [{ label: '', value: '', codes: [] }],
    });
    const [showCsvImport, setShowCsvImport] = useState(false);

    const mutation = useMutation({
        mutationFn: ({
            codesList,
            questionnaireId,
        }: {
            codesList: CodesList;
            questionnaireId: string;
        }) => {
            return putCodesList(questionnaireId, codesList.id, codesList);
        },
        onSuccess: (_, { questionnaireId }) =>
            queryClient.invalidateQueries({
                queryKey: codesListsKeys.all(questionnaireId),
            }),
    });

    const handleFormValuesChange = useCallback((newValues: FormValues) => {
        setManualFormValues(newValues);
    }, []);

    const handleImportSuccess = useCallback((importedFormValues: FormValues) => {
        const mergedCodes = [
            ...manualFormValues.codes.filter(code => code.value || code.label),
            ...importedFormValues.codes
        ];

        const uniqueCodesMap = new Map<string, { label: string; value: string; codes: { value: string; label: string; codes: [] }[] }>();
        mergedCodes.forEach(code => {
            if (code.value) {
                uniqueCodesMap.set(code.value, {
                    label: code.label,
                    value: code.value,
                    codes: code.codes || []
                });
            }
        });

        const uniqueCodes = Array.from(uniqueCodesMap.values());

        setManualFormValues({
            label: manualFormValues.label || importedFormValues.label,
            codes: uniqueCodes.length > 0 ? uniqueCodes : [{ label: '', value: '', codes: [] }]
        });

        console.log('Merged form values after import:', {
            label: manualFormValues.label || importedFormValues.label,
            codes: uniqueCodes,
        });

        toast.success(t('personalization.create.uploadSuccess'))

        setShowCsvImport(false);
    }, [manualFormValues, t]);

    const handleCancelImport = useCallback(() => {
        setShowCsvImport(false);
    }, []);

    const handleToggleCsvImport = useCallback(() => {
        setShowCsvImport(!showCsvImport);
    }, [showCsvImport]);

    const submitForm = async ({ label, codes }: FormValues) => {
        const id = uid();
        const codesList = { id, label, codes };
        const promise = mutation.mutateAsync(
            { questionnaireId, codesList },
            {
                onSuccess: () =>
                    navigate({
                        to: '/questionnaire/$questionnaireId/codes-lists',
                        params: { questionnaireId },
                    }),
            },
        );
        toast.promise(promise, {
            loading: t('common.loading'),
            success: t('codesList.create.success'),
            error: (err: Error) => err.toString(),
        });
    };

    const handleCancel = () => {
        navigate({
            to: '/questionnaire/$questionnaireId/codes-lists',
            params: { questionnaireId },
            ignoreBlocker: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-default">
                    {t('codesList.create.title')}
                </h3>
                <button
                    type="button"
                    onClick={handleToggleCsvImport}
                    className="text-action-primary hover:text-action-primary-hover font-medium"
                >
                    {showCsvImport ? t('common.cancel') : t('codesList.import.importButton')}
                </button>
            </div>

            {showCsvImport && (
                <div className="border-t border-default pt-6 mt-6">
                    <ImportCodesListFromCsv
                        onImportSuccess={handleImportSuccess}
                        onCancel={handleCancelImport}
                    />
                </div>
            )}

            <CodesListForm
                questionnaireId={questionnaireId}
                formulasLanguage={formulasLanguage}
                variables={variables}
                onSubmit={submitForm}
                codesList={manualFormValues}
                onValuesChange={handleFormValuesChange}
            />

            <div className="flex gap-3 justify-end mt-6">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-md"
                >
                    {t('common.cancel')}
                </button>
            </div>
        </div>
    );
}