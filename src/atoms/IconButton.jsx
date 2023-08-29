import React, { useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getResponsiveValue } from '../styles/responsive';
import { WHITE } from '../styles/colors';

const IconButton = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleValue, {
      toValue: 0.95, // Zoom out effect
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleValue, {
      toValue: 1, // Zoom in effect
      useNativeDriver: true,
    }).start();
    props.onPress(); // Call the original onPress function
  };

  const animatedStyles = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 }, // Adjust opacity when pressed
        styles.iconButton,
      ]}
    >
      <Animated.View style={[animatedStyles]}>
        <LinearGradient colors={['#620063', '#370037']} style={styles.buttonContent}>
          {props?.children}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 15,
    marginLeft: getResponsiveValue(20, 10),
    overflow: 'hidden',
  },
  buttonContent: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;