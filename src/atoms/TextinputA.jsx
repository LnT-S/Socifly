import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { BLACK } from "../styles/colors";

// const { width: screenWidth } = Dimensions.get('window');
// const INPUT_WIDTH = screenWidth * 0.8; // Adjust as needed
// const INPUT_HEIGHT = 50;

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768; // Adjust the breakpoint as needed
const INPUT_WIDTH = isTablet ? 500 : screenWidth * 0.8;

const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);

const TextinputA = (props) => {
    // console.log('TextInputA',props)
    return (
        <View>
            <TextInput
                placeholder={props.placeholder}
                placeholderTextColor="#888888"
                {...props}
                value = {props.value}
                style={[styles.input, { width: INPUT_WIDTH }]}
            // onChangeText={(v)=>{props?.onChangeText}}
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
    },
});

export default TextinputA;
