import { StyleSheet, View, Text, Dimensions } from 'react-native';
import React from 'react';

import CategoryButtons from '../atoms/CategoryButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive'; 
import stringsoflanguages from '../utils/ScreenStrings';

const Category = (props) => {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container1} >
            <View style={styles.Container2}>
                <CategoryButtons text={stringsoflanguages.goodMorning} />
                <CategoryButtons text={stringsoflanguages.goodNight} />
                <CategoryButtons text={stringsoflanguages.love}/>
                <CategoryButtons text={stringsoflanguages.motivational} />
                <CategoryButtons text={stringsoflanguages.festival} />
                <CategoryButtons text={stringsoflanguages.specialDay}/>
                <CategoryButtons text={stringsoflanguages.devotional} />
                <CategoryButtons text={stringsoflanguages.birthday} />
            </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
    },
    container1:{
        justifyContent:"center",
        alignItems:"center",
        width: "100%",
        left: getResponsiveValue("2%","2%"),
    },
    Container2: {
        backgroundColor: WHITE,
        flexWrap: "wrap", 
        flexDirection:"row",
        maxWidth: "95%",
        justifyContent:"flex-start",
    },
});

export default Category;
