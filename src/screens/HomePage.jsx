import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient2 from '../atoms/LinearGradient2';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '../common/Category';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BLACK, WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
import PostArray from '../common/postArrays/PostArray';
import stringsoflanguages from '../utils/ScreenStrings';
import GoogleAds from '../common/Ads/GoogleAds';
import RewardedAds from '../common/Ads/RewardedAds';
import InterstitialAds from '../common/Ads/InterstitialAds';
import BannerAds from '../common/Ads/BannerAds';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FETCH } from '../services/fetch';
import { useProfile, useLocal } from '../context/ProfileContext';
import CustomModal from '../atoms/CustomModal';


//import RewardedInterstitialAds from '../common/RewardedInterstitialAds';

const HomePage = props => {
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile();
  const [refresh , setRefresh] = useState(true)
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })
  const [value, SetValue] = useState({
    name: profileState.name || '',
    email: profileState.email || '',
    phone: profileState.phone || null,
  })
  const [avatar, setAvatar] = useState(profileState.avatar || '')
  async function token() {
    let token = await AsyncStorage.getItem('token')
    if (token) {
      console.log('LOG : Token Found')
    } else {
      console.log('LOG : Token not found')
      navigation.navigate('LoginScreen')
    }
  }
  useEffect(() => {
    token().then().catch(err => console.log('EFFECT ERROR', err))
  }, [])

  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [isRewardedAdLoaded, setIsRewardedAdLoaded] = useState(false);
  const bannerData = [1, 2, 3];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNextPage = () => {
    props.navigation.navigate('ProfileScreen');
  };

  useEffect(() => {
    if (shouldShowAd && isRewardedAdLoaded) {
      RewardedAds.show(); // Show the rewarded ad
    }
  }, [shouldShowAd, isRewardedAdLoaded]);

  const showRewardedAd = () => {
    // Logic to set shouldShowAd to true
    setShouldShowAd(true);
  };

  useEffect(() => {
    const nextBannerIndex = (currentBannerIndex + 1) % bannerData.length;
    const scrollTimeout = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextBannerIndex, animated: true });
        setCurrentBannerIndex(nextBannerIndex);
      }
    }, 3000); // Adjust the timeout duration (milliseconds) as needed for automatic scrolling
    return () => clearTimeout(scrollTimeout);
  }, [currentBannerIndex]);

  const handleRewardedAdLoaded = () => {
    setIsRewardedAdLoaded(true);
  };

  const updateContext = () => {
    dispatch({
      type: 'USER_NAME',
      payload: value.name
    })
    dispatch({
      type: 'EMAIL',
      payload: value.email
    })
    dispatch({
      type: 'PHONE',
      payload: value.phone
    })
    dispatch({
      type: 'AVATAR',
      payload: avatar
    })
  }

  async function getImages(){
    let {status , data} = await FETCH(
      'GET',
      '/home/get-images',
      {lang : localState.lang}
    )
    if(status===200){
      localDispatch({
        type : "IMAGES",
        payload : data.data
      })
    } else {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'LoginScreen',
        onClose: () => { setShowModal(false) }
      })
      setShowModal(true)
    }
  }

  async function getCategory() {
    let { data, status } = await FETCH(
      'GET',
      '/home/get-category',
      { lang: localState.lang }
    )
    // console.log(data.data[0])
    if (status === 200) {
      localDispatch({
        type: 'CATEGORY',
        payload: data.data
      })
    } else {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'LoginScreen',
        onClose: () => { setShowModal(false) }
      })
      setShowModal(true)
    }
  }

  async function loadProfileData(){
    try {
      let { data, status } = await FETCH(
        'GET',
        '/profile/get-info',
      )

      if (status === 200) {
        console.log(data)
        SetValue(data.data)
        setAvatar(data.data.image)
        updateContext() 
      } else {
        let a = setModal({
          visible: true,
          message: 'Service Error',
          navigationPage: 'LoginScreen',
        })
        setShowModal(true)
      }
    } catch (error) { 
      console.log('Error loading profile data 0:', error);
    }
  };

  function REFRESH(){
    setRefresh(!refresh)
  }

  useEffect(() => {
    loadProfileData().then().catch(err => console.log('EFFECT ERROR 0', err))
    getCategory().then().catch(err=>console.log('EFFECT ERROR 1',err))
    getImages().then().catch(err=>console.log('EFFECT ERROR 2',err))
  }, [refresh])


  return (
    <SafeAreaView style={styles.container} >
      <LinearGradient2 customStyle={styles.loginGradient}>
        <View style={styles.iconStackRow}>
          <View style={styles.iconStack}>
            <TextInput placeholder="" style={styles.textInput} />
            <FeatherIcon name="search" style={styles.icon2} />
          </View>
          {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
          <Pressable
            style={styles.button}
            onPress={() => {
              showRewardedAd(); // Call showRewardedAd function to set shouldShowAd to true
              setTimeout(() => {
                props.navigation.navigate('CreatePage'); // Navigate to next page after ad is shown
              }, 1000); // Adjust the timeout duration as needed
            }}
          >
            <RewardedAds shouldShowAd={shouldShowAd} onAdLoaded={handleRewardedAdLoaded} />
            <View style={styles.createRow}>
              {/* <Pressable  style={styles.createRow}> */}
              <Text style={styles.create}>{stringsoflanguages.new}</Text>

              <IoniconsIcon
                name="ios-add-circle-outline"
                style={styles.icon3}></IoniconsIcon>
              {/* </Pressable> */}
            </View>
          </Pressable>
          <Pressable onPress={handleNextPage} style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
            styles.iconWrapper,
          ]}>
            <MaterialCommunityIconsIcon
              name="account-settings"
              style={styles.icon4}
            ></MaterialCommunityIconsIcon>
          </Pressable>

        </View>
      </LinearGradient2>
      <View style={styles.cardSection}>
        <Category />
      </View>
      <ScrollView style={styles.postS}  onPress={REFRESH}>
        <FlatList
          ref={flatListRef}
          style={styles.adss}
          horizontal
          pagingEnabled
          data={bannerData}
          renderItem={({ item }) => (
            <BannerAds />
          )}
          keyExtractor={(item) => item.toString()}
        />
        <PostArray
          // posts={posts}
          // renderPostComponent={renderPostComponent}
          navigation={props.navigation}

        />
        <GoogleAds />
      </ScrollView>
      <Text style={{textAlign : 'center'}} onPress={REFRESH}>REFRESH</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginGradient: {
    // flex: 0.12,
    height: getResponsiveValue(100, 60),
  },


  adss: {
    // top:15,
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
    // marginLeft: getResponsiveValue('68%', '18%'),
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
    width: '100%',
    // paddingHorizontal:"2%",
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 8,
    paddingLeft: '10%',
    paddingRight: getResponsiveValue('15%', '20%'),
    // paddingHorizontal:"11%",
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: WHITE,
    borderRadius: getResponsiveValue(25, 22),
    color: WHITE,
  },
  create: {
    marginLeft: getResponsiveValue('7%', '7%'),

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
