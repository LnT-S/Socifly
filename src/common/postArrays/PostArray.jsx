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
import { useProfile } from '../../context/ProfileContext';

const PostArray = ({ navigation }) => {
  const { profileState, dispatch } = useProfile();
  const name =stringsoflanguages.name;
  const userName = "User Name";

  const [posts, setPost] = useState([
    // Add more posts as needed
  ]);

  let getImages = async()=>{
    let {status , data} = await FETCH(
      'GET',
      '/home/get-images',
      ''
    )
    if(status===200){
      setPost(data.data)
    }
  }

  useEffect(()=>{
    setPost([])
    getImages().then().catch(err=>console.log('EFFECT ERROR',err))
  },[])
  return (
    <View style={styles.postArrayContainer}>
      {posts.map((post , i) => {
        if(i%4===0&&i!==0){
          return (<GoogleAds />)
        }
        return (<Post2 userName={profileState.name} key={post._id} source={profileState.server + post.path} navigation={navigation}  />)
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