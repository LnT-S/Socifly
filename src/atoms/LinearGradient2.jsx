import React from 'react';
import {
    StyleSheet,


} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY,  TERTIARY } from '../styles/colors';

const LinearGradient2 = ({ children }) => {

    return (

        <LinearGradient style={styles.container} colors={[PRIMARY, TERTIARY]}>
            {children}
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        justifyContent: "center",
        // alignItems: "center",
        height: "10%",
    },


})


export default LinearGradient2;



