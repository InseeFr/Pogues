export const { getAccessToken, getOidc, useOidc } = {
  getAccessToken: () => Promise.resolve('mock-token'),
  getOidc: () =>
    Promise.resolve({
      getAccessToken: () => 'mock-token',
    }),
  useOidc: () => ({
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
}
