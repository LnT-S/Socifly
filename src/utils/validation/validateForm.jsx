import {
  isNameValid,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordMatch,
} from '../validation/formValidation';

export const validateForm = formData => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = 'Full Name is required';
  } else if (!isNameValid(formData.name)) {
    errors.name = 'Full Name can only contain letters and spaces';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isEmailValid(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone Number is required';
  } else if (!isPhoneNumberValid(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (!formData.password.trim()) {
    errors.password = 'Password is required';
  }

  if (!formData.confirm_password.trim()) {
    errors.confirm_password = 'Confirm Password is required';
  } else if (!isPasswordMatch(formData.password, formData.confirm_password)) {
    errors.confirm_password = 'Passwords do not match';
  }

  


  return errors;
};
