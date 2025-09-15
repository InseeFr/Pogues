export const { getOidc, useOidc } = {
  getOidc: () =>
    Promise.resolve({
      getTokens: () => 'mock-token',
    }),
  useOidc: () => ({
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
};
