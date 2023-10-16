import React, { useRef, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
// import {LinearGradient} from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getResponsiveValue } from '../../styles/responsive';
import { PRIMARY, SECONDARY } from '../../styles/colors';



const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleNextPage = () => {
    navigation.navigate('LoginScreen');
  };

  useFocusEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    });
    const growingAnim = Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    const glowingAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    fadeIn.start();
    growingAnim.start();
    glowingAnim.start();

    const timer = setTimeout(handleNextPage, 3000);

    return () => {
      clearTimeout(timer);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    };
  });



  return (
    <RadialGradient
      colors={[PRIMARY, SECONDARY]}
      style={styles.container}
      stops={[0.2, 1]} // Adjust stops as needed
      radius={350} // Adjust radius as needed
    >
      <TouchableOpacity onPress={handleNextPage} activeScale={0.95}>
        <Animated.Image
          source={require('../../assets/images/Sociflylogo.png')}
          resizeMode="contain"
          style={[
            styles.image,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />

      </TouchableOpacity>
    </RadialGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: getResponsiveValue(472, 236),
    height: getResponsiveValue(472, 236),
    alignSelf: 'center',
    

  },
});

export default SplashScreen;