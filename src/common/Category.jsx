import { StyleSheet, View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

import CategoryButtons from '../atoms/CategoryButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
import stringsoflanguages from '../utils/ScreenStrings';
import { FETCH } from '../services/fetch';
import { useLocal } from '../context/ProfileContext';
import CustomModal from '../atoms/CustomModal';

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

    async function getCategory() {
        let { data, status } =await FETCH(
            'GET',
            '/home/get-category',
            ''
        )
        // console.log(data.data[0])
        if (status === 200) {
            localDispatch({
                type : 'CATEGORY',
                payload: data.data
            })
            setCategory(localState.category)
        } else {
            let a = setModal({
                visible: true,
                message: data.message,
                navigationPage: 'LoginScreen',
                onClose: () => { setShowModal(false) }
              })
              setShowModal(true)
        }
    }

    useEffect(() => {
        getCategory().then().catch(err=>console.log('EFFECT ERROR 1',err))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1} >
        {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
                <View style={styles.Container2}>
                {category.map((el,i)=>{
                    return (<CategoryButtons text={el.type} key={el._id}/>)
                })}
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