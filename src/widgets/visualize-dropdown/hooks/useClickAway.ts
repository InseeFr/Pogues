import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];

/**
 * A hook that allows to handle click events outside of the specified element.
 * @param {RefObject<HTMLElement | null>} ref - The reference to the element that should be clicked outside.
 * @param {() => void} onClickAway - The callback function to be called when the click event occurs outside of the specified element.
 * @param {string[]} events - An array of event names to listen for.
 * @see https://react-hooked.vercel.app/docs/useClickAway
 */
export const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: () => void,
  events: string[] = defaultEvents,
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref;
      if (el && !el.contains(event.target as Node)) savedCallback.current();
    };
    for (const eventName of events) {
      window.addEventListener(eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName, handler);
      }
    };
  }, [events, ref]);
};
