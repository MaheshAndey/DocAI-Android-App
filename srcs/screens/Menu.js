import React, { Component ,useEffect,useState} from 'react'
import { StyleSheet, View, Alert ,Button,Text,Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Stack, Avatar } from "@react-native-material/core";

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
const Menu1 =()=>{
//     const [isSignedIn,setisSignedIn] = setState(async () => {
//         await GoogleSignin.isSignedIn();
//  })
    const isSignedIn = async () => {
            await GoogleSignin.isSignedIn();
     };
     console.log(isSignedIn)
if(isSignedIn){
    return(
        <SafeAreaView>
         <View>
          <Text>Welcome </Text>
             
              
        </View>
        </SafeAreaView>
     )
}
else{
    return(
        <View>

        <Text style={{color:'black'}}>
            Please login..
        </Text>
        </View>
    )
}
    

      
     
    
    

 
   
  }
  

  const Menu = ({navigation})=>{
    const [loading,setLoading] = useState(true);
    const [info,setinfo] = useState(null)
   
    async function   getCurrentUser() {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser.user.photo)
        setinfo(currentUser);
        setLoading(false);
      };

    useEffect(()=>{
        getCurrentUser()
    },[])


   
      
     if(!loading){
        return(

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.imgBox}>
                 {/* <Image source={{uri:info.user.photo}} style={styles.img}>
                   </Image> */}
                   <Avatar image={{ uri: info.user.photo }} size={30}
                   
                  
                   
                   />

                  </View>
             
           </TouchableOpacity>

          //  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          //    <View style={styles.container}>
          //        <View style={styles.imgBox}>
          //        <Image source={{uri:info.user.photo}} style={styles.img}>
          //         </Image>

          //        </View>
          //      <View style={styles.txtBox}>
          //      <Text style={{color:'white',fontSize:17}}>
          //       {info.user.name}
          //        </Text>
          //        <Text style={{color:'white',fontSize:17}}>
          //       {info.user.email}
          //        </Text>
          //      </View>
          //   </View>
          //  </TouchableOpacity>
        )
     }
     else{
        return(
            <Text style={{color:'black'}}>
                Loading..
            </Text>
        )
     }
      
   
  }
  export default Menu;

  
  const styles = StyleSheet.create({

    container:{
      
        
        height:hp('10%'),
        width:wp('100%'),
        backgroundColor:'#5367b2',
        flexDirection:'row',
        alignSelf:'center'
        
        
        
        
    },
    imgBox:{
        flex:0.3,
      //  backgroundColor:'green',
        alignSelf:'center'

    },
    img:{
        width: 60,
          height: 60,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 3,
          marginLeft:17
         // borderColor: 'red',
    },
    txtBox:{
        flex:0.7,
      //  backgroundColor:'red',
        alignSelf:'center'

    },
    containerUserInfo:{
        
       
        backgroundColor:'#5367b2',
        
        alignSelf:'center'
        
        
        
        
    }

  })