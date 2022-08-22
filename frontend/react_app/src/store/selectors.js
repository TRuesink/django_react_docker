export const selectIsAuthenticated = (state) =>
  state.auth.token !== null && typeof state.auth.token !== undefined;
export const selectAuthToken = (state) => state.auth.token;
