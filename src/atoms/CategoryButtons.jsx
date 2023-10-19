import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BLACK, WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
import { FETCH } from '../services/fetch';
import { useLocal } from '../context/ProfileContext';
import CustomModal from './CustomModal';


const CategoryButtons = ({ text }) => {
  const { localState, localDispatch } = useLocal()
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })

  async function getImageByCategory() {
    let { status, data } = await FETCH(
      'GET',
      '/home/get-images-by-category',
      {
        lang: localState.lang,
        category: text
      }
    )
    if (status === 200) {
      localDispatch({
        type: "IMAGES",
        payload: data.data
      })
    } else {
      let a = setModal({
        visible: true,
        message: JSON.stringify(data),
        navigationPage: 'LoginScreen',
        onClose: () => { setShowModal(false) }
      })
      
      setShowModal(true)
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={getImageByCategory}>
      {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    padding: getResponsiveValue(10, 8),
    borderRadius: 22,
    // marginLeft: getResponsiveValue(15, "5%"),
    // marginRight: getResponsiveValue(0, "1%"),
    // marginBottom: getResponsiveValue(15, "3%"),

    marginHorizontal: "2%",
    marginVertical: "1.5%",

    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: getResponsiveValue(6, 3),
    },
    elevation: 30,
    shadowOpacity: 0.8,
    shadowRadius: getResponsiveValue(15, 10),
  },
  text: {
    color: BLACK,
    fontSize: getResponsiveValue(14, 12),
  },
});
export default CategoryButtons;