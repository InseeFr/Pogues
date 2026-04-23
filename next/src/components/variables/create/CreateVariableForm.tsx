import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { postVariable, variablesKeys } from "@/api/variables";
import { Variable } from "@/models/variables";
import { uid } from "@/utils/utils";

import VariableForm from "../form/VariableForm";
import type { FormValues } from "../form/schema";

type Props = {
  /** Questionnaire to add the variable to. */
  questionnaireId: string;
  /** Scopes of the questionnaire with the mapping between id and name. */
  scopes: Map<string, string>;
  /** List of variables used for auto-completion in VTL editor. */
  variables?: Variable[];
};

/** Form to create a questionnaire. */
export default function CreateVariableForm({
  questionnaireId,
  scopes,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      variable,
      questionnaireId,
    }: {
      variable: Variable;
      questionnaireId: string;
    }) => {
      return postVariable(questionnaireId, variable);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: variablesKeys.all(questionnaireId),
      }),
  });

  const onSubmit = async (formValues: FormValues) => {
    const id = uid();
    const variable = { id, ...formValues };
    const promise = mutation.mutateAsync(
      { variable, questionnaireId },
      {
        onSuccess: () =>
          navigate({
            to: "/questionnaire/$questionnaireId/variables",
            params: { questionnaireId },
          }),
      },
    );
    toast.promise(promise, {
      loading: t("common.loading"),
      success: t("variable.create.success", { name }),
      error: (err: Error) => err.toString(),
    });
  };

  return (
    <VariableForm
      questionnaireId={questionnaireId}
      onSubmit={onSubmit}
      submitLabel={t("common.create")}
      scopes={scopes}
      variables={variables}
    />
  );
}
