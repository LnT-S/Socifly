import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { BLACK, PRIMARY, WHITE } from '../styles/colors';
import { getResponsiveValue, screenWidth } from '../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextinputA from '../atoms/TextinputA';
import ButtonA from '../atoms/ButtonA';
import { validateForm, isNameValid, isEmailValid, isPhoneNumberValid } from '../utils/validation/validateForm';
import global from '../styles/global';
import TextinputB from '../atoms/TextinputB';
import stringsoflanguages from '../utils/ScreenStrings';
import { FETCH } from "../services/fetch";
const ContactUs = props => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const handleNextPage =async () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      let { status, data } = await FETCH(
        'POST',
        '/auth/user_contact',
        '',
        formData
      );
      console.log("from if",formData)
    } else {
      console.log("from else ")
      props.navigation.navigate('Settings');
      
    }
  };

  const handleNextPage2 = () => {
    props.navigation.navigate('Settings');
  };
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.status}>
        <Icon
          onPress={handleNextPage2}
          name="arrow-back"
          style={styles.icon} />
        <Text style={styles.statusT}> {stringsoflanguages.contactUs}</Text>
      </View>

      <ScrollView style={styles.scroll}>


        <View style={styles.inputContainer}>
          <Text style={styles.text}>{stringsoflanguages.getInTouch}</Text>

          <View style={styles.inputC}>

            <TextinputA placeholder={stringsoflanguages.enterYourName} onChangeText={text => setFormData({ ...formData, name: text })}
              error={formErrors.name} />
            {formErrors.name && <Text style={global.error}>{formErrors.name}</Text>}
          </View>

          <View style={styles.inputC}>
            <TextinputA
              placeholder={stringsoflanguages.enterPhoneNo}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => {
                setFormData({ ...formData, phone: text });
                // Clear the error for 'phone' when the user starts typing
                setFormErrors({ ...formErrors, phone: '' });
              }}

              error={formErrors.phone}
            />
            {formErrors.phone && <Text style={global.error}>{formErrors.phone}</Text>}
          </View>

          <View style={styles.inputC}>
            <TextinputA placeholder={stringsoflanguages.enterEmailId} onChangeText={text => setFormData({ ...formData, email: text })}
              error={formErrors.email} />
            {formErrors.email && <Text style={global.error}>{formErrors.email}</Text>}

          </View>

          <View style={styles.inputC}>

            <TextInput
              multiline
              placeholderTextColor="#888888"
              numberOfLines={5}
              style={styles.input}
              placeholder={stringsoflanguages.enterYourMessage}
              onChangeText={text => setFormData({ ...formData, message: text })}
              error={formErrors.message}
            />
            {formErrors.message && <Text style={global.error}>{formErrors.message}</Text>}

          </View>
        </View>

        <View style={styles.btn}>
          <ButtonA name={stringsoflanguages.submit} onPress={handleNextPage} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',

  },
  scroll: {
    flex: 1,
    height: "100%",
  },

  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue(70, 50),
    flexDirection: 'row',
    zIndex: 2,
    // justifyContent: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  statusT: {
    color: BLACK,
    top: getResponsiveValue(17, 14),
    fontSize: getResponsiveValue(16, 16),
    left: getResponsiveValue(40, 30),
  },
  icon: {
    color: BLACK,
    fontSize: getResponsiveValue(30, 25),
    top: getResponsiveValue(20, 14),
    left: getResponsiveValue(30, 20),
  },
  inputContainer: {
    // height: '90%',
    alignItems: 'center',
    top: getResponsiveValue(40, 30),
    // justifyContent: 'space-around',
  },
  text: {
    fontSize: getResponsiveValue(35, 30),
    color: PRIMARY,
    fontWeight: 'bold',
    marginBottom: "10%",
  },
  input: {
    height: getResponsiveValue(200, 100),
    borderWidth: 1,
    borderRadius: 6,
    // paddingHorizontal: 10,
    // textAlign: "center",
    textAlignVertical: 'top',
    marginBottom: getResponsiveValue(40, 30),
    color: BLACK,

    width: getResponsiveValue(500, screenWidth * 0.8),
  },
  inputC: {
    marginHorizontal: "20%",
  },
  btn: {
    marginVertical: getResponsiveValue("10%", "15%"),
    justifyContent: "center",
    paddingHorizontal: getResponsiveValue("30%", "20%"),
  },
});

export default ContactUs;
