import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { BLACK } from "../styles/colors";
import { getResponsiveValue, screenWidth } from '../styles/responsive';


const TextinputA = (props) => {
    return (
        <View>
       
         <TextInput placeholder = { props.placeholder }
            placeholderTextColor = "#888888"
            // secureTextEntry = { props.secureTextEntry }
            // keyboardType = { props.keyboardType }
            // maxLength = { props.maxLength }
            {...props }
            value = { props.value }
            style = { styles.input }
            // onChangeText={(v)=>{props?.onChangeText}}
            onChangeText={props.onChangeText}
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
});

export default TextinputA;
