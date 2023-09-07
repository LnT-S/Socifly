import React, {useState} from 'react';
import {Modal, View,StyleSheet} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import ButtonA from '../atoms/ButtonA';

const CustomColorPicker = ({
  color,
  onColorChange,
  onColorChangeComplete,
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.colorPickerModal}>
        <ColorPicker
          color={color}
          onColorChange={onColorChange}
          onColorChangeComplete={onColorChangeComplete}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
          row={false}
          swatchesLast={true}
          swatches={true}
          discrete={false}
          style={{
            backgroundColor: 'grey',
            width: '100%',
            height: '100%',
            padding: '2%',
            borderRadius: 22,
          }}
        />
        <View style={{marginTop: '2%', paddingHorizontal: '10%'}}>
          <ButtonA name="Save" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  colorPickerModal: {
    width: '95%', // Adjust the width as needed
    height: '60%', // Adjust the height as needed
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    position: 'absolute', // Add this line
    top: '20%', // Adjust the top position as needed
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

export default CustomColorPicker;
