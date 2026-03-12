export const { getOidc, useOidc } = {
  getOidc: () =>
    Promise.resolve({
      getAccessToken: () => 'mock-token',
    }),
  useOidc: () => ({
    isUserLoggedIn: true,
    logout: vi.fn(),
  }),
};
