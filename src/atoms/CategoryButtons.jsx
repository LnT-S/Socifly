import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BLACK, WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive'; 


const CategoryButtons = ({ text }) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: WHITE,
      padding: getResponsiveValue(10, 8),
      borderRadius: 22,
      // marginLeft: getResponsiveValue(15, "5%"),
      // marginRight: getResponsiveValue(0, "1%"),
      // marginBottom: getResponsiveValue(15, "3%"),

      marginHorizontal:"3%",
      marginVertical:"1.5%",

      shadowColor: BLACK,
      shadowOffset: {
        width: 0,
        height: getResponsiveValue(6, 3), 
      },
      elevation: 30,
      shadowOpacity: 0.8, 
      shadowRadius: getResponsiveValue(15, 10), 
    },
    text: {
      color: BLACK,
      fontSize: getResponsiveValue(14, 12),
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButtons;