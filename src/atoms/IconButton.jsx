import { View, Text,StyleSheet,Pressable, Dimensions } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768; // Adjust the breakpoint as needed
const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);

const IconButton = ({children}) => {
  return (
    <LinearGradient
    colors={["#620063", "#370037"]}
    style={styles.iconButton}
  >
    <Pressable>
      {children}
    </Pressable>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
    iconButton: {
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: getResponsiveValue(20,10),
        overflow: "hidden",
      },
}
);
export default IconButton;