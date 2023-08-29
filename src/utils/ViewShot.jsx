import React, {useRef} from 'react';
import {View} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const ViewShot = props => {
  const cardRef = useRef(null);

  const handleCapture = async () => {
    if (cardRef.current) {
      try {
        const uri = await captureRef(cardRef, {
          format: 'png',
          quality: 1,
        });

        const dir = RNFS.PicturesDirectoryPath;
        const fileName = `${Date.now()}.png`;
        const filePath = `${dir}/${fileName}`;
        await RNFS.copyFile(uri, filePath);

        console.log('Image saved:', filePath);

        // Call the onCapture prop if provided
        if (onCapture) {
          onCapture(filePath);
        }
      } catch (error) {
        console.error('Error capturing view:', error);
      }
    }
  };

  return (
    <View ref={cardRef}>
      {props?.children}
      {/* You can add a button or other UI elements to trigger capture if needed */}
      {/* Example: <Button title="Capture" onPress={handleCapture} /> */}
    </View>
  );
};

export default ViewShot;
