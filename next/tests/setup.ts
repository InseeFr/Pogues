import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

if (typeof PointerEvent === 'undefined') {
  globalThis.PointerEvent = class PointerEvent extends MouseEvent {} as unknown as typeof PointerEvent
}

afterEach(() => {
  cleanup()
})
