import React from 'react';
import { View , StyleSheet} from 'react-native';
import Post1 from '../posts/Post1';
import Post2 from '../posts/Post2';
import Post3 from '../posts/Post3';
import Post4 from '../posts/Post4';
import BirthdayPost from '../posts/BirthdayPost';
// import GoogleAds from '../common/GoogleAds';
import stringsoflanguages from '../../utils/ScreenStrings';

const PostArray = ({ navigation }) => {
  const name =stringsoflanguages.name;
  const userName = "User Name";

  const posts = [
    { id: 1, type: 'Post1', source: require('../../assets/pics/pic1.png') },
    { id: 2, type: 'Post2', source: require('../../assets/pics/pic1.png') },
    { id: 3, type: 'Post3', source: require('../../assets/pics/pic1.png') },
    { id: 4, type: 'Post4', source: require('../../assets/pics/pic1.png') },
    { id: 5, type: 'Post5', source: require('../../assets/pics/Birthday.jpg') },
    // Add more posts as needed
  ];

  

  const renderPostComponent = (post) => {
    switch (post.type) {
      case 'Post1':
        return <Post2 userName={userName} key={post.id} source={post.source} navigation={navigation}    />;
      case 'Post2':
        return <Post1 userName={userName} key={post.id} source={post.source} navigation={navigation}  />;
      case 'Post3':
        return <Post3 userName={userName} key={post.id} source={post.source} navigation={navigation}  /> ;
      case 'Post4':
        return <Post4 userName={userName} key={post.id} source={post.source} navigation={navigation}  />;
      case 'Post5':
        return <BirthdayPost userName={userName} name={name} key={post.id} source={post.source} navigation={navigation} />;
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