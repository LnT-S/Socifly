import React, { useEffect, useState } from 'react';
import { View , StyleSheet} from 'react-native';
import Post1 from '../posts/Post1';
import Post2 from '../posts/Post2';
import Post3 from '../posts/Post3';
import Post4 from '../posts/Post4';
import BirthdayPost from '../posts/BirthdayPost';
import GoogleAds from '../../common/Ads/GoogleAds';
// import GoogleAds from '../common/GoogleAds';
import stringsoflanguages from '../../utils/ScreenStrings';
import { FETCH } from '../../services/fetch';
import { useProfile, useLocal } from '../../context/ProfileContext';

const PostArray = ({ navigation }) => {
  const {localState, localDispatch} = useLocal()
  const { profileState, dispatch } = useProfile();

  const [posts, setPost] = useState([]);

  useEffect(()=>{
    setPost(localState.images)
  })
  return (
    <View style={styles.postArrayContainer}>
      {posts.map((post , i) => {
        if(i%4===0&&i!==0){
          return (<GoogleAds />)
        }
        return (<Post2 key={post._id} source={profileState.server + post.path} navigation={navigation} id={post._id} />)
      })}
    </View>
  );
};


const styles = StyleSheet.create({
    postArrayContainer: {
      marginVertical: 10, // Adjust this value as needed
    },
  });

export default PostArray;