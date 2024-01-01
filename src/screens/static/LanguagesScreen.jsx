import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BLACK, WHITE,PRIMARY, SECONDARY } from '../../styles/colors';
import { getResponsiveValue } from '../../styles/responsive';
import stringsoflanguages from '../../utils/ScreenStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocal } from '../../context/ProfileContext';
import RadialGradient from 'react-native-radial-gradient';

const LanguagesScreen = ({ navigation }) => {
  const{localState, localDispatch} = useLocal()
  const lang = [
    { shortform: 'english', longform: 'ENGLISH' },
    { shortform: 'hindi', longform: 'HINDI' },
    { shortform: 'marathi', longform: 'MARATHI' },
  ];

  
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    // Load the selected language from AsyncStorage when the component mounts
    AsyncStorage.getItem('selectedLanguage').then((value) => {
      if (value) {
        stringsoflanguages.setLanguage(value);
        setSelectedLanguage(value);
      }
    });
  }, []);

  const setLanguageAndPersist = (value) => {
    stringsoflanguages.setLanguage(value);
    setSelectedLanguage(value);
    AsyncStorage.setItem('selectedLanguage', value); // Persist selected language
    localDispatch({
      type: "LANG",
      payload : value
    })
    console.log(`Language set to ${value}`);
    navigation.navigate('HomePage', { JSON_Clicked_Item: value  , TOKEN : true});
  };


  // const settext = (value) => {
  //   stringsoflanguages.setLanguage(value);
  //   console.log(`Language set to ${value}`);
  //   navigation.navigate('LoginScreen', { JSON_Clicked_Item: value });
  // };

  return (
    <View style={styles.container}>
    <RadialGradient
      colors={[PRIMARY, SECONDARY]}
      style={styles.container}
      stops={[0.2, 1]} // Adjust stops as needed
      radius={350} // Adjust radius as needed
    >
    <View style={styles.card}>
       
      <Text style={styles.header}>Select Your Language</Text>
      <View style={styles.vertical} />

      {lang.map((item, key) => (
        <TouchableOpacity
          style={[styles.btn, selectedLanguage === item.shortform && styles.selectedLanguage]}
          key={key}
          onPress={() => setLanguageAndPersist(item.shortform)}
        >
          <Text style={styles.languageOption}>{item.longform}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </RadialGradient>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: WHITE,
    height: 'auto',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsiveValue('5%', '5%'),
    borderRadius: getResponsiveValue(22, 22),
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: getResponsiveValue(6, 3),
    },
    elevation: 30,
    shadowOpacity: 0.8,
    shadowRadius: getResponsiveValue(15, 10),
  },
  header: {
    fontSize: getResponsiveValue(30, 20),
    marginBottom: getResponsiveValue('10%', '10%'),
    color: BLACK,
    fontWeight: "bold",
  },
  languageOption: {
    fontSize: getResponsiveValue(25, 16),
    marginVertical: getResponsiveValue('5%', '5%'),
    color: 'grey',
    fontWeight: "bold",
  },
  vertical: {
    width: '100%',
    height: '0.4%',
    backgroundColor: 'grey',
  },
});

export default LanguagesScreen;