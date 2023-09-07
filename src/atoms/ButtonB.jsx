import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getResponsiveValue,screenWidth } from '../styles/responsive'; 
import { PRIMARY, SECONDARY } from '../styles/colors';
import { View } from 'react-native-animatable';
import Icon from "react-native-vector-icons/Entypo";

const ButtonB = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [
      { opacity: pressed ? 0.8 : 1 },
      styles.iconWrapper,
      styles.buttonContainer
    ]}>
      <View style={styles.button}>
      <View style={styles.iconTextContainer}>
      <Icon name={props.names} style={styles.icon} />
        <Text style={styles.text}>{props.name}</Text>
        </View>
        </View>
    </Pressable>
  );
}

export default ButtonB;

const styles = StyleSheet.create({
  buttonContainer: {
    // alignItems: 'center',
    
    // flexDirection:"row",
 
  },
  iconTextContainer: {
    flexDirection: 'row', // Display icon and text side by side
    alignItems: 'center', // Center vertically within the button
    paddingHorizontal: getResponsiveValue(16, 12), // Add horizontal padding
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: getResponsiveValue(30,20),
  },
  text: {
    color: "grey",
    // fontSize: getResponsiveValue(18,16),
    // textAlign: 'center',
    // paddingVertical: 10,
    // paddingHorizontal:getResponsiveValue("5%" , "8%"),
    // letterSpacing: 1,
    marginLeft:"3%",
  },
  button: {
    width: getResponsiveValue(500, screenWidth * 0.8),
    height: getResponsiveValue(70, 50),
    borderRadius: 6,
    // alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    border: 2,
    borderWidth: 1,
    
  },
});