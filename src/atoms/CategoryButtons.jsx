import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BLACK, WHITE } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

// Function to calculate responsive values
const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);

const CategoryButtons = ({ text }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: WHITE,
      padding: getResponsiveValue(10, "2%"),
      borderRadius: 22,
      marginLeft: getResponsiveValue(15, "2%"),
      // marginRight: getResponsiveValue(10, "2%"),
      marginBottom: getResponsiveValue(15, "3%"),
      shadowColor: BLACK,
      shadowOffset: {
        width: 0,
        height: getResponsiveValue(6, 3), // Adjusted shadow height
      },
      elevation: 30,
      shadowOpacity: 0.8, // Adjusted shadow opacity
      shadowRadius: getResponsiveValue(15, 10), // Adjusted shadow radius
    },
    text: {
      color: BLACK,
      fontSize: getResponsiveValue(14, 13),
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButtons;