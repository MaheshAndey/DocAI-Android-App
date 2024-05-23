// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'

// export default function screen_3() {
//   const [count,setcount] = useState([1,2,3,4,5,66])
//   console.log(count)
//   useEffect(()=>{
//     setcount([...count, 223])
//     console.log(count)
//   },[])
//   return (
//     <View>
//       <Text>screen_3</Text>
//     </View>
//   )
// }

import {Image, StyleSheet, View, Alert ,Text,Dimensions,Pressable,  TextInput,ImageBackground,SafeAreaView,StatusBar,TouchableOpacity,ActivityIndicator,BackHandler,TouchableHighlight} from 'react-native'

import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '@react-native-material/core';

export default function screen_3({navigation}) {
  const img='file:///data/user/0/com.docai/cache/RNPM_5727002749263512518.jpg'
  const windowWidth = wp('100%')
  const windowHeight=hp('100%')
  const Imgheight = 2000
  const Imgwidth = 1413 

  
  const v_scale = windowHeight/Imgheight
  const h_scale =windowWidth/Imgwidth

  const x = (v_scale<h_scale)?v_scale:h_scale;

 // console.log(x,v_scale,h_scale)

 const  Svgheight = (Imgheight*x).toString()+"px"
 const  Svgwidth = (Imgwidth*x).toString()+"px"

 const rem_height =windowHeight-(Imgheight*x)
 const imgdown_hight = (rem_height<=((windowHeight/100)*15))?rem_height:((rem_height/100)*75)
 const imgup_hight =rem_height - imgdown_hight

 const keys = [{"Confidence": 65.29732513427734, "Coordinates": {"Height": 0.025751346722245216, "Left": 0.20132899284362793, "Top": 0.21417973935604095, "Width": 0.25706711411476135}, "RecText": "YadaLa Manikanta"}, {"Confidence": 28.99315643310547, "Coordinates": {"Height": 0.017235327512025833, "Left": 0.5623106360435486, "Top": 0.22236573696136475, "Width": 0.35923218727111816}, "RecText": "20PA1A5455"}, {"Confidence": 99.95948028564453, "Coordinates": {"Height": 0.0172363743185997, "Left": 0.2067282497882843, "Top": 0.2787156105041504, "Width": 0.09557594358921051}, "RecText": "JAVA"}, {"Confidence": 99.94908142089844, "Coordinates": {"Height": 0.01205307338386774, "Left": 0.2802159786224365, "Top": 0.5226350426673889, "Width": 0.02421192079782486}, "RecText": "10"}, {"Confidence": 99.92208862304688, "Coordinates": {"Height": 0.013061919249594212, "Left": 0.4058246612548828, "Top": 0.5220877528190613, "Width": 0.02633177489042282}, "RecText": "10"}, {"Confidence": 99.88762664794922, "Coordinates": {"Height": 0.015010952018201351, "Left": 0.757072389125824, "Top": 0.5190933346748352, "Width": 0.03216509893536568}, "RecText": "40"}, {"Confidence": 99.91649627685547, "Coordinates": {"Height": 0.01171197835355997, "Left": 0.27747616171836853, "Top": 0.5467239022254944, "Width": 0.03217442333698273}, "RecText": "20"}, {"Confidence": 99.70321655273438, "Coordinates": {"Height": 0.011470827274024487, "Left": 0.3919389545917511, "Top": 0.543738067150116, "Width": 0.03344130888581276}, "RecText": "20"}, {"Confidence": 99.94268798828125, "Coordinates": {"Height": 0.015351586975157261, "Left": 0.7575241327285767, "Top": 0.5409693717956543, "Width": 0.036864135414361954}, "RecText": "80"}, {"Confidence": 35.39478302001953, "Coordinates": {"Height": 0.007756883278489113, "Left": 0.9264094829559326, "Top": 0.5727539658546448, "Width": 0.005584833212196827}, "RecText": ","}]

  return (
    <View>
      <View style={{height:Imgheight*x,width:Imgwidth*x,backgroundColor:'green'}}>
            <ImageBackground source={{uri:img}} style={{width: '100%', height: '100%',backgroundColor:'black',resizeMode:'contain'}}>
            {
              keys.map((item)=>{
                return(
                     
                     <View //key={item["_id"]}
                     >
                      {/* <Pressable onPress={() =>{
                                        console.log("clicked")
                                        console.log(item['coordinates']['w']*(Imgwidth*x))
                                        
                                        setModalVisible(true);setitemOcr(item);setn_text(item["OCRResp"])
                                      }} key={item["_id"]}> */}

          <View style={styles.box({x:(item['Coordinates']['Left']*(Imgwidth*x)),y:(item['Coordinates']['Top']*(Imgheight*x)),w:item['Coordinates']['Width']*(Imgwidth*x),h:item['Coordinates']['Height']*(Imgheight*x),key:item.RecText,
        
        })} >
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <ScrollView horizontal={true} >
          <Text style={{color:'black',alignSelf:'center',fontSize:10}}>
            {item["RecText"]}
          </Text>
          </ScrollView>
          </View>
                        
                        </View>
                     </View>

                 
            
                )
              })
       }

            </ImageBackground>
          </View>
          <Button onPress={()=>navigation.navigate('screen4')}>huhbf</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  box:({x,y,w,h,key,selectedKey})=>{
    var bordercolor = '#543629'
    var borwidth=0.5
   
    return{
      position:'absolute',
      top:y,
      left:x,
    
      width:w,
      height:h,
      borderWidth:borwidth,
      borderColor:bordercolor,
     
      //zIndex:300,
     // backgroundColor:'white',
    //  borderRadius: 10,
    
      
      


    } 

     
  },
  container: {
    
     justifyContent:'center',
    alignItems:'center',
    
    backgroundColor:'rgba(255, 254, 255, 0)',
    blurRadius:'1',
    height:hp('90%'),
    width:wp('90%'),
    marginBottom:hp('1%')
    

    
  },
  img:{
    //flex:0.9,
   // backgroundColor:'green',
    
  },
  btn:{
    width:wp('100%'),
   alignSelf:'center',
   flexDirection:'row',
  // backgroundColor:'yellow',
  // marginTop:hp('8%'),
   justifyContent:'space-evenly',
   marginBottom:10
  
  },
  centeredView: {
   // flex: 1,
    //justifyContent: "center",
    alignItems: "center",
   // marginTop: 22,
   backgroundColor:'green',
  // height:hp('50%')
    
    
  },
  modalView: {
    // alignItems:'baseline',
    // margin: 20,
    // backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    //color:'#5364b2'
  },
  buttonOpen: {
    backgroundColor: "#7FBCD2",
  },
  buttonClose: {
    backgroundColor: "#7FBCD2",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
   //marginBottom:3 ,
    textAlign: "center",
    color:'black',
    marginTop:20
  },
  textInput: {
    justifyContent: "center",
    alignItems: "stretch",
    height: 40,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    //backgroundColor:'red',
    borderRadius:10

  }
  ,
  load:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    //backgroundColor:'red'

  }
})