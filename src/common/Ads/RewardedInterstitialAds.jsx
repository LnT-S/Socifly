import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';
import { RewardedInterstitialAd,RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';



const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-7476617068399590/2806493368';
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

const RewardedInterstitialAds = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.LOADED,
          () => {
            setLoaded(true);
          },
        );
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            // console.log('User earned reward of ', reward);
          },
        );
    
        // Start loading the rewarded interstitial ad straight away
        rewardedInterstitial.load();
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }, []);
    
      // No advert ready to show yet
      if (!loaded) {
        return null;
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adContainer}>
          <TouchableOpacity style={styles.nextadd} onPress={() => {
            rewardedInterstitial.show();
          }}>
            <Text>Show Rewarded Interstitial Ad</Text>
             
          </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    adContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    nextadd: {
        width:'80%',
        height: 50,
        borderWidth: 1,
        alignSelf:'center',
        
    }
});

export default RewardedInterstitialAds;
