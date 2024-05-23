import React, { Component ,useEffect,useState} from 'react'
import { StyleSheet, View, Alert ,Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logOut} from './login'
import { showMessage, hideMessage } from "react-native-flash-message";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Provider,
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  TextInput, } from '@react-native-material/core';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import CustomButton from '../CustomButton';

import AccountIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MailIcon from "react-native-vector-icons/Zocial";
import ReportIcon from "react-native-vector-icons/MaterialIcons";




 const UserInfo = ({navigation})=>{
    const [loading,setLoading] = useState(true);
    const [info,setinfo] = useState(null)
    const [visible, setVisible] = useState(false);
    const [text,settext]=useState('')
   
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
          <>
          

            <View style={styles.containerUserInfo}>
                 <View style={styles.imgBox}>
                 <Image source={{uri:info.user.photo}} style={styles.img}>
                  </Image>

                 </View>
               <View style={styles.txtBox}>
               <View style={{flexDirection:'row',marginLeft:10,}}>
               <AccountIcon name="account" size={30} color='black' style={{marginRight:15,marginTop:30}} onPress={()=>{settep(!tep)}}></AccountIcon>
               <View style={{borderBottomWidth:1,borderColor:'#c4c3c0',marginTop:20,width:wp('90%'),paddingBottom:20,}}>
               <Text style={{color:'black'}}>Name:</Text>
               <Text style={{color:'black',fontSize:17}}>
                {info.user.name}
               
                 </Text>
               </View >

               </View>
               
                 
               </View>
               
               <View style={styles.txtBox1}>
               <View style={{flexDirection:'row',marginLeft:10,marginTop:-50,}}>
               <MailIcon name="email" size={28} color='black' style={{marginRight:15,marginTop:23}} onPress={()=>{settep(!tep)}}></MailIcon>
               <View>
               <View style={{borderBottomWidth:1,borderColor:'#c4c3c0',marginTop:12,width:wp('90%'),paddingBottom:20,}}>

               <Text style={{color:'black'}}>Email:</Text>
               <Text style={{color:'black',fontSize:17}}>
                {info.user.email}
                 </Text>
               </View >

               </View>

               </View>
               <TouchableOpacity onPress={() => setVisible(true)}>
               <View style={{flexDirection:'row',marginLeft:10,marginTop:0,}}>
               <ReportIcon name="report" size={28} color='black' style={{marginRight:15,marginTop:18}} onPress={()=>{settep(!tep)}}></ReportIcon>
               <View>
               <View style={{borderBottomWidth:1,borderColor:'#c4c3c0',marginTop:20,width:wp('90%'),paddingBottom:20,}}>

               <Text style={{color:'black'}}>Report an issue</Text>
              
               </View >

               </View>

               </View>
               </TouchableOpacity>
              
               </View>
               
               
               <View style={styles.logoutbox}>
                <Button title='Logout'  onPress={()=>logOut(navigation)} color={'#7FBCD2'}>

                </Button>
               </View>
               
      
            </View>
            <Provider >
            <Dialog visible={visible} onDismiss={() => setVisible(false)} >
        <DialogHeader title="Please write the issue you have noticed " />
        <DialogContent>
          <Stack spacing={2}>
            
            <TextInput placeholder='Write here..' variant="outlined" multiline style={{maxHeight: hp('40%')}} onChangeText={(tex)=>{settext(tex)}} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            titleStyle={{color:'black'}}
            onPress={() => setVisible(false)}
          />
          <Button
            title="Ok"
            compact
            variant="text"
            titleStyle={{color:'black'}}
            
            
            onPress={() => {
              console.log(text)

              if(text.length<2){
                showMessage({
                  message: "Please write your issue clearly",
                  description: ``,
                  type: "success",
                 // autoHide:false,
                  backgroundColor: "black",
                  style:{flex:1,marginBottom:30,justifyContent:'center'
                ,elevation:10,
                shadowColor:'black',color:'black'},
                position:"bottom",
                duration:2000,
                
                
                });

              }
              else{
                fetch("http://backend.docscanner.teambros.co.in/api/v1/reportuser", {

   

                  // Adding method type
                  method: "POST",
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  },
                   
                  // Adding body or contents to sendd
                  body: JSON.stringify({
                            usermail: `${info.user.email}`,
                            issue : text
                          }),
                   
                 
              })
               
              // Converting to JSON
              .then(response => {
                console.log(response)
                
                setVisible(false);
                settext('')
                showMessage({
                  message: "Your issue was taken successfully   ",
                  description: `We will solve your issue as soon as possible and we will contact you through email if needed`,
                  type: "success",
                 // autoHide:false,
                  backgroundColor: "black",
                  style:{flex:1,marginBottom:30,justifyContent:'center'
                ,elevation:10,
                shadowColor:'black',color:'black'},
                position:"bottom",
                duration:8000,
                
                
                });
              
              
              })
                    
              }

             
            
            }
            
            
            }
          />
        </DialogActions>
      </Dialog>
    
            </Provider>
            
            </>
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
  export default UserInfo;

  const styles = StyleSheet.create({

    container:{
        
        height:hp('10%'),
        width:wp('100%'),
        backgroundColor:'#5367b2',
        flexDirection:'row',
        alignSelf:'center'
        
        
        
        
    },
    imgBox:{
        flex:0.2  ,
       // backgroundColor:'green',
        alignSelf:'center',
        marginTop:10,
       

    },
    img:{
        width: 150,
          height: 150,
          borderRadius: 100,
          overflow: 'hidden',
          borderWidth: 3,
         elevation: 1,
        //backgroundColor: "gray"
          
         // borderColor: 'red',
    },
    txtBox:{
        flex:0.3,
        width:wp('100%'),
       // backgroundColor:'red',
       // alignSelf:'center',
        justifyContent:'center',
        marginLeft:10


    },
    txtBox1:{
      flex:0.3,
      width:wp('100%'),
     // backgroundColor:'red',
     // alignSelf:'center',
      justifyContent:'flex-start',
      marginLeft:10


  },
    containerUserInfo:{
        
       
        //backgroundColor:'black',
        
        alignSelf:'center'
        
        
        
        
    },
    logoutbox:{
      flex:0.2,
      alignContent:'center',
      alignSelf:'center'

    }

  })