// App.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

import * as ImagePicker from 'react-native-image-picker'
export default class SelectedImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }
  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.default.showImagePicker(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };
  render() {
    return (
        <View style={styles.container}>
        <View style={styles.container}>
          {this.state.resourcePath.uri && (
            <Image
              source={{ uri: this.state.resourcePath.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Text style={{ alignItems: 'center' }}>
            {this.state.resourcePath.uri}
          </Text>
          <TouchableOpacity onPress={this.selectFile} style={styles.button}>
            <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    bottom:10

      
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});