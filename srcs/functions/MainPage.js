import React, { useEffect, useState } from "react";
import { View, Text ,StatusBar, Touchable,StyleSheet} from "react-native";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  Stack,
  Button,
  HStack
 
} from "@react-native-material/core";
import * as FileSystem from  'react-native-fs'
import { showMessage, hideMessage } from "react-native-flash-message";


import Icon from "react-native-vector-icons/FontAwesome";
import { logOut } from "../screens/login";
import Menu from "../screens/Menu";
import Dte from "../screens/dtemp";
import { TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import anim from '../animations/text-recognition.json'
import Text_Size from '../screens/Textscaling';

import Lottie from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import { stringify } from "uuid";

const MainPage = (propss) => {
  const [revealed, setRevealed] = useState(false);
  const [openTemplets,setOpenTemplets] = useState(false);
  const [headerText,setheaderTesxt] = useState("")
  const [tep,settep]=useState(true)
  const [continueButton,setcontinueButton] = useState(true)
  

  const Refresh = ()=>{
    if(!continueButton){
      return(
        <TouchableOpacity>
                  <Icon name="refresh" size={23} color='black' style={{marginRight:15,marginTop:2}} onPress={()=>{settep(!tep)}}></Icon>

        </TouchableOpacity>

      )
    }
  }

  const MainComp = ()=>{

    const [continueModal,setcontinueModal]=useState(false)
    const [tData,settdata]=useState([{'templateName':' '}])

    var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

     useEffect(()=>{
      try{
       FileSystem.readFile(path, "ascii").then((bstr1)=>{

        
       
       
  
        const  bstr=JSON.parse(bstr1)
        console.log("()()()()()(()()()()()()()",bstr.tdata)

          if(bstr.save == false){
          //  showMessage({
          //    message: "Your Last scan is not saved",
          //    description: `Do you want to continue or discard all `,
          //    type: "success",
          //    autoHide:false,
          //    backgroundColor: "#020302",
          //    style:{flex:1,marginBottom:30,justifyContent:'center'
          //  ,elevation:10,
          //  shadowColor:'black',},
          //  position:"bottom",
          //  duration:2300
           
          //  });
          settdata(bstr.tdata)
          // console.log(JSON.parse(JSON.stringify(tData)))
          // console.log(tData[0])
            
          setcontinueModal(true)
   
          }
          else{
           console.log("last scan saved")
          }
        })
        
       }
       
       catch(err){

        console.log('user is using for first time',err)
       }
     },['jj'])
 
 // console.log("((((((((((((())))))))))))))))))))))",tData)
    

   

    if(!openTemplets){


      return(
        <View style={{flex:1,alignItems:'center',marginTop:10,}}>
          <Modal isVisible={ continueModal }
                                      
                                      transparent={true}
                                     // onTouchCancel={true}
                                      animationIn='zoomIn'
                                      animationOut='zoomOut'
                                     // backdropColor='#646464'

                                     //onBackButtonPress={()=>setbackbuttonPopup(false)}
                                      
                                     onRequestClose={() => {
                                       // // Alert.alert("Modal has been closed.");
                                       //  setModalVisible(!isModalVisible);
                                       // setexcelModalVisible(false);setseleted(2);
                                       // setuploadingdrive(false)
                                      setcontinueModal(false)
                                      }}

                                      onTouchCancel={true}
                                      
                                  >
                                   <View style={{flexDirection:"row",justifyContent:"center",}}>
                                     
                                     <View style={{ backgroundColor:'#ebebeb' , height:hp('30%'),width:wp('90%'),padding:20,justifyContent:'center',justifyContent:'space-evenly',borderRadius:10,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                                    
                             <Text style={{fontWeight:'bold',color:'red',marginLeft:0,textAlign:'left'}} >Your Last scan is not saved</Text>
                             <Text style={{fontWeight:'bold',color:'black',marginTop:10,textAlign:'left'}} >Template Name : {tData[0].templateName} </Text>
                             <Text style={{fontWeight:'bold',color:'black',marginTop:10,textAlign:'left'}} >Do you want to continue or discard all</Text>


                                      <View style={{flexDirection:"row",justifyContent:'space-evenly',marginTop:25}}>
                                      <Button title="Discard" onPress={()=>{
                                        var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;
                                        FileSystem.writeFile(path, JSON.stringify({"scandata":[]}), 'utf8')
                                        .then((success) => {
                                          console.log('empty json file created');
                                          setcontinueModal(false)
                                          // setModalVisible(false);
                                          // propss.props.navigate('Camera',{tempName:item["NameofTemplate"],img_temp:item["imguri64"],filename:fname,keydata:jres.det,scan:1})
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                        
                                      }} 
                                      color='#ebebeb'/>
                                      <Button title=" continue" onPress={()=>{setcontinueModal(false)
                                  propss.props.navigate('Camera',{tempName:tData[0].templateName,img_temp:'',filename:'kj',keydata:tData,backButton:false})
  
                                      
                                    }} 
                                      color='#ebebeb' />
                                      </View>
                           </View>
                               

                               
                                   </View>
                               
                             </Modal>
           {/* <Svgimg1 height={hp('75%')} width={wp('98%')} />
                              */}
                               <View style={styles.part_2}>
                  <Animatable.Text animation="lightSpeedIn" easing="ease-out" iterationCount={1} style={styles.part_2_1}>Extract the Text </Animatable.Text>
                  <Animatable.Text animation="lightSpeedIn" easing="ease-out" iterationCount={1} style={styles.part_2_2}>With DocAi!..</Animatable.Text>

               </View>
           <View style={{flex:0.2,justifyContent:"center"}}>
           {/* <Lottie source={animText} autoPlay loop={false} resizeMode="contain" style={{height:hp('50%'),width:wp('50%')}}/> */}
           </View>
           <View style={{flex:0.7,justifyContent:"center"}}>
           <Lottie source={anim} autoPlay loop={false}  resizeMode="contain" style={{height:hp('50%'),width:wp('50%')}}/>
           </View>

        <View style={{flex:0.3,marginTop:50}}>
        <Button  title="Choose templates" onPress={()=>{setOpenTemplets(true);setheaderTesxt('Predefined Templates for you!..'),setcontinueButton(false)}} color={'#7FBCD2'} />

        </View>
        </View>
      )
    }
    else{

      

        return(
          <Dte props={propss.props}></Dte>
        )
     
    }

  }
  return (
    
    <Backdrop
    
    
      revealed={revealed}
      style={{backgroundColor:"white"}}
      header={
        <AppBar
          //title="DocAi"
          
          transparent
          leading={props => (

            <View>
              <StatusBar
            translucent={false} 
            backgroundColor={'white'} 
            barStyle='dark-content'
            hidden={false} />

            
            {/* <IconButton
              icon={props => (
                
                <Icon name={revealed ? "close" : "menu"} {...props} />
              )}
              onPress={() => setRevealed(prevState => !prevState)}
              {...props}
            /> */}

            <Text style={{color:"black",marginLeft:20,fontWeight:'bold',fontSize:25,fontFamily:'sans-serif-medium'}}>DocAi</Text>
            </View>
            
            
          )}
          

          
          trailing={props => (
            <HStack>
              <StatusBar
            translucent={false} 
            backgroundColor={'white'} 
            barStyle='dark-content'
            hidden={false} />
           <View style={{flexDirection:'row'}}>
            
              <Refresh></Refresh>

              <View style={{marginRight:15,marginBottom:30}}>

                
              <Menu navigation={propss.props}></Menu>
                </View>  
            </View>           
            </HStack>
          )}

          

          
        />
        
        
               
      }
      backLayer={<View style={{ height: 50 ,backgroundColor:'white'}}>

        

        <View style={{flex:1,alignItems:'center',marginTop:4}}>
        <Button  title="logout" onPress={()=>logOut()} />
        </View>


      </View>}
    >
      {/* <BackdropSubheader title={"Get started by selecting a template"} /> */}
      
      <MainComp></MainComp>
     

      
    </Backdrop>
  );
};

export default MainPage;

const styles = StyleSheet.create({
      
   part_2: {
     /// flex: 0.1,
     //backgroundColor: "yellow"
     marginTop:50

   },

               part_2_1: {
                 // flex: 0.5,
                 // backgroundColor:"red",
                  //fontFamily: 'Merriweather',
                 // marginTop:hp("2%"),
                  fontSize: Text_Size.Text_size_Type_2,
                  marginLeft: 0,
                  fontWeight: '700',
                  color: 'black'

               },
               
               part_2_2: {
                  //flex: 0.5,
                  alignContent:'center',
                 // fontFamily: 'Merriweather',
                  fontSize: Text_Size.Text_size_Type_2,
                 
                  marginLeft: wp('35%'),
                  fontWeight: 'bold',
                  color: 'black',
                  textShadowColor: 'black'
               },
})