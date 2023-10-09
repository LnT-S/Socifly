import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile();

  const [posts, setPost] = useState([]);

  async function getImages() {
    let { status, data } = await FETCH(
      'GET',
      '/home/get-images',
      { lang: localState.lang }
    )
    if (status === 200) {
      setPost(data.data)
      localDispatch({
        type: "IMAGES",
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

  useEffect(() => {
    let load = async () => {
      console.log('Post Array Updating Posts')
      await getImages().then().catch(err => console.log('EFFECT ERROR 2', err))
      console.log('Post Array Updated Posts')
    }
    load()
  }, [])
  return (
    <View style={styles.postArrayContainer}>
      {posts.map((post, i) => {
        if (i % 4 === 0 && i !== 0) {
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