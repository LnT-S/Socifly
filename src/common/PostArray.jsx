import React from 'react';
import { View , StyleSheet} from 'react-native';
import Post1 from '../common/Post1';
import Post2 from '../common/Post2';
import Post3 from '../common/Post3';
import Post4 from '../common/Post4';
import BirthdayPost from './BirthdayPost';
// import GoogleAds from '../common/GoogleAds';

const PostArray = ({ navigation }) => {
  const posts = [
    { id: 1, type: 'Post1', source: require('../assets/pics/pic1.png') },
    { id: 2, type: 'Post2', source: require('../assets/pics/pic1.png') },
    { id: 3, type: 'Post3', source: require('../assets/pics/pic1.png') },
    { id: 4, type: 'Post4', source: require('../assets/pics/pic1.png') },
    { id: 5, type: 'Post5', source: require('../assets/pics/Birthday.jpg') },
    // Add more posts as needed
  ];

  

  const renderPostComponent = (post) => {
    switch (post.type) {
      case 'Post1':
        return <Post1 key={post.id} source={post.source} navigation={navigation} />;
      case 'Post2':
        return <Post2 key={post.id} source={post.source} navigation={navigation} />;
      case 'Post3':
        return <Post3 key={post.id} source={post.source} navigation={navigation} /> ;
      case 'Post4':
        return <Post4 key={post.id} source={post.source} navigation={navigation} />;
      case 'Post5':
        return <BirthdayPost key={post.id} source={post.source} navigation={navigation} />;
      default:
        return null; 
    }
  };

  return (
    <View style={styles.postArrayContainer}>
      {posts.map((post) => renderPostComponent(post))}
    </View>
  );
};


const styles = StyleSheet.create({
    postArrayContainer: {
      marginVertical: 10, // Adjust this value as needed
    },
  });

export default PostArray;
