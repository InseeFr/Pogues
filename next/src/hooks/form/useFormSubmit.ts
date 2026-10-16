import { type NavigateOptions } from '@tanstack/react-router'
import type { z } from 'zod'

import { useFormCancel } from './useFormCancel'
import {
  type MutationWithToastProps,
  useMutationWithToast,
} from './useMutationWithToast'

export type FormSubmitProps<TData, TSchema extends z.ZodType> = Omit<
  MutationWithToastProps<TData, z.infer<TSchema>>,
  'mutationFn'
> & {
  mutationFn: (variables: z.infer<TSchema>) => Promise<TData>
  schema: TSchema
  navigateFunction?: NavigateOptions | ((data: TData) => NavigateOptions)
}

export function useFormSubmit<TData, TSchema extends z.ZodType>({
  schema,
  navigateFunction,
  ...props
}: FormSubmitProps<TData, TSchema>) {
  const navigate = useFormCancel()
  const { mutation, submit } = useMutationWithToast<TData, z.infer<TSchema>>(
    props,
  )

  const submitForm = (variables: z.infer<TSchema>): Promise<TData> => {
    const parsedVariables = schema.parse(variables)
    return submit(parsedVariables, {
      onSuccess: (data) => {
        if (!navigateFunction) {
          return
        }
        const navigationTarget =
          typeof navigateFunction === 'function'
            ? navigateFunction(data)
            : navigateFunction
        return navigate(navigationTarget)
      },
    })
  }

  return { mutation, submit: submitForm }
}
