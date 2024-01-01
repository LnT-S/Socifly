import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, { useEffect, useState,  } from 'react';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7476617068399590/2806493368';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7928655726884789/7373186075';

const BannerAds = (props) => {
   
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.adContainer}>
            <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        marginTop : 10,
        borderTopColor : 'red',
        borderBottomColor : 'yellow',
    },
    adContainer: {
    },
   
});

export default BannerAds;
