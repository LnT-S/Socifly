
import React, { useState } from "react";
import {Text , StyleSheet, View, TextInput } from "react-native";
import { BLACK } from "../styles/colors";
import { getResponsiveValue, screenWidth } from '../styles/responsive';


const TextinputA = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const { error, onChangeText, onChangeError, ...otherProps } = props;
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
       
       <TextInput
  placeholder={props.placeholder}
  placeholderTextColor="#888888"
  onFocus={handleFocus}
  onBlur={handleBlur}
  {...props}
  value={props.value}
  style={[
    styles.input,
    isFocused ? null : props.error ? styles.inputError : null,
  ]}
  onChangeText={handleChangeText}
/>

       
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
        width: getResponsiveValue(500, screenWidth * 0.8),
    },
    inputError: {
        borderColor: 'red',

      },
});

export default TextinputA;