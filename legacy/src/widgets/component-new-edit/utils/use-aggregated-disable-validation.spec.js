import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useAggregatedDisableValidation } from './use-aggregated-disable-validation';

describe('useAggregatedDisableValidation', () => {
  it('stays disabled while any source reports an error', () => {
    const onAggregateChange = vi.fn();
    const { result } = renderHook(() =>
      useAggregatedDisableValidation(onAggregateChange),
    );

    act(() => {
      result.current.getSetDisableValidation('condition')(true);
    });
    expect(result.current.disabled).toBe(true);
    expect(onAggregateChange).toHaveBeenLastCalledWith(true);

    act(() => {
      // Empty / valid sibling must not clear the condition error.
      result.current.getSetDisableValidation('message')(false);
    });
    expect(result.current.disabled).toBe(true);
    expect(onAggregateChange).toHaveBeenLastCalledWith(true);

    act(() => {
      result.current.getSetDisableValidation('condition')(false);
    });
    expect(result.current.disabled).toBe(false);
    expect(onAggregateChange).toHaveBeenLastCalledWith(false);
  });
});
