import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';
import { AdEventType } from 'react-native-google-mobile-ads';
import {RewardedAdEventType,  RewardedAd, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7476617068399590~3695488497';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
const RewardedAds = (props) => {
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

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
            rewarded.show();
          }}>
            <Text>Show RewardedAd Ads</Text>
             
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

export default RewardedAds;
