import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextinputB from '../atoms/TextinputB';
import ButtonA from '../atoms/ButtonA';
import { getResponsiveValue } from '../styles/responsive';
import stringsoflanguages from '../utils/ScreenStrings';
import { PRIMARY } from '../styles/colors';
import global from '../styles/global';
import { validateForm } from '../utils/validation/validateForm';
import { useLocal } from '../context/ProfileContext';
import { FETCH } from '../services/fetch';
import CustomModal from '../atoms/CustomModal';


const NewPassword = (props) => {
  const { localState, localDispatch } = useLocal()
  const [value, setValue] = useState({
    password: '',
    confirm_password: '',
  });
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })
  const [errors, setErrors] = useState({});
  const handleChange = (field, text) => {
    setValue((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleResetPassword = async() => {
    const validationErrors = validateForm(value);
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   console.log('HERE')
    //   return;
    // }
    if (value.password !== value.confirm_password) {
      setErrors({ confirm_password: 'Passwords do not match' });
      return;
    }
    let {data , status} = await FETCH(
      'POST',
      '/auth/confirm-new-password',
      localState.userId,
      value
    )
    // console.log(data,status)
    if (status === 200) {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'LoginScreen',
        onClose : ()=>null
      }) 
      setShowModal(true)
    } else {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'ForgotPassword',
        onClose : ()=>null
      })
      setShowModal(true)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rect1}>
        <Text style={styles.text1}>{stringsoflanguages.enterNewPassword}</Text>
      </View>
      {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
      <View style={styles.rect2}>
        <TextinputB
          placeholder={stringsoflanguages.newPassword}
          secureTextEntry
          onChangeText={(text) => handleChange('password', text)}
          error={errors.password}
        />
        {errors.password && <Text style={global.error}>{errors.password}</Text>}

        <TextinputB
          placeholder={stringsoflanguages.confirmPassword}
          secureTextEntry
          onChangeText={(text) => handleChange('confirm_password', text)}
          error={errors.confirm_password}
        />

        {errors.confirm_password && (
          <Text style={global.error}>{errors.confirm_password}</Text>
        )}

        <View style={styles.buttonS}>
          <ButtonA
            name={stringsoflanguages.resetPassword}
            onPress={handleResetPassword}
          />
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect1: {
    alignItems: 'center',
  },
  text1: {
    color: PRIMARY,
    fontSize: getResponsiveValue(35, 20),
  },
  rect2: {
    top: getResponsiveValue('7%', '6%'),
  },
});

export default NewPassword;
