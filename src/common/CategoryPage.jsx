import {    StyleSheet, View, Text } from 'react-native';
import React from 'react';
import ButtonA from "../atoms/ButtonA";
import TextinputA from "../atoms/TextinputA";
import LinearGradient2 from "../atoms/LinearGradient2";
import global from "../styles/global";

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import CategoryButtons from '../atoms/CategoryButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, WHITE } from '../styles/colors';
import Category from './Category';
const CategoryPage = (props) => {
    const Content = "Good Morning";
  return (
    <SafeAreaView style={styles.container}>
    <LinearGradient2 >
        <View style={styles.Container}>
            <FontAwesomeIcon
              name="angle-left"

              onPress={() => navigation.navigate("HomePage")}
              style={styles.icon}
            ></FontAwesomeIcon>
 </View>
 </LinearGradient2>
      <Category/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
flex:1,
    },
    head:{
        fontSize: 24,
        fontWeight: "bold",
        color: WHITE,
        
        marginLeft: 10,
    },
   Container: {
        flexDirection: "row",
        alignItems: "center",
      },
      Container2:{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap", // Allow items to wrap to the next line
        justifyContent: "flex-start", // Align items to the left
        marginTop: 20,
        paddingLeft: 20,
        
paddingLeft:20,
      },
      
      icon: {
        color: "#fff",
        fontSize: 40,
        marginLeft: 10,
      },
   
      
});

export default CategoryPage;