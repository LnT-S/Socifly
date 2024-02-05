import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckBoxWithText = (props) => {
    const { checked, setChecked } = props
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={checked || false}
                    onValueChange={(newVal) => { setChecked(newVal) }}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>{props.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: 'center',
    },
    label: {
        margin: 6,
        fontSize: 20
    },
});

export default CheckBoxWithText;