import { type NavigateOptions, useNavigate } from '@tanstack/react-router'

type Navigate = ReturnType<typeof useNavigate>

/**
 * Handle cancel navigation when leaving a form
 *
 */
export function useFormCancel(): Navigate {
  const navigate = useNavigate()

  const cancel = (options: NavigateOptions): Promise<void> => {
    return navigate({ ...options, ignoreBlocker: true } as never)
  }

  return cancel as unknown as Navigate
}
