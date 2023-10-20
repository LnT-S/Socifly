import { StyleSheet, View, Text, Dimensions, } from 'react-native';
import React, { useEffect, useState } from 'react';

import CategoryButtons from '../atoms/CategoryButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
import stringsoflanguages from '../utils/ScreenStrings';
import { FETCH } from '../services/fetch';
import { useLocal } from '../context/ProfileContext';
import CustomModal from '../atoms/CustomModal';
import Swiper from 'react-native-swiper';

const Category = (props) => {

    const { localState, localDispatch } = useLocal()
    const [category, setCategory] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState({
        visible: false,
        message: '',
        navigationPage: '',
        onClose: null
    })
    useEffect(() => {
        setCategory(localState.category)
    },[localState.category]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1} >

                    {showModal ? <CustomModal 
                        visible={modal.visible} 
                        message={modal.message} 
                        navigationPage={modal.navigationPage} 
                        onClose={modal.onClose} /> : null}
                    <View style={styles.Container2}>
                        <Swiper style={styles.wrapper}>
                        {category.map((el, i) => {
                            return (<CategoryButtons key={el._id} text={el.type}  />)
                        })}
                        </Swiper>
                    </View>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
       
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
       
    },
    container1: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        left: getResponsiveValue("2%", "2%"),
       
    },
    Container2: {
        backgroundColor: WHITE,
        flexWrap: "wrap",
        flexDirection: "row",
        maxWidth: "95%",
        justifyContent: "flex-start",
        
    },
   
   
});

export default Category;