const initialState = {
  userData: null,
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userData: action.payload,
      };
    case 'SET_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
