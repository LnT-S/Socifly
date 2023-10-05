export const isNameValid = (name) => {
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(name);

  };
  
  export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  export const isPhoneNumberValid = (phone) => {
    const phoneNoRegex = /^\d{10}$/;
    return phoneNoRegex.test(phone);
  };
  
  export const isPasswordMatch = (password, confirm_password) => {
    return password === confirm_password;
  };
  