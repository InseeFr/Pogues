export const { getOidc } = {
  getOidc: () =>
    Promise.resolve({
      getTokens: () => 'mock-token',
    }),
};
