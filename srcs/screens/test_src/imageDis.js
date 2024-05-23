import React, { Component } from 'react';
import { Text ,Image} from 'react-native';
import { useRoute } from '@react-navigation/native';


const ImgDis=()=>{
    const route = useRoute();
    const img = route.params.path
  //  const img = 'file:///data/user/0/com.scanapp/cache/ReactNative_cropped_image_4950793500394909912.jpg'

    return(
        <Image source={{uri:img}} style={{width: '100%', height: '100%',backgroundColor:'white',resizeMode:'contain'}}>
            

        </Image>
    )

} 
export default ImgDis;