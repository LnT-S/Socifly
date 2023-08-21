import React from 'react';
import {StyleSheet,Image, TouchableOpacity } from 'react-native';
import {PRIMARY, SECONDARY } from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";

const SplashScreen = () => {

  const navigation = useNavigation();
  const handleNextPage = () => {
    navigation.navigate('LoginScreen');
  };

  useEffect(() => {
    const timer = setTimeout(handleNextPage, 1000); // 4 seconds delay (4000 milliseconds)

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  },
  []);

  return (
    <LinearGradient colors={["#8b0e68", "#020024"]} style={styles.container}>
    <TouchableOpacity style={styles.container} onPress={handleNextPage} >
        <Image
          source={require("../assets/images/Sociflylogo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </TouchableOpacity>
      </LinearGradient> 
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 146,
    height: 146,
    alignSelf: "center",
    
  },
})