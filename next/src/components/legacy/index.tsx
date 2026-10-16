import { useBlocker, useNavigate } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'

import {
  Dispatch,
  SetStateAction,
  Suspense,
  lazy,
  useMemo,
  useState,
} from 'react'

import DirtyStateDialog from '@/components/layout/DirtyStateDialog'
import ErrorComponent, {
  LegacyPoguesError,
} from '@/components/layout/ErrorComponent'
import { DecodedIdTokenType, getAccessToken, useOidc } from '@/lib/auth/oidc'

function PageError({ error }: Readonly<{ error: LegacyPoguesError }>) {
  return <ErrorComponent error={error} />
}

const LegacyMain = lazy(async () => {
  // @ts-expect-error federated remote
  const mod = await import('@pogues-legacy/App')
  return { default: mod.Main }
})

/** Federated legacy editor. In Vite DEV the remote is stubbed → redirect to details. */
export const LegacyComponent = () => {
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false)

  const { decodedIdToken } = useOidc()
  const navigate = useNavigate()

  const { proceed, reset, status } = useBlocker({
    enableBeforeUnload: isDirtyState,
    shouldBlockFn: () => isDirtyState,
    withResolver: true,
  })

  const myComponent = useMemo(
    () =>
      legacyApp(setIsDirtyState, decodedIdToken, (path: string) => {
        navigate({ to: path })
      }),
    [setIsDirtyState, decodedIdToken, navigate],
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
      <Suspense fallback={null}>
        <LegacyMain
          setIsDirtyState={setIsDirtyState}
          getAccessToken={getAccessToken}
          decodedIdToken={decodedIdToken}
          navigateToNext={navigateToNext}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
