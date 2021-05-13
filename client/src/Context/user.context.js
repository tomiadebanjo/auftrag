import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { auth, firestore } from 'Config/firebase';
import { setAuthHeaders } from 'Utils/authHelpers';
import { useHistory } from 'react-router';
import { message } from 'antd';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER': {
      const {
        payload: { token, user },
      } = action;
      setAuthHeaders(token);
      return { ...state, isAuthenticated: true, userLoading: false, user };
    }

    case 'LOG_OUT_USER': {
      setAuthHeaders(null);
      return { ...state, isAuthenticated: false, userLoading: false };
    }

    case 'QUOTA_EXCEEDED_ERROR': {
      return { ...state, userLoading: false };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    userLoading: true,
    user: {},
  });

  useEffect(() => {
    const subscription = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await auth.currentUser.getIdToken();

        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((querySnapshot) => {
            const userDoc = { id: querySnapshot.id, ...querySnapshot.data() };
            dispatch({
              type: 'SET_LOGGED_IN_USER',
              payload: { token, user: userDoc },
            });
          })
          .catch((error) => {
            console.log(error);
            message.error('500 Server Error: Firebase Quota Exceeded');
            dispatch({ type: 'QUOTA_EXCEEDED_ERROR' });
          });
      } else {
        dispatch({ type: 'LOG_OUT_USER' });
      }
    });

    return () => {
      subscription();
    };
  }, [history]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
