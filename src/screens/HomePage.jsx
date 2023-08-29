import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient2 from '../atoms/LinearGradient2';
import {SafeAreaView} from 'react-native-safe-area-context';
import Category from '../common/Category';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Post1 from '../common/Post1';
import Post2 from '../common/Post2';
import Post3 from '../common/Post3';
import Post4 from '../common/Post4';
import {BLACK, WHITE} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import PostArray from '../common/PostArray';




const HomePage = props => {
  const handleNextPage = () => {
    props.navigation.navigate('ProfileScreen');
  };

  const handleNextPage2 = () => {
    props.navigation.navigate('CreatePage');
  };


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient2 customStyle={styles.loginGradient}>
        <View style={styles.iconStackRow}>
          <View style={styles.iconStack}>
            <TextInput placeholder="" style={styles.textInput} />
            <FeatherIcon name="search" style={styles.icon2} />
          </View>
          <Pressable style={styles.button}>
            <View style={styles.createRow}>
              <Text style={styles.create}>New</Text>

              <IoniconsIcon
                onPress={handleNextPage2}
                name="ios-add-circle-outline"
                style={styles.icon3}></IoniconsIcon>
            </View>
          </Pressable>
          <MaterialCommunityIconsIcon
            name="account-settings"
            style={styles.icon4}
            onPress={handleNextPage}></MaterialCommunityIconsIcon>
        </View>
      </LinearGradient2>
      <View style={styles.cardSection}>
        <Category />
      </View>
      <ScrollView style={styles.postS}>
        <PostArray
          // posts={posts}
          // renderPostComponent={renderPostComponent}
          navigation={props.navigation}
        />
 

        <PostArray
          // posts={posts}
          // renderPostComponent={renderPostComponent}
          navigation={props.navigation}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginGradient: {
    // flex: 0.12,
    height:  getResponsiveValue(100,60),
  },

  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getResponsiveValue('6%', '4%'),
  },
  iconStack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: WHITE,
    fontSize: getResponsiveValue(60, 40),
  },
  icon2: {
    position: 'absolute',
    right: 18,
    top: getResponsiveValue(3, 4),

    color: WHITE,
    fontSize: getResponsiveValue(40, 24),
  },
  icon3: {
    color: WHITE,
    fontSize: getResponsiveValue(44, 29),
    // marginLeft: getResponsiveValue('45%', '24%'),
  },
  icon4: {
    color: WHITE,
    fontSize: getResponsiveValue(50, 33),
  },
  createRow: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "center",
    justifyContent: 'space-between',
    width:"100%",
    paddingHorizontal:"2%",
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 8,
    paddingLeft: 10,
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: WHITE,
    borderRadius: getResponsiveValue(25, 22),
    color: WHITE,
  },
  create: {
    marginLeft: getResponsiveValue(8, '7%'),

    color: WHITE,
    fontSize: getResponsiveValue(20, 16),
  },
  button: {
    width: '30%',
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: getResponsiveValue(25, 22),
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardSection: {
    // height: "20%",
    alignItems: 'center',

    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    paddingVertical: '2%',
  },
  postS: {
    flex: 0.8,
  },
});

export default HomePage;
