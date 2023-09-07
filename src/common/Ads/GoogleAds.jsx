import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7476617068399590/2806493368';

const GoogleAds = (props) => {
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        // Start the automatic zoom animation loop
        const zoomLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(scaleValue, {
              toValue: 0.9, // Zoom-in scale
              duration: 1500, // Animation duration
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1, // Original scale
              duration: 1500, // Animation duration
              useNativeDriver: true,
            }),
          ]),
        );

        zoomLoop.start();

    // Clean up the animation loop when the component unmounts
    return () => {
      zoomLoop.stop();
    };
  }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adContainer}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </Animated.View>
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
        marginTop:20,
    },
   
});

export default GoogleAds;
