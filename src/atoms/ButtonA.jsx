import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getResponsiveValue,screenWidth } from '../styles/responsive'; 
import { PRIMARY, SECONDARY } from '../styles/colors';


const ButtonA = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [
      { opacity: pressed ? 0.8 : 1 },
      styles.iconWrapper,
      styles.buttonContainer
    ]}>
      <LinearGradient style={[styles.button]} colors={[PRIMARY, SECONDARY]}>
        <Text style={styles.text}>{props.name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

export default ButtonA;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: getResponsiveValue(18,16),
    textAlign: 'center',
    // paddingVertical: 10,
    paddingHorizontal:getResponsiveValue("5%" , "8%"),
    letterSpacing: 1,
  },
  button: {
    height: getResponsiveValue( 60 , screenWidth * 0.12),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    
  },
});