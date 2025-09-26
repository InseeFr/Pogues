import { act, renderHook } from '@testing-library/react';

import {
  DirtyStateProvider,
  useDirtyState,
} from '@/contexts/DirtyStateContext';

describe('DirtyStateContext', () => {
  it('should have default isDirty=false', () => {
    const { result } = renderHook(() => useDirtyState(), {
      wrapper: ({ children }) => (
        <DirtyStateProvider>{children}</DirtyStateProvider>
      ),
    });

    expect(result.current.isDirty).toBe(false);
    expect(typeof result.current.setDirty).toBe('function');
  });

  it('should update isDirty when setDirty is called', () => {
    const { result } = renderHook(() => useDirtyState(), {
      wrapper: ({ children }) => (
        <DirtyStateProvider>{children}</DirtyStateProvider>
      ),
    });

    act(() => {
      result.current.setDirty(true);
    });
    expect(result.current.isDirty).toBe(true);

    act(() => {
      result.current.setDirty(false);
    });
    expect(result.current.isDirty).toBe(false);
  });
});
