// actions.js
export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

export const setLoggedIn = (isLoggedIn) => ({
  type: 'SET_LOGGED_IN',
  payload: isLoggedIn,
});
