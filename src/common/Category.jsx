import { StyleSheet, View, Text, Dimensions } from 'react-native';
import React from 'react';

import CategoryButtons from '../atoms/CategoryButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);

const Category = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.Container2}>
                <CategoryButtons text="Good Morning" />
                <CategoryButtons text="Good Night" />
                <CategoryButtons text="Love" />
                <CategoryButtons text="Motivational" />
                <CategoryButtons text="Festival" />
                <CategoryButtons text="Special Day" />
                <CategoryButtons text="Devotional" />
                <CategoryButtons text="Birthday" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container2: {
        backgroundColor: WHITE,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap", // Allow items to wrap to the next line
        justifyContent: "flex-start", // Align items to the left
        paddingHorizontal: getResponsiveValue(60, 10),
        paddingTop: getResponsiveValue(10, 5),
        paddingBottom: getResponsiveValue(10, 5),
        paddingLeft:getResponsiveValue(55, 15)
        // position:"relative",
        // left:getResponsiveValue(0, "%"),
     
    },
});

export default Category;
