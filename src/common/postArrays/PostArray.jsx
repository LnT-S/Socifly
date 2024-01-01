import React, { useEffect, useState, lazy, useRef, Suspense } from 'react';
import { View, StyleSheet, ActivityIndicator ,InteractionManager  } from 'react-native';
import Post1 from '../posts/Post1';
import LoadingPostSuspense from '../posts/LoadingPostSuspense';
import Post3 from '../posts/Post3';
import Post4 from '../posts/Post4';
import BirthdayPost from '../posts/BirthdayPost';
import GoogleAds from '../../common/Ads/GoogleAds';
// import GoogleAds from '../common/GoogleAds';
import stringsoflanguages from '../../utils/ScreenStrings';
import { FETCH } from '../../services/fetch';
import { useProfile, useLocal } from '../../context/ProfileContext';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Post2 from '../posts/Post2';
const LazyPost2 = React.lazy(()=>import('../posts/Post2.jsx'))

const PostArray = ({ navigation, arrayLength }) => {
  const [active ,setActive] = useState(false)
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile();
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [startIndex, setStartIndex] = useState(0);

  const [posts, setPost] = useState([]);
  const [data, setData] = useState([]);

  const flatListRef = useRef()

  async function getImages() {
    let { status, data } = await FETCH(
      'GET',
      '/home/get-images',
      { lang: localState.lang }
    )
    console.log('***************************************', data.data[0].category)
    if (status === 200) {
      setPost(data.data)
      setData(data.data.slice(startIndex, startIndex + 10))
      setStartIndex(10)
      localDispatch({
        type: "IMAGES",
        payload: data.data
      })
      return 1
    } else {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'LoginScreen',
        onClose: () => { setShowModal(false) }
      })
      setShowModal(true)
      return 0
    }
  }
  let interactionHandle
  const loadImages = () => {
    console.log('*******')
    interactionHandle = InteractionManager.runAfterInteractions(()=>{
      setPostLoading(true)
      // Simulating loading images from your array of objects
      const newData = posts.slice(startIndex, startIndex + 3);
      // Update state
      setData((prevData) => [...prevData, ...newData]);
      setStartIndex(startIndex + 3);
      setPostLoading(false)
    })
    };

  useEffect(() => {
    let load = async () => {
      console.log('Post Array Updating Posts')
      let a = await getImages().then(a => {
        if (a === 1) {
          // Fetch Logic Here
          flatListRef.current?.forceUpdate();
          setLoading(false)
        } else {
          setRefresh(!refresh)
        }
      }).catch(err => console.log('EFFECT ERROR 2', err))
      console.log('Post Array Updated Posts')
    }
    load()
  }, [localState.lang, localState.category])

  useEffect(() => {
    setPost(localState.images)
    setData(localState.images.slice(0,10))
  }, [localState])

  useEffect(()=>{
    loadImages()
  },[arrayLength])

  useEffect(()=>{
    console.log('UI Settled')
    return ()=>{
      InteractionManager.clearInteractionHandle(interactionHandle);
    }
  },[])

  return (
    <GestureHandlerRootView>
      <View style={styles.postArrayContainer}>
      {loading?<ActivityIndicator /> : ''}
        <FlatList
        ref={flatListRef}
          data={data}
          renderItem={({ item, index }) => <Post2
            key={item._id}
            source={profileState.server + item.path}
            navigation={navigation} id={item._id}
            imageLoaded={setLoading} />}
          keyExtractor={(item, index) => (item._id)}
          onEndReached={loadImages}
          onEndReachedThreshold={0.7}
          onFailed={() => (<View><Text>Failed</Text></View>)}
          onScrollToIndexFailed={(info) => {
            console.warn('onScrollToIndexFailed info:', info);
          }}
          extraData={data}
          ListFooterComponent={<LoadingPostSuspense />}
        />
      </View>
    </GestureHandlerRootView >
  )


  {/*return (
    <View style={styles.postArrayContainer}>
    {loading?<ActivityIndicator /> : ''}
    {postLoading?<ActivityIndicator size={'large'}/> : ''}
      {data.map((post, i) => {
        if (true) {
          if (i % 4 === 0 && i !== 0) {
            return (<GoogleAds key={i}/>)
          }
          else {
            if (post?.category?.type === 'Birthday' || post?.category?.type === 'birthday' || post?.category?.type === stringsoflanguages.birthday) {
              // return (<BirthdayPost key={post._id} source={profileState.server + post.path} navigation={navigation} id={post._id} />)
              return
            } else {
              return (
                (<Suspense fallback={<ActivityIndicator/>} key={post._id}>
                <LazyPost2
                  key={post._id}
                  source={profileState.server + post.path}
                  navigation={navigation} id={post._id}
                  imageLoaded={setLoading} /></Suspense>)
              )
            }
          }

        }
      })}
    </View>
    );*/}
};

const styles = StyleSheet.create({
  postArrayContainer: {
  },
});

export default PostArray;