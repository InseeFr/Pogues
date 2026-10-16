import { zodResolver } from '@hookform/resolvers/zod'
import {
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from 'react-hook-form'
import type { z } from 'zod'

type Props<TFieldValues extends FieldValues> = {
  defaultValues?: DefaultValues<TFieldValues>
  // This is used in multiple forms, I still don't know if I should put it here
  mode?: UseFormProps<TFieldValues>['mode']
  schema: z.ZodType<unknown, FieldValues>
  values?: TFieldValues
}

/**
 * Uses the useForm of react-hook-form (with zod schema)
 */
export function useReactHookfForm<TFieldValues extends FieldValues>({
  defaultValues,
  mode = 'onChange',
  schema,
  values,
}: Props<TFieldValues>): UseFormReturn<TFieldValues> {
  return useForm<TFieldValues>({
    mode,
    defaultValues,
    values,
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
  })
}
