import { StyleSheet, Text, TouchableOpacity, View,Button } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';
import { AdEventType } from 'react-native-google-mobile-ads';
import {RewardedAdEventType,  RewardedAd, TestIds } from 'react-native-google-mobile-ads';
import { useNavigation } from '@react-navigation/native';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7928655726884789/2557055236';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });


  
const RewardedAds = (props) => {
    const [loaded, setLoaded] = useState(false);
    const navigation = useNavigation();

  const pageNotFound = () => {
    navigation.navigate('NotFound');
  };

  useEffect(() => {
    if (props.shouldShowAd) {
      rewarded.show();
    }else {
      // console.log("Rewarded ad is not loaded yet.");
    }
   
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        // console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [props.shouldShowAd]);

  // No advert ready to show yet
  const loadRewarded = () => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        // console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        rewarded.load();
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    }
  };
  useEffect(() => {
    const unsubscribeInterstitialEvents =  loadRewarded();
    return () => {
      unsubscribeInterstitialEvents();
    };
  }, [])
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adContainer}>
          <TouchableOpacity style={styles.nextadd} onPress={() => {
            rewarded.show().catch((error) => {
              console.error('Failed to show rewarded ad:', error);
           
            });
          }}>
          </TouchableOpacity>
          
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // adContainer: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginBottom: 10,
    // },
    // nextadd: {
    //     width:'80%',
    //     height: 50,
    //     borderWidth: 1,
    //     alignSelf:'center',
        
    // }
});

export default RewardedAds;