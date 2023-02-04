import React, { useReducer } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { showToast } from './globalContext';
import MkdSDK from './utils/MkdSDK';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.userData.token);
      localStorage.setItem('role', action.payload.userData.role);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.email,
        token: action.payload.userData.token,
        role: action.payload.userData.role,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'USER_VERIFY':
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem('role');
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'LOGOUT',
    });
    window.location.href = '/' + role + '/login';
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const validToken = async () => {
      const isValid = await sdk.check(localStorage.getItem('role'));
      if (isValid?.message.toLowerCase() === 'ok') {
        dispatch({ type: 'USER_VERIFY', payload: { role: 'admin' } });
      }
    };
    validToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
