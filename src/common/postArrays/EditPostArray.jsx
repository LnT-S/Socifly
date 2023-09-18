import React  , {useState , useEffect} from 'react';
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
import { useProfile , useLocal } from '../../context/ProfileContext';
import { FETCH } from '../../services/fetch';

const EditPostArray = ({ navigation }) => {
  const {localState, localDispatch} = useLocal()
  const { profileState, dispatch } = useProfile();
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })

  const [posts , setPost] = useState([]);


  async function getImageByCategory() {
    let { status, data } = await FETCH(
      'GET',
      '/home/get-images-by-category',
      {
        lang: 'wallpaper',
      }
    )
    if (status === 200) {
      setPost(data.data)
    } else {
      let a = setModal({
        visible: true,
        message: JSON.stringify(data),
        navigationPage: 'LoginScreen',
        onClose: () => { setShowModal(false) }
      })
      setShowModal(true)
    }
  }

  useEffect(()=>{
    getImageByCategory().then().catch(err=>console.log('EFFECT ERROR 4',err))
  },[])

  return (
    <View style={styles.postArrayContainer}>
      {posts.map((post) => {
        return (<ImagePost2 name={profileState.name}  userName={profileState.name} key={post._id} source={profileState.server + post.path} navigation={navigation} id={post._id}/>)
      })}
    </View>
  );
};



const styles = StyleSheet.create({
    postArrayContainer: {
      marginVertical: 10, // Adjust this value as needed
    },
  });

export default EditPostArray;