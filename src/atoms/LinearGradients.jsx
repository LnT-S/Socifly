import React from 'react';
import {
    StyleSheet,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY, SECONDARY } from '../styles/colors';

const LinearGradients = ({ children }) => {

    return (

        <LinearGradient style={styles.container} colors={[PRIMARY, SECONDARY]}>
            {children}
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        height: "50%"

    },



})


export default LinearGradients;



