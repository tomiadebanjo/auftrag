import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { auth, firestore } from 'Config/firebase';
import { setAuthHeaders } from 'Utils/authHelpers';

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

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserProvider = ({ children }) => {
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
          });
      } else {
        dispatch({ type: 'LOG_OUT_USER' });
      }
    });

    return () => {
      subscription();
    };
  }, []);

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