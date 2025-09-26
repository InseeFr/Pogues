/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type DirtyStateContextType = {
  /** Whether the app currently has unsaved changes */
  isDirty: boolean;
  /** Mark the app as dirty/clean */
  setDirty: (dirty: boolean) => void;
};

/** Mandatory values used as a context's last-resort fallback. */
const defaultValues: DirtyStateContextType = {
  isDirty: false,
  setDirty: () => {},
};

/**
 * Expose shared functions to handle dirty state.
 *
 * Should be consumed via `useDirtyState()`.
 */
export const DirtyStateContext: React.Context<DirtyStateContextType> =
  createContext(defaultValues);

/** Return the current dirty state context value. */
export function useDirtyState() {
  return useContext(DirtyStateContext);
}

/**
 * Initialize the dirty state context.
 */
export function DirtyStateProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isDirty, setIsDirty] = useState(false);

  /** Mark the app as dirty/clean */
  const setDirty = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  const contextValues = useMemo(
    () => ({
      isDirty,
      setDirty,
    }),
    [isDirty, setDirty],
  );

  return (
    <DirtyStateContext.Provider value={contextValues}>
      {children}
    </DirtyStateContext.Provider>
  );
}
