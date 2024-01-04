import { AdEventType } from 'react-native-google-mobile-ads';
import { RewardedAdEventType, RewardedAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7928655726884789/2557055236';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const showRewardedAds = async (navigateTo) => {
  try {
    // Load rewarded ad
    console.log('***////////////////////')

    let rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    rewardedAd.load();
    console.log('ok')
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, async () => {
      console.log('Ad LOADED')
      await rewardedAd.show()
    });
    rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
      );
    rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
      );
      rewarded.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          console.log('REwarded Ads CLosed')
        }
        );
        rewardedAd.load();
        // Navigate to the target page after ad is closed
      } catch (error) {
    console.error('Error handling download:', error);
  }
};

export default showRewardedAds;