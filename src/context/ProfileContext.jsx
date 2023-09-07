import React, { createContext, useContext, useReducer } from 'react';

// Create the ProfileContext
const ProfileContext = createContext();

// Create the ProfileProvider component
export const ProfileProvider = ({ children }) => {
  // Define your initial state and reducer here
  const initialState = {
    name: '',
    email: '',
    phone: '',
    // ... other profile fields
  };

  const profileReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_NAME':
        return { ...state, name: action.payload };
      case 'UPDATE_EMAIL':
        return { ...state, email: action.payload };
      case 'UPDATE_PHONE':
        return { ...state, phone: action.payload };
      // ... other cases
      default:
        return state;
    }
  };

  const [profileState, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ profileState, dispatch }}>
      {children}
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
