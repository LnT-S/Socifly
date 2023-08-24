import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {getResponsiveValue} from '../styles/responsive';
import { WHITE } from '../styles/colors';

const IconButton = ({children}) => {
  
  return (
    <LinearGradient colors={['#620063', '#370037']} style={styles.iconButton}>
      <Pressable >{children}</Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getResponsiveValue(20, 10),
    overflow: 'hidden',
    borderWidth:getResponsiveValue(4,2),
    borderColor:WHITE,
  },
});
export default IconButton;
