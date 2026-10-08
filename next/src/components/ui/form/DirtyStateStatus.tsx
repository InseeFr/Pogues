import { useBlocker } from '@tanstack/react-router'

import DirtyStateDialog from '@/components/layout/DirtyStateDialog'

type Props = {
  isDirty: boolean
  isSubmitted?: boolean
}

export default function DirtyStateStatus({
  isDirty,
  isSubmitted = false,
}: Readonly<Props>) {
  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => isDirty && !isSubmitted,
    withResolver: true,
  })

  if (status !== 'blocked') {
    return null
  }

  return <DirtyStateDialog onValidate={proceed} onCancel={reset} />
}
