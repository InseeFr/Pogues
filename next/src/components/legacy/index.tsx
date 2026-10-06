// @ts-expect-error import jsx component
import { Main } from '@pogues-legacy/App'
import { useBlocker, useRouter } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'

import { Dispatch, SetStateAction, useMemo, useState } from 'react'

import DirtyStateDialog from '@/components/layout/DirtyStateDialog'
import ErrorComponent, {
  LegacyPoguesError,
} from '@/components/layout/ErrorComponent'
import { DecodedIdTokenType, getAccessToken, useOidc } from '@/lib/auth/oidc'

function PageError({ error }: Readonly<{ error: LegacyPoguesError }>) {
  return <ErrorComponent error={error} />
}

export const LegacyComponent = () => {
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false)

  const { decodedIdToken } = useOidc()
  const router = useRouter()

  const { proceed, reset, status } = useBlocker({
    enableBeforeUnload: isDirtyState,
    shouldBlockFn: () => isDirtyState,
    withResolver: true,
  })

  const myComponent = useMemo(
    () =>
      legacyApp(setIsDirtyState, decodedIdToken, (path: string) =>
        router.history.push(path),
      ),
    [setIsDirtyState, decodedIdToken, router],
  )

  return (
    <>
      {myComponent}

      {status === 'blocked' && (
        <DirtyStateDialog
          onValidate={() => {
            proceed?.()
            setIsDirtyState(false)
          }}
          onCancel={() => {
            reset?.()
          }}
        />
      )}
    </>
  )
}

function legacyApp(
  setIsDirtyState: Dispatch<SetStateAction<boolean>>,
  decodedIdToken: DecodedIdTokenType,
  navigateToNext: (path: string) => void,
) {
  return (
    <ErrorBoundary FallbackComponent={PageError}>
      <Main
        setIsDirtyState={setIsDirtyState}
        getAccessToken={getAccessToken}
        decodedIdToken={decodedIdToken}
        navigateToNext={navigateToNext}
      />
    </ErrorBoundary>
  )
}
