import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export type SuccessMessage<TVariables> =
  string | ((variables: TVariables) => string)

export type ErrorMessage = string | ((error: Error) => string)

export type MutationWithToastProps<TData, TVariables> = {
  errorMessage?: ErrorMessage
  invalidateKeys?: QueryKey[]
  mutationFn: (variables: TVariables) => Promise<TData>
  onSuccess?: (data: TData, variables: TVariables) => void
  successMessage: SuccessMessage<TVariables>
}

function handleSuccessMessage<TVariables>(
  successMessage: SuccessMessage<TVariables>,
  variables: TVariables,
): string {
  if (typeof successMessage === 'function') {
    return successMessage(variables)
  }
  return successMessage
}

function handleErrorMesssage(
  errorMessage: ErrorMessage | undefined,
  error: Error,
): string {
  if (typeof errorMessage === 'function') {
    return errorMessage(error)
  }
  return errorMessage ?? error.toString()
}

/**
 * Handles the form submit + toast showing in forms component
 */
export function useMutationWithToast<TData, TVariables>({
  errorMessage,
  invalidateKeys = [],
  mutationFn,
  onSuccess,
  successMessage,
}: MutationWithToastProps<TData, TVariables>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: async (data, variables) => {
      await Promise.all(
        invalidateKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      )
      onSuccess?.(data, variables)
    },
  })

  const submit = (
    variables: TVariables,
    options?: { onSuccess?: (data: TData, variables: TVariables) => void },
  ): Promise<TData> => {
    const promise = mutation.mutateAsync(variables, {
      onSuccess: options?.onSuccess,
    })
    toast.promise(promise, {
      loading: t('common.loading'),
      success: handleSuccessMessage(successMessage, variables),
      error: (error: Error) => handleErrorMesssage(errorMessage, error),
    })
    return promise
  }

  return { mutation, submit }
}
