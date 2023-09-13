import {
  isNameValid,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordMatch,
} from '../validation/formValidation';
import stringsoflanguages from '../ScreenStrings';


export const validateForm = formData => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = stringsoflanguages.fullNameRequired;
  } else if (!isNameValid(formData.name)) {
    errors.name = stringsoflanguages.fullNameError;
  }

  if (!formData.email?.trim()) {
    errors.email = stringsoflanguages.emailRequired;
  } else if (!isEmailValid(formData.email)) {
    errors.email =stringsoflanguages.emailError;
  }

  if (!formData.phone?.trim()) {
    errors.phone = stringsoflanguages.phoneNoRequired;
  } else if (!isPhoneNumberValid(formData.phone)) {
    errors.phone = stringsoflanguages.phoneNoError;
  }

  if (!formData.password?.trim()) {
    errors.password =stringsoflanguages.passwordRequired;
  }
  if (!formData.message?.trim()) {
    errors.message = stringsoflanguages.messageRequired;
  }

  if (!formData.confirm_password?.trim()) {
    errors.confirm_password = stringsoflanguages.confirmPasswordRequired;
  } else if (!isPasswordMatch(formData.password, formData.confirm_password)) {
    errors.confirm_password = stringsoflanguages.confirmPasswordError;
  }
  if (!formData.birthdate?.trim()) {
    errors.birthdate = stringsoflanguages.birthdateRequired;
  }
  


  return errors;
};
