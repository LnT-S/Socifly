import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';
import { InterstitialAd, AdEventType,TestIds } from 'react-native-google-mobile-ads';
import LinearGradients from '../atoms/LinearGradients';
import LinearGradient2 from '../atoms/LinearGradient2';

const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7476617068399590~3695488497';
const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });
const InterstitialAds = (props) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
        });
    
        // Start loading the interstitial straight away
        interstitial.load();
    
        // Unsubscribe from events on unmount
        return unsubscribe;
      }, []);

      const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(
          AdEventType.LOADED,
          () => {
            setLoaded(true);
          }
        );
    
        const unsubscribeClosed = interstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setLoaded(false);
            interstitial.load();
          }
        );
    
        interstitial.load();

        return () => {
          unsubscribeClosed();
          unsubscribeLoaded();
        }
      }
      useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();
        return () => {
          unsubscribeInterstitialEvents();
        };
      }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adContainer}>
           
          <TouchableOpacity style={styles.nextadd} onPress={() => {
            interstitial.show();
          }}>
            <Text>Free images download...</Text>
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
        height: 40,
        borderWidth: 1,
        alignSelf:'center',
       
    }
});

export default InterstitialAds;
