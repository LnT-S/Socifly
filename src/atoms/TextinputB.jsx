import React, { useState } from "react";
import {Text , StyleSheet, View, TextInput,Pressable } from "react-native";
import { BLACK, PRIMARY } from "../styles/colors";
import { getResponsiveValue, screenWidth } from '../styles/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextinputB = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { error, onChangeText, onChangeError, ...otherProps } = props;
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
    
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChangeText = (text) => {
        onChangeText(text);
        if (error && typeof props.onChangeError === 'function') { // Check if onChangeError is a function
            props.onChangeError(''); // Clear the error when the user starts typing
        }
    };
    return (
        <View>
       
         <TextInput placeholder = { props.placeholder }
            placeholderTextColor = 'grey'
            onFocus={handleFocus}
            onBlur={handleBlur}
            // secureTextEntry = { props.secureTextEntry }
            // keyboardType = { props.keyboardType }
            // maxLength = { props.maxLength }
            {...props }
            secureTextEntry={!showPassword}
            value = { props.value }
            style={[
                styles.input,
                isFocused ? null : error ? styles.inputError : null,
            ]}
            onChangeText={handleChangeText} // Call the onChangeText function with the new value
        />

        <Pressable
        onPress={togglePasswordVisibility}
        style={styles.toggleVisibilityButton}
      >
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color={BLACK}
        />
      </Pressable>
       
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: getResponsiveValue(70, 50),
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        // textAlign: "center",
        marginBottom: getResponsiveValue(40, 20),
        color: BLACK,
        borderColor:BLACK,
        width: getResponsiveValue(500, screenWidth * 0.8),
    },
    inputError: {
        borderColor: 'red',
      },
      toggleVisibilityButton: {
        position: "absolute",
        right: 10,
        top: getResponsiveValue(15, 10),
        
      },
});

export default TextinputB;