import React, { createContext, useContext, useReducer } from 'react';

// Create the ProfileContext
export const ProfileContext = createContext();
export const LocalContext = createContext()

// Create the ProfileProvider component
export const ProfileProvider = ({ children }) => {
  // Define your initial state and reducer here
  const initialState = {
    name: '',
    email: '',
    phone: '',
    // ... other profile fields
  };

  const localData = {
    otp : '',
    userId : '',

  }

  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_NAME':
        return { ...state, name: action.payload };
      case 'UPDATE_EMAIL':
        return { ...state, email: action.payload };
      case 'UPDATE_PHONE':
        return { ...state, phone: action.payload };

      case 'USER_NAME':
        return { ...state, name: action.payload }
      case 'EMAIL':
        return { ...state, email: action.payload };
      case 'PHONE':
        return { ...state, phone: action.payload };
      // ... other cases
      default:
        return state;
    }
  };

  const localDataReducer = ( state= localData, action)=>{
    switch(action.type){
      case 'OTP':
        return {...state , otp:action.payload}
      case 'USERID':
        return {...state , userId:action.payload}
      default:
        return state;
    }
  }

  const [profileState, dispatch] = useReducer(profileReducer, initialState);
  const [localState, localDispatch] = useReducer(localDataReducer, localData);

  return (
    <ProfileContext.Provider value={{ profileState, dispatch }}>
      <LocalContext.Provider value={{localState, localDispatch}}>
        {children}
      </LocalContext.Provider>
    </ProfileContext.Provider>
  );
};

// Create a custom hook for using the profile state and dispatch
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const useLocal = () => {
  const context = useContext(LocalContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

