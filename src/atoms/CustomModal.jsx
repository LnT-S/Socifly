import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ButtonA from './ButtonA';

const CustomModal = ({ visible, message, navigationPage , onClose}) => {
  console.log('LOG : In Custom MOdal',message)
  const [v , setV] = useState(visible)
  const navigation = useNavigation();
  function onForceClose(){
    setV(false)
    if(navigationPage===''){
      navigation.goBack()
    }else{
      navigation.navigate(navigationPage);
    }
  }
  function handleClickOnClose(){
    try {
      if(onClose!==null || onClose !== undefined){
        onClose()
      }
      onForceClose()
    } catch (err) {
      console.log('Error CLosing Modal',err)
    }
  }

  return (
    <Modal transparent animationType="slide" visible={v}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{message===''?'Message':message}</Text>
          <ButtonA onPress={handleClickOnClose} name={'Close'}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color : 'black',
    fontWeight : '400'
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue', // Customize the close button styling
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomModal;
