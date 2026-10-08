import {
  type MutationWithToastProps,
  useMutationWithToast,
} from './useMutationWithToast'

/**
 * Handles the delete action in forms component
 */
export function useDeleteMutation<TData, TVariables>(
  props: MutationWithToastProps<TData, TVariables>,
) {
  const { mutation, submit } = useMutationWithToast<TData, TVariables>(props)

  return { deleteMutation: mutation, remove: submit }
}
