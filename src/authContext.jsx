import React, { useReducer } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import MkdSDK from './utils/MkdSDK';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

// const navigate = () => {
//   const navigateTo = useNavigate();
//   return navigateTo;
// };

const reducer = (state, action) => {
  // console.log('login data', action);
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
      // navigateTo('/admin/login');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
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
      type: 'Logout',
    });
    window.location.href = '/' + role + '/login';
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const validToken = async () => {
      const isValid = await sdk.check(localStorage.getItem('role'));
      if (!isValid?.message.toLowerCase() === 'ok') {
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

// Check if token still valid
// https://reacttask.mkdlabs.com/v2/api/lambda/check
// Method POST
// Header
// x-project cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==
// Bearer <token>
// body
// {
//   "role": "admin"
// }
// Response
// http code 200
