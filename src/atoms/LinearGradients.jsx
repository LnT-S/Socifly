import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PRIMARY, SECONDARY} from '../styles/colors';

const LinearGradients = ({children, customStyle }) => {
  return (
    <LinearGradient style={[styles.backgroundGradient, customStyle]} colors={[PRIMARY, SECONDARY]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LinearGradients;
