import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {BLACK, WHITE} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import Icon from "react-native-vector-icons/MaterialIcons";

const TermsCondition = (props) => {
  const handleNextPage = () => {
    props.navigation.navigate('Settings');
  };
    const dummyText = {
        dataProtection: `
          Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.
          Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.`,
        jurisdiction: `
        Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.
        Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.`,
  
        contact: `
        Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.
          Data Protection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada commodo nunc,ut sodales sem cursus sed. Fusce viverra euismod ipsum, eu bibendum libero tincidunt id. Donec faucibusante in arcu gravida, id aliquam leo sollicitudin. Proin ac fermentum elit. Nullam vitae enim id quamvenenatis euismod. Pellentesque sollicitudin, velit vel mattis varius, tortor libero tempus nisl, eu tristiqueelit dui non purus.`,
    
      };
      
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.status}>
    <Icon  onPress={handleNextPage} name="arrow-back" style={styles.icon}></Icon>
    <Text style={styles.statusT}> Terms & Condition</Text>
  </View>
    <ScrollView style={styles.scroll}>
      <View style={styles.hContainer}>
        <Text style={styles.text1}>Socifly's Terms of Use</Text>
 
      </View>
      <View style={styles.hContainer} >
        <Text style={styles.text2}>Changes To Terms And Services</Text>
        <Text style={styles.text3}>{dummyText.dataProtection}</Text>
      </View>
      <View style={styles.hContainer}>
        <Text style={styles.text2}>Who May Use Our Services</Text>
        <Text style={styles.text3}>{dummyText.dataProtection}</Text>
      </View>
      <View style={styles.hContainer}>
        <Text style={styles.text2}>How To Use Our Services</Text>
        <Text style={styles.text3}>{dummyText.dataProtection}</Text>
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
  scroll:{
flex:0.8,
paddingBottom:100,
  },
  hContainer: {
    paddingVertical: '3%',
    paddingHorizontal: '5%',
  },
  text1: {
    fontSize: getResponsiveValue(40, 30),
    color: BLACK,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: getResponsiveValue(20, 15),
    color: BLACK,
    fontWeight: 'bold',
  },
  text3:{
    color:BLACK,
    fontSize:12,
  },
  Status:{
    width:'100%',
    backgroundColor:WHITE,
    height:"5%",
    justifyContent:"center",
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  statusT:{
    color:BLACK,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
  },

  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue('5%','7%'),
    flexDirection:"row",

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
    top:getResponsiveValue(17,14),
    fontSize:getResponsiveValue(16,16),
    left:getResponsiveValue(40,30),
  },
  icon:{
color:BLACK,
fontSize:getResponsiveValue(30,25),
top:getResponsiveValue(20,14),
left:getResponsiveValue(30,20),
  },
});

export default TermsCondition;
