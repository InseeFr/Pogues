import { createElement } from 'react';

import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  NextNavigationContext,
  isNextLoopPageEnabled,
  useNextPages,
} from './next-pages';

describe('next pages', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('enables next loop page only when the flag is "true"', () => {
    vi.stubEnv('VITE_ENABLE_NEXT_LOOP_PAGE', 'true');
    expect(isNextLoopPageEnabled()).toBe(true);

    vi.stubEnv('VITE_ENABLE_NEXT_LOOP_PAGE', '');
    expect(isNextLoopPageEnabled()).toBe(false);

    vi.stubEnv('VITE_ENABLE_NEXT_LOOP_PAGE', 'false');
    expect(isNextLoopPageEnabled()).toBe(false);
  });

  it('navigates to the loop pages with the provided navigation', () => {
    const navigate = vi.fn();
    const { result } = renderHook(() => useNextPages(), {
      wrapper: ({ children }) =>
        createElement(
          NextNavigationContext.Provider,
          { value: navigate },
          children,
        ),
    });

    result.current.navigateToNewLoopPage('q1');
    expect(navigate).toHaveBeenLastCalledWith('/questionnaire/q1/loops/new');

    result.current.navigateToEditLoopPage('q1', 'loop1');
    expect(navigate).toHaveBeenLastCalledWith(
      '/questionnaire/q1/loops/loop/loop1',
    );
  });

  it('loads the page when no navigation is provided', () => {
    const assign = vi.fn();
    vi.stubGlobal('location', { assign });
    const { result } = renderHook(() => useNextPages());

    result.current.navigateToNewLoopPage('q1');
    expect(assign).toHaveBeenLastCalledWith('/questionnaire/q1/loops/new');
  });
});
