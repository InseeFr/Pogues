import { openDocument } from './files'

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
})

it('should navigate to blob URL when no filename is provided', () => {
  const blob = new Blob(['test'], { type: 'text/plain' })
  const hrefSetter = vi.fn()

  const mockLocation = {
    get href() {
      return ''
    },
    set href(value: string) {
      hrefSetter(value)
    },
  }

  Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
    configurable: true,
  })

  openDocument(blob)

  expect(hrefSetter).toHaveBeenCalledWith('blob:mock-url')
})
