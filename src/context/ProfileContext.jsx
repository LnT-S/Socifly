import React, { createContext, useContext, useEffect, useReducer } from 'react';
// Create the ProfileContext
export const ProfileContext = createContext();
export const LocalContext = createContext()

// Create the ProfileProvider component
export const ProfileProvider = ({ children }) => {
  // Define your initial state and reducer here
  const initialState = {
    name: 'Aman',
    email: '',
    password : '',
    phone: null,
    avatar:'',
    // server: 'http://10.0.2.2:8000'
    // server: 'http://192.168.1.8:8000'
    server: 'http://16.171.251.116:8000/'
    // ... other profile fields
  };

  const localData = {
    otp: '',
    userId: '',
    category: [],
    images: [],
    lang : 'english',
    editImage  : ''
  }

  const profileReducer = (state = initialState, action) => {
    switch (action?.type) {
      case 'USER_NAME':
        return { ...state, name: action.payload }
      case 'EMAIL':
        return { ...state, email: action.payload };
      case 'PHONE':
        return { ...state, phone: action.payload };
      case 'AVATAR':
        return { ...state, avatar: action.payload };
      // ... other cases
      default:
        return state;
    }
  };

  const localDataReducer = (state = localData, action) => {
    switch (action.type) {
      case 'OTP':
        return { ...state, otp: action.payload }
      case 'USERID':
        return { ...state, userId: action.payload }
      case 'CATEGORY':
        return { ...state, category: action.payload }
      case 'IMAGES':
        return { ...state, images: action.payload }
      case 'LANG':
        return { ...state, lang: action.payload }
      case 'EDITIMAGEURI':
        return { ...state, editImage: action.payload }
      default:
        return state;
    }
  }

  
  const [profileState, dispatch] = useReducer(profileReducer, initialState);
  const [localState, localDispatch] = useReducer(localDataReducer, localData);
  
  // useEffect(()=>{
  //   console.log(localState)
  // },[localState])
  return (
    <ProfileContext.Provider value={{ profileState, dispatch }}>
      <LocalContext.Provider value={{ localState, localDispatch }}>
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

