import { isEmailValid, isPasswordValid } from '../validation/formValidation2';
import stringsoflanguages from '../../utils/ScreenStrings';

export const validate2 = formData1 => {
  const errors = {};

  if (!formData1.email.trim()) {
    errors.email = stringsoflanguages.emailRequired;
  } else if (!isEmailValid(formData1.email)) {
    errors.email = stringsoflanguages.emailError;
  }

  if (!formData1.password.trim()) {
    errors.password = stringsoflanguages.passwordRequired;
  } else if (!isPasswordValid(formData1.password)) {
    errors.password = stringsoflanguages.passwordRequired;
  }

  return errors;
};