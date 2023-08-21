import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, WHITE } from '../styles/colors';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IconButton from '../atoms/IconButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768; // Adjust the breakpoint as needed
const CARD_WIDTH = isTablet ? screenWidth * 0.8 : screenWidth - 50; // Adjust as needed
const getResponsiveValue = (tabletValue, mobileValue) => (isTablet ? tabletValue : mobileValue);



const Post = ({ source }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
        <View style={styles.imageContainer}>
          <Image
            source={source}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.toolbar}>
          <Pressable>
            <MaterialCommunityIconsIcon
              name="heart-circle"
              style={styles.icon1}
            />
          </Pressable>
          <View style={styles.iconGroup}>
            <IconButton>
              <FeatherIcon name="share-2" style={styles.icon2} />
            </IconButton>
            <IconButton>
              <FeatherIcon name="download" style={styles.icon2} />
            </IconButton>
            <IconButton>
              <EntypoIcon name="edit" style={styles.icon2} />
            </IconButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: WHITE,
    shadowColor: BLACK,
    marginTop:20,
    marginBottom:40,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '90%', // Full width of the card
    height: undefined, // Automatically adjusts height to maintain aspect ratio
    aspectRatio: 308 / 346, // Adjust aspect ratio as needed
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight:getResponsiveValue(20,7),
  },
  icon1: {
    color: "rgba(235,124,148,1)",
    marginLeft:getResponsiveValue(10,0),
    fontSize:getResponsiveValue(60,50),
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    padding: 7,
    fontSize:getResponsiveValue(40,30),
    // paddingLeft:getResponsiveValue(10,0),

  },
});

export default Post;
