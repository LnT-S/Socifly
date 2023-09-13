import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { BLACK, WHITE } from '../../styles/colors';
import { getResponsiveValue } from '../../styles/responsive';
import Icon from "react-native-vector-icons/MaterialIcons";
// import stringsoflanguages from '../../utils/ScreenStrings';

const TermsCondition = (props) => {
  const handleNextPage = () => {
    props.navigation.navigate('Settings');
  };
  const dummyText = {
    dataProtection: `     In general, any person can download and use ‘SOCIFLY APP’ by registering themselves. I collect username, E-mail ID, Phone Number, Date of birth etc. Information from user to provide better service.
      All the collected information is completely safe and strictly protected under the judicial law of Data Protection. I don't share any of user information with any third party or any individual.
      `,
    cookies: `     ‘Google’, as a third party vendor use cookies to serve ads on ‘SOCIFLY APP’. Some of my advertising partners (mainly Google) may use cookies and web becomes on my ‘SOCIFLY APP’.
    `,
    serviceProviders: `      I may employ third party companies and individuals for helping me to provide better service to the user.
    `,

    legalDisputes: `      All user may know that if any disputes arise on any subject related to ‘SOCIFLY APP’ shall be governed by the laws of India and it will be come and tried in jurisdiction of Pune Local Court only
    `,

    contactUs: `      contactsocifly@gmail.com
    `,
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Icon onPress={handleNextPage} name="arrow-back" style={styles.icon}></Icon>
        <Text style={styles.statusT}> Privacy & Policy</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.hContainer}>
          <Text style={styles.text1}>Socifly's Privacy Policy</Text>

        </View>
        <View style={styles.hContainer}>
          <Text style={styles.text2}>Data Protection:</Text>
          <Text style={styles.text3}>{dummyText.dataProtection}</Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.text2}>Cookies:</Text>
          <Text style={styles.text3}>{dummyText.cookies}</Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.text2}>Service Providers:</Text>
          <Text style={styles.text3}>{dummyText.serviceProviders}</Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.text2}>Legal Disputes (Jurisdiction):</Text>
          <Text style={styles.text3}>{dummyText.legalDisputes}</Text>
        </View>
        <View style={styles.hContainer}>
          <Text style={styles.text2}>Contact Us:</Text>
          <Text style={styles.text3}>{dummyText.contactUs}</Text>
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
    flex: 0.8,
    paddingBottom: 100,
  },
  hContainer: {
    paddingVertical: '3%',
    paddingHorizontal: '2%',
  },
  text1: {
    fontSize: getResponsiveValue(40, 30),
    color: BLACK,
    fontWeight: 'bold',
    paddingLeft:'10%'
  },
  text2: {
    fontSize: getResponsiveValue(20, 16),
    color: BLACK,
    fontWeight: 'bold',
  },
  text3: {
    color: BLACK,
    fontSize: getResponsiveValue(18, 13),
  },
  Status: {
    width: '100%',
    backgroundColor: WHITE,
    height: "5%",
    justifyContent: "center",
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
  },
  container: {
    flex: 1,
    // alignItems: 'center',
  },

  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue('5%', '7%'),
    flexDirection: "row",

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
});

export default TermsCondition;
