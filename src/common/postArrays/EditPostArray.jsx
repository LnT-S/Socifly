import React from 'react';
import { View , StyleSheet} from 'react-native';
import ImagePost from '../posts/ImagePost';
import ImagePost2 from '../posts/ImagePost2';
import ImagePost3 from '../posts/ImagePost3';
import ImagePost4 from '../posts/ImagePost4';
import Post2 from '../posts/Post2';
import Post3 from '../posts/Post3';
import Post4 from '../posts/Post4';
import BirthdayPost from '../posts/BirthdayPost';
// import GoogleAds from '../common/GoogleAds';
import stringsoflanguages from '../../utils/ScreenStrings';

const EditPostArray = ({ navigation }) => {
  const name = stringsoflanguages.enterTextHere;
  const userName = "User Name";

  const posts = [
    { id: 1, type: 'ImagePost', source: require('../../assets/pics/iPic1.jpeg') },
    { id: 2, type: 'ImagePost2', source: require('../../assets/pics/iPic5.png') },
    { id: 3, type: 'ImagePost3', source: require('../../assets/pics/iPic4.jpeg') },
    { id: 4, type: 'ImagePost4', source: require('../../assets/pics/iPic3.jpeg') },
    
    // Add more posts as needed
  ];

  

  const renderPostComponent = (post) => {
    switch (post.type) {
      case 'ImagePost':
        return <ImagePost2 name={name}  userName={userName} key={post.id} source={post.source} navigation={navigation} />;
      case 'ImagePost2':
        return <ImagePost name={name} userName={userName} key={post.id} source={post.source} navigation={navigation} />;
      case 'ImagePost3':
        return <ImagePost3 name={name} userName={userName} key={post.id} source={post.source} navigation={navigation} /> ;
      case 'ImagePost4':
        return <ImagePost4 name={name} userName={userName} key={post.id} source={post.source} navigation={navigation} />;
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

export default EditPostArray;