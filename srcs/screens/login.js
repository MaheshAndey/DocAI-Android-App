import React, { Component, useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity ,StatusBar,SafeAreaView, Button,ActivityIndicator} from 'react-native';
import Text_Size from './Textscaling';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svgimg1 from '../imgs/logo.svg/';
import splash_screen from '../imgs/splash_screen.png'
import MainPage from '../functions/MainPage';
import Modal from "react-native-modal";
import * as Animatable from 'react-native-animatable';

import auth from '@react-native-firebase/auth';
import {
   GoogleSignin,
   GoogleSigninButton,
   statusCodes,
 } from '@react-native-google-signin/google-signin';


import { showMessage, hideMessage } from "react-native-flash-message";
import animLoading from '../animations/loading.json'
import Lottie from 'lottie-react-native';





async function onGoogleButtonPress(fun) {
   try{
     // Get the users ID token
     const { idToken } = await GoogleSignin.signIn();
  
     // Create a Google credential with the token
     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      console.log('_-_') 
      fun()
      
            
     // Sign-in the user with the credential
     return auth().signInWithCredential(googleCredential);
   }
   catch(err){
    console.log(err,"*-*")
    showMessage({
     // message: err.toString(),
      message: "001 Some thing went wrong ",
      description: `please connect to internet.`,
      type: 'danger',
      hideStatusBar:true,
      duration:2200
    });
  
   }
  }
   

 const Login = ({ navigation }) => {

  
   useEffect(()=>{
      GoogleSignin.configure({
      //   scopes: ['https://www.googleapis.com/auth/drive',
      //           'https://www.googleapis.com/auth/drive.file',
      //           'https://www.googleapis.com/auth/drive.readonly.metadata',

            
      //       ],

                // We want   read and write access
        webClientId: "356861984876-19gl797bcp520hljb119g54pu405d0i7.apps.googleusercontent.com", // REPLACE WITH YOUR ACTUAL  CLIENT ID !
        offlineAccess: true
        });
          },[])
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoadingModalVisible] = useState(false);
    const [statusBarBgcolor,setstatusbgcolor] = useState(false)

    const [user, setUser] = useState(null); 
    
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    const initializingFun=()=>{
      setLoadingModalVisible(true)
      setstatusbgcolor(true);console.log(statusBarBgcolor)
    }
  
    if (initializing){
       return(
   
        <View style={styles.load}>
         
         <Image source={splash_screen} style={{height:hp('100%'),width:wp('100%')}}></Image>
        
        </View>
   
   
   
   
      );
   }
      
    if(!user){
      return (
         <View style={{flex:1}}>
      
         <StatusBar
            translucent={true} 
            backgroundColor={'transparent'} 
            barStyle='dark-content'
            hidden={statusBarBgcolor} />
          
          <SafeAreaView style={[styles.container]}> 
   
          <View style={styles.part_0}>
            
          <Modal isVisible={loading}
                                      //  deviceWidth={wp("0%")}
                                      //  deviceHeight={hp("0%")}
                                       transparent={true}
                                      // onTouchCancel={true}
                                      animationIn='zoomIn'
                                      animationOut='zoomOut'
                                      useNativeDriver={true} 
                                      // backdropColor='#646464'
                                     // coverScreen={false}
                                       
                                      onRequestClose={() => {
                                        setLoadingModalVisible(false)
                                       
                                       }}
                                       
                                   >
                                   <View style={{flex:1}}>
                                  
                                   <SafeAreaView >
                                    <View style={{justifyContent:"center",backgroundColor:'rgba(255, 254, 255, 0)',alignContent:'center'}}>
                             
                                    
                             <View style={{ backgroundColor:'rgba(255, 254, 255, 0)' , height:hp('100%'),width:wp('100%'),justifyContent:"center",alignContent:'center'}} >
                             <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{height:hp('15%'),width:wp('15%'),marginTop:20,marginLeft:50}}/>

                           
                             </View>
                         
                             </View>
                                    </SafeAreaView>
                                   </View>
                                
                              </Modal>
                               <View style={styles.part_0_1}>
                                 
                                 
                                     <View style={styles.circle}>
                                       

                                     </View>
                                     
                                     
                                </View>
                         </View>
               <View style={styles.part_2}>
                  <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.part_2_1}>A New Method for</Animatable.Text>
                  <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.part_2_2}>DataAutomation!..</Animatable.Text>

                  
   
               </View>
               <View style={styles.part_1}>
                  <View style={styles.part_1_1}>
                    
                 <Svgimg1 height={hp('75%')} width={wp('98%')} />                   
                  </View>
               </View>
               <View style={styles.part_4}>
                  <View style={{flexDirection:'row',}}>
                  {/* <Logo height={hp('5%')} width={wp('8%')} />  */}

               <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{color:"black",marginLeft:0,fontWeight:'bold',fontSize:25,fontFamily:'sans-serif-medium',marginTop:18}}>DocAi</Animatable.Text>
                  </View>

                  <View style={styles.part_4_2}>
                     {/* <TouchableOpacity style={styles.touch}
                        onPress={() => navigation.navigate('DefaultTemplates')}>
                        <Text style={styles.testt}> Sign In with Google</Text>
                     </TouchableOpacity> */}
                     <GoogleSigninButton
                         // style={{ backgroundColor:'#7FBCD2' }}
                           size={GoogleSigninButton.Size.Wide}
                           color={GoogleSigninButton.Color.Light}
                           onPress={() => onGoogleButtonPress(initializingFun).then(() =>{ setLoadingModalVisible(false);StatusBar.setHidden(false); ;console.log('Signed in with Google!');
                        
                        
                        })}
                           
                        />
                  </View>
               </View>
               </SafeAreaView>
            
            </View>
      );
    }
    else{
    //  navigation.navigate('DefaultTemplates')
    console.log("*  *")

    return(

      // <Dte props={navigation}></Dte>

      <MainPage props={navigation}></MainPage>
    )
      

    }
};

export default Login



// const createFolder = async()=>{
     
//    const gdrive = new GDrive();
//    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken
   
        
//    //console.log(await gdrive.files.list());
 
//    const id = (await gdrive.files.newMultipartUploader()
//       .setData("fk mfjtngjg mt5t5", MimeTypes.TEXT)
//      .setRequestBody({
//        name: "temdfn.txt"
//      })
//      .execute()
//    ).id;
//    console.log(id)
 
 
 
//  }
//  export {createFolder}

 const logOut= async(navigation)=>{

   //fire base logout
    await auth()
   .signOut()
   .then(() =>{ console.log('User signed out!');})
   .catch(() => console.log(' signed out fail'));
 
 
   //google logout
   try {
     await GoogleSignin.signOut();
     navigation.navigate('login');
     //setUser({ user: null }); // Remember to remove the user from your app's state as well
   } catch (error) {
     console.error(error);
   }
 
 
 }
 export {logOut}

 
const styles = StyleSheet.create({
   load:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row'
  
    },
   part_0:{
      flex:0.2,
     // backgroundColor:"yellow"
  },
  part_0_1:{
    flex:1,
    //backgroundColor:"green"
  },
  circle:{
     flex:0.9,
     width: wp("64%"),
     height: hp("30%"),
     marginTop:hp("-20%"),
     marginLeft:wp("-20%"),
     borderRadius:  wp("150/2%"),
     backgroundColor:'#7FBCD2',
  },
   part_1: {
      flex: 0.45,
      // backgroundColor: "green",
       alignSelf:"center"

   },
     part_1_1:{
      flex:0.5,
      marginTop:hp('-18%')
     },      
   part_2: {
      flex: 0.1,
     //backgroundColor: "yellow"

   },

               part_2_1: {
                  flex: 0.5,
                 // backgroundColor:"red",
                  //fontFamily: 'Merriweather',
                 // marginTop:hp("2%"),
                  fontSize: Text_Size.Text_size_Type_2,
                  marginLeft: wp('4%'),
                  fontWeight: '700',
                  color: 'black'

               },
               part_2_2: {
                  flex: 0.5,
                  alignContent:'center',
                 // fontFamily: 'Merriweather',
                  fontSize: Text_Size.Text_size_Type_2,
                 
                  marginLeft: wp('30%'),
                  fontWeight: 'bold',
                  color: 'black',
                  textShadowColor: 'black'
               },
   part_4: {
      flex: 0.35,
      alignItems: 'center',
    //  backgroundColor: "red",

   },
               part_4_1: {
                  flex: 0.4,
                  alignItems: 'center',
                  flexDirection:'row'

               },
                   
                     part_4_1_1: {
                        flex: 0.6,
                        alignItems:'flex-end',

                       // marginTop: 40,
                       // marginLeft: -30,
                        color: 'gray',
                        fontSize: Text_Size.Text_size_Type_0,
                       fontWeight: 'bold'

                     },
                     part_4_1_2: {
                        flex: 0.4,
                        alignItems:'flex-start',
                        
                        marginLeft: wp('2%'),
                        
                         marginTop: hp('0.5%'),
                        // marginRight: -95
      
                     },
                     account:{
                        width: wp('3.3%'),
                        height: hp('3.2%'),

                     },
                  
               part_4_2: {
                  flex: 0.85,
                  alignItems: 'center',
                //  backgroundColor:"green",
                  marginTop:hp("2%")

           },
           touch:{
                  width: wp('60%'),
                  height: hp('8%'), 
                 justifyContent: "center", 
                  alignItems: "center", 
                  borderRadius: wp('5%'), 
                  backgroundColor: "#6C63FF", 
                  marginTop: hp('-1%')
               },

            testt:{ 
               fontFamily: 'sans-serif',
               color: "white", 
                    fontWeight: "bold", 
                    fontSize: Text_Size.Text_size_Type_9,
         },
   container: {
      flex: 1,
      backgroundColor:"white"
      // marginTop: 100,
      // padding: 20
   },
});