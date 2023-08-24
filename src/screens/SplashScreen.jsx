import React, { useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {getResponsiveValue} from '../styles/responsive';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleNextPage = () => {
    navigation.navigate('LoginScreen');
  };

  useFocusEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    });
    fadeIn.start();

    const timer = setTimeout(handleNextPage, 3000);

    return () => {
      clearTimeout(timer);
      fadeAnim.setValue(0);
    };
  });

  return (
    <LinearGradient colors={['#8b0e68', '#020024']} style={styles.container}>
      <TouchableOpacity onPress={handleNextPage} activeScale={0.95}>
        <Animated.Image
          source={require('../assets/images/Sociflylogo.png')}
          resizeMode="contain"
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  image: {
    width: getResponsiveValue(472,236),
    height:  getResponsiveValue(472,236),
    alignSelf: 'center',
  },
});

export default SplashScreen;