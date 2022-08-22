import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
} from '../actions/auth.actions';

export const INITIAL_STATE = {
  error: null,
  loading: false,
  token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };
    case AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        token: action.token,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
