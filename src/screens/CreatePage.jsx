import { StyleSheet, View, Text, Pressable, ScrollView , BackHandler,} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient2 from "../atoms/LinearGradient2";
import { SafeAreaView } from 'react-native-safe-area-context';
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePost from '../common/posts/ImagePost';
import { BLACK, WHITE } from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import { getResponsiveValue } from '../styles/responsive';
import EditPostArray from '../common/postArrays/EditPostArray';
import Icon from "react-native-vector-icons/Entypo";
import stringsoflanguages from '../utils/ScreenStrings';

const CreatePage = (props) => {
  // const [shouldShowAd, setShouldShowAd] = useState(false);
  const handleNextPage = () => {
    props.navigation.navigate('HomePage');
  };
  const handleNextPage2 = () => {
    props.navigation.navigate('Settings');

  };
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{navigation.goBack(); return true});
    return () => backHandler.remove();
  }, []);

  const [userName, setUserName] = useState("User Name");
  const [inputValue, setInputValue] = useState("");
  return (
    <SafeAreaView style={styles.container}>


      <LinearGradient2 customStyle={styles.loginGradient}>
        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            <Pressable style={({ pressed }) => [
              { opacity: pressed ? 0.7 : 0.9 },
              styles.iconWrapper,
            ]}>

              <FontAwesomeIcon
                name="angle-left"
                onPress={handleNextPage}
                style={styles.iconA}
              />
            </Pressable>
          </View>
          <Text style={styles.create}>{stringsoflanguages.new}</Text>
          <Pressable style={({ pressed }) => [
            { opacity: pressed ? 0.7 : 0.9 },
            styles.iconWrapper,
          ]}>
            <MaterialIconsIcon
              name="settings"
              onPress={handleNextPage2}
              style={styles.settingsIcon}
            />
          </Pressable>
        </View>
      </LinearGradient2>

      <Pressable style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        styles.iconWrapper,
      ]}>
        <View style={styles.iconRow2}>
          {/* <MaterialCommunityIconsIcon
          name="image-plus"
          style={styles.icon2}
        /> */}

          <Icon name="images" style={styles.icon2}></Icon>

          <View style={styles.loremIpsumColumn}>
            <Pressable style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              styles.iconWrapper,
            ]}>
              <Text style={styles.loremIpsum}>{stringsoflanguages.addImagesGallery}</Text>
            </Pressable>
            <Text style={styles.loremIpsum2}>{stringsoflanguages.createCard}</Text>
          </View>
        </View>
      </Pressable>

      <ScrollView>
        {/* <View style={styles.rect3}>
        <Text style={styles.or}>OR</Text>
        <View style={styles.icon4Row}>
          <Icon name="wallpaper" style={styles.icon4} />
          <Pressable>
            <Text style={styles.selectWallpaper}>Select Wallpaper</Text>
          </Pressable>
        </View>
      </View> */}

        <View>

          <EditPostArray
            // posts={posts}
            // renderPostComponent={renderPostComponent}
            navigation={props.navigation}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginGradient: {
    // top:20,
    height: "8%",
    // justifyContent: "center"
    // paddingHorizontal:5,
  },
  container: {
    flex: 1,
    // alignItems: "center",
  },

  iconRow: {
    paddingHorizontal: getResponsiveValue("5%", "5%"),
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"space-around",
    justifyContent: "space-between",
    // justifyContent: "space-between",
    width: "100%",
    marginTop: getResponsiveValue(20, 10),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  icon: {
    color: "#fff",
    fontSize: getResponsiveValue(40, 30),
    // left:60

  },
  iconA: {
    color: "#fff",
    fontSize: getResponsiveValue(45, 35),
    // marginLeft: getResponsiveValue(30, 20),
    // padding:"2%",
    paddingRight: getResponsiveValue("2%", "4%"),
    // backgroundColor:"black"
  },
  create: {
    color: "#fff",
    fontSize: getResponsiveValue(20, 16),
    textAlign: "center",
    fontWeight: "bold",
    // left:getResponsiveValue("2%","2%"),
    marginLeft: getResponsiveValue("2%", "4%"),
  },
  settingsIcon: {
    color: "#fff",
    // position:"relative",
    // left:getResponsiveValue(100, 40),
    // marginLeft: getResponsiveValue(100, 60),
    fontSize: getResponsiveValue(35, 25),
  },
  icon2: {
    color: "rgba(0,0,0,1)",
    fontSize: getResponsiveValue(90, 60),
  },
  loremIpsum: {
    color: "#121212",
    fontSize: getResponsiveValue(18, 16),
    paddingLeft: getResponsiveValue(30, 20),
    fontWeight: "bold",
  },
  loremIpsum2: {
    color: "#121212",
    marginTop: getResponsiveValue(5, 3),
    paddingLeft: getResponsiveValue(30, 20),
  },
  iconRow2: {
    width: "100%",
    backgroundColor: WHITE,
    paddingTop: getResponsiveValue(20, 10),
    paddingBottom: getResponsiveValue(50, 30),
    paddingLeft: getResponsiveValue(30, 20),
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: getResponsiveValue(9, 6),
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: getResponsiveValue(20, 15),
  },
  or: {
    fontSize: getResponsiveValue(20, 16),
    color: BLACK,
  },
  rect3: {
    marginTop: getResponsiveValue(10, 8),
    alignItems: "center",
  },
  icon4: {
    color: "rgba(0,0,0,1)",
    fontSize: getResponsiveValue(40, 30),
  },
  selectWallpaper: {
    color: "rgba(74,144,226,1)",
    marginLeft: getResponsiveValue(20, 15),
    marginTop: 0,
  },
  icon4Row: {
    height: getResponsiveValue(44, 30),
    flexDirection: "row",
    marginTop: getResponsiveValue(17, 12),
    alignItems: "center",
  },
});

export default CreatePage;
