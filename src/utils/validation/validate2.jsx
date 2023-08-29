import { isEmailValid, isPasswordValid } from '../validation/formValidation2';

export const validate2 = formData1 => {
  const errors = {};

  if (!formData1.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isEmailValid(formData1.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData1.password.trim()) {
    errors.password = 'Password is required';
  } else if (!isPasswordValid(formData1.password)) {
    errors.password = 'Invalid Password format';
  }

  return errors;
};
  