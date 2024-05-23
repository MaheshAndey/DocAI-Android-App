import { Text, View, StyleSheet, ActivityIndicator,Alert,LogBox} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Loading=()=>{
    const route = useRoute();
    const text = route.params.text;

    return(
      // <View style={{backgroundColor:'#66000000'}}>

        <View style={styles.load}>
          <View style={{flex:1}}>
                  <View style={{justifyContent:"center",alignItems:'center'}}>
           <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{height:hp('50%'),width:wp('50%')}}/>
           </View>

               </View>
        {/* <Text style={{color:'black'}}>{text}</Text> */}
        </View>
     // </View>
    //  <View>
    //               <Spinner
    //       visible={true}
    //       textContent={text}
    //       textStyle={{color: '#FFF'}}
    //     />
    //             </View>
      )

}
export default Loading;
const styles = StyleSheet.create({
    load:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      backgroundColor:'#66000000'
  
    }
})


