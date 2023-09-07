import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ERROR, WHITE } from './colors';

import { getResponsiveValue } from '../styles/responsive';

module.exports = StyleSheet.create({
  bContainer: {
    top: 20,

    alignItems: 'center',
    flex: 0.8,
  },
  aContainer: {
    top: getResponsiveValue(40, 20),

    alignItems: 'center',
    flex: 0.5,
  },
  dContainer: {
    top: getResponsiveValue(100, 50),

    alignItems: 'center',
    flex: 0.5,
  },
  cContainer: {
    top: '45%',
    justifyContent: 'center',
  },

  title: {
    color: WHITE,
    fontSize: getResponsiveValue(50, 40),
    marginBottom: 20,
    fontWeight: 'bold',
  },

  cardSection: {
    shadowOffset: {
      width: 0,
      height: 10, // Increased shadow height
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 20, // Increased shadow radius for a more spread out shadow
  },
  error: {
    color: ERROR,
    bottom: 20,
  },
  // textInput: {
  //   borderWidth: 1,
  //   borderColor: 'grey', // Default border color
  // },
  // textInputError: {
  //   borderWidth: 2,
  //   borderColor: 'red', // Border color for error state
  // },

});
