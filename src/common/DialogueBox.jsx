import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import ButtonA from '../atoms/ButtonA';
import {useNavigation} from '@react-navigation/native';

const DialogueBox = ({isVisible, onClose, textContent}) => {
  const navigation = useNavigation();
  const handleOk = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{textContent}</Text>

          <View style={styles.row}>
            <View style={styles.r1}>
              <ButtonA onPress={handleOk} name={'Yes'} />
            </View>

            <View style={styles.r2}>
              <ButtonA onPress={onClose} name={'No'} />
            </View>
          </View>
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
    elevation: 5,
    alignItems: 'center',
    width: '70%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  r1: {
    right: 10,
  },
  r2: {
    left: 10,
  },
});

export default DialogueBox;
