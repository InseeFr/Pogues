/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

interface DirtyStateContextType {
  isDirtyState: boolean;
  setIsDirtyState: (dirty: boolean) => void;
}

const defaultValues = {
  isDirtyState: false,
  setIsDirtyState: (_: boolean) => {},
};

export const DirtyStateContext: React.Context<DirtyStateContextType> =
  createContext(defaultValues);

export function useDirtyState() {
  return useContext(DirtyStateContext);
}

export function DirtyStateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false);

  const dirtyStateContextValues = useMemo(
    () => ({
      isDirtyState,
      setIsDirtyState,
    }),
    [isDirtyState],
  );

  return (
    <DirtyStateContext.Provider value={dirtyStateContextValues}>
      {children}
    </DirtyStateContext.Provider>
  );
}
