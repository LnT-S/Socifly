import React from 'react';
import { StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768; // Adjust the breakpoint as needed
const BUTTON_WIDTH = isTablet ? "5%" : "8%";
const BUTTON_HEIGHT = isTablet ? 60 : screenWidth * 0.12;
// const BUTTON_HEIGHT = 45;
const BORDER_RADIUS = 6;
const FONT_SIZE = 18;

const ButtonA = (props) => {
  return (
    <Pressable onPress={props.onPress} style={[styles.buttonContainer]}>
      <LinearGradient style={[styles.button, { width: '100%' }]} colors={['#8b0e68', '#020024']}>
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
  text: {
    color: 'white',
    fontSize: FONT_SIZE,
    textAlign: 'center',
    // paddingVertical: 10,
    paddingHorizontal:BUTTON_WIDTH,
    letterSpacing: 1,
  },
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
