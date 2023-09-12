import React, { useState } from "react";
import {Text , StyleSheet, View, TextInput } from "react-native";
import { BLACK } from "../styles/colors";
import { getResponsiveValue, screenWidth } from '../styles/responsive';


const TextinputC = (props) => {
   
    return (
        <View>
       
         <TextInput placeholder = { props.placeholder }
            placeholderTextColor = "#888888"
         
            style={styles.input}
            {...props }
           
         
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

export default TextinputC;