import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, PRIMARY, SECONDARY, WHITE } from '../styles/colors';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IconButton from '../atoms/IconButton';
import { getResponsiveValue,screenWidth} from '../styles/responsive'; 
import defaultProfileImage from '../assets/images/Profile2.png';

const Post4 = ({ source }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}> 
    
        <View style={styles.imageContainer}>
          <Image
            source={source}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <Image source={defaultProfileImage} style={styles.profileImage} />
        <Text style={styles.Name}>User Name</Text>
        <Text style={styles.Name2}>+91 9999555500</Text>
        <Text style={styles.Name2}>user123email@email.com</Text>
        <View style={styles.horizontal}></View>
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
    height:"90%",
    width:getResponsiveValue(screenWidth * 0.8 , screenWidth - 50),
    backgroundColor: SECONDARY,
   
    shadowColor: BLACK,
    marginTop:getResponsiveValue(0,10),
    marginBottom:getResponsiveValue(10,10),
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
    width: '100%', 
    height: undefined, 
    aspectRatio: 308 / 346, 
    borderWidth: getResponsiveValue(4,2), 
    borderColor: WHITE,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 10,
    paddingHorizontal:getResponsiveValue(15,10),
    backgroundColor: SECONDARY,
    position: 'relative',
    
    bottom:getResponsiveValue("20%","20%"),
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight:getResponsiveValue(20,7),
 
    
  },
  icon1: {
    color: "rgba(235,124,148,1)",
    marginLeft:getResponsiveValue(10,0),
    fontSize:getResponsiveValue(100,50),
    backgroundColor:WHITE,
    borderRadius:getResponsiveValue(100,50),
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    padding: 7,
    fontSize:getResponsiveValue(60,30),
    // paddingLeft:getResponsiveValue(10,0),
    // backgroundColor:WHITE,
  },
  profileImage: {
    width: getResponsiveValue(200, 100),
    height: getResponsiveValue(200, 100),
    borderRadius: getResponsiveValue(120, 60),
    // transform: [{ rotate: '-10deg' }],
    backgroundColor: "grey",
    borderWidth: getResponsiveValue(6.5,3.5), 
    borderColor: WHITE,
    position: 'relative',
    left:getResponsiveValue("35%", "35%"),
  
    bottom:getResponsiveValue("12%", "12%"),
    // marginBottom: getResponsiveValue(10, 15),
  },
  Name:{
    fontSize:getResponsiveValue(20,20),
    color: WHITE,
    fontWeight:"bold",
    // backgroundColor:WHITE,
    // width:"auto",
    position: 'relative',
    left:getResponsiveValue("10%", "10%"),
    bottom:getResponsiveValue("13%", "13%"),
  },
  Name2:{
    fontSize:getResponsiveValue(14,12),
    color: WHITE,

    // backgroundColor:WHITE,
    // width:"auto",
    position: 'relative',
    left:getResponsiveValue("50%", "50%"),
    bottom:getResponsiveValue("16%", "16%"),
  },
  horizontal:{
    width:"100%",
    height:getResponsiveValue(4,2),
    backgroundColor:WHITE,
    position: 'relative',
    // left:getResponsiveValue("50%", "50%"),
    bottom:getResponsiveValue("15%", "15%"),
  }

});

export default Post4;
