import { SafeAreaView, StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import React from 'react';
import ButtonA from "../atoms/ButtonA";
import TextinputA from "../atoms/TextinputA";
import LinearGradients from "../atoms/LinearGradients";
import global from "../styles/global";

import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";


const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768; 

const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);


const ProfileScreen = (props) => {
  const handleNextPage = () => {
    props.navigation.navigate('HomePage');
  };
  const handleNextPage2 = () => {
    props.navigation.navigate('HomePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients>
        <View style={styles.header}>
          <Pressable
            onPress={handleNextPage2}
            style={styles.iconWrapper}
          >
            <EntypoIcon name="menu" style={styles.icon} />
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={styles.iconWrapper}
          >
            <MaterialIconsIcon
              name="settings"
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.middleContainer}>
          <FontAwesomeIcon
            name="user-circle"
            style={styles.icon3}
          />
          <Text style={styles.yourName}>Your Name</Text>
          <Text style={styles.yourEmail}>your-email@email.com</Text>
        </View>
      </LinearGradients>
      <View style={global.aContainer}>
        <ButtonA
          name={"EDIT PROFILE"}
          onPress={handleNextPage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    width:"100%",
  },
  iconWrapper: {
    paddingHorizontal: 10,
  },
  icon: {
    color: "white",
    fontSize: getResponsiveValue(40,30),
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  icon3: {
    color: "#fff",
    fontSize: getResponsiveValue(240,120),
  },
  yourName: {
    color: "#fff",
    fontSize: getResponsiveValue(30,24),
    marginTop: 10,
    fontWeight: "bold",
  },
  yourEmail: {
    color: "#fff",
    fontSize:getResponsiveValue(20,16),
  },
});

export default ProfileScreen;
