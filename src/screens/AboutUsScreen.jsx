import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'react-native-linear-gradient';
import { getResponsiveValue } from '../styles/responsive';

const AboutUsScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    });
    fadeIn.start();

    return () => {
      fadeAnim.setValue(0);
    };
  });

  return (
    <View style={styles.container}>
    <Text style={styles.title}>About Us</Text>
      <SectionWithLogo fadeAnim={fadeAnim} />

      <Text style={styles.title}>Create your daily</Text>
      <LinearGradient colors={['#8b0e68', '#020024']} style={styles.bgLG}>
        <Text style={styles.text2}>Whatsapp Status on Socilfly</Text>
      </LinearGradient>

      <Text style={styles.sectionTitle}>Features:</Text>
      <View style={styles.textItems}>
        <Text style={styles.textItem}>1) Fresh quotes everyday.</Text>
        <Text style={styles.textItem}>2) Quotes for special occasions.</Text>
        <Text style={styles.textItem}>3) Easy download & Share.</Text>
        <Text style={styles.textItem}>4) Save your Favourite quote.</Text>
      </View>

      <SectionWithLogo fadeAnim={fadeAnim} />

      <Text style={styles.texts}>Address</Text>
    </View>
  );
};

const SectionWithLogo = ({ fadeAnim }) => (
  
  <LinearGradient colors={['#8b0e68', '#020024']} style={styles.container}>
    <TouchableOpacity activeScale={0.95}>
      <Animated.Image
        source={require('../assets/images/Sociflylogo.png')}
        resizeMode="contain"
        style={[styles.image, { opacity: fadeAnim }]}
      />
    </TouchableOpacity>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
   hight:'80%',
   top:5,
    
  },
  bgLG: {
    width: '90%',
    borderRadius: 8,
    marginVertical: 10,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  image: {
    width: getResponsiveValue(472, 236),
    height: getResponsiveValue(472, 116),
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textItems: {
    backgroundColor: '#fefefe',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textItem: {
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  texts: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 110,
  },
});

export default AboutUsScreen;
