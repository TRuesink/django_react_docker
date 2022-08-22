import axios from 'axios';
import * as settings from '../../settings';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const SESSION_DURATION = settings.SESSION_DURATION;

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS,
  token: token,
});

export const authFail = (error) => ({
  type: AUTH_FAIL,
  error: error,
});

export const authLogout = () => {
  const token = localStorage.getItem('token');
  if (token === undefined) {
    localStorage.removeItem('expirationDate');
  } else {
    axios
      .post(
        `${settings.API_SERVER}/api/auth/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  }
  return {
    type: AUTH_LOGOUT,
  };
};

export const authCheckTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${settings.API_SERVER}/api/auth/login/`, {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(
          new Date().getTime() + SESSION_DURATION
        );
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token));
        dispatch(authCheckTimeout(SESSION_DURATION));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          authCheckTimeout(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};
