import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFoundScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>404 - Page Not Found</Text>
      <Button title="Go Back" onPress={goBack} />
    </View>
  );
};

export default NotFoundScreen;