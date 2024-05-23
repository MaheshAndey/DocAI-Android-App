/*import React, { Component,Image,View ,Text} from 'react'
import styles from './Styles' */

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as FileSystem from  'react-native-fs'
import { Pressable } from "@react-native-material/core";
import React, { Component ,useEffect,useState} from 'react'
import {Image, StyleSheet, View, Alert ,Text,Dimensions,  TextInput,ImageBackground,SafeAreaView,StatusBar,TouchableOpacity,ActivityIndicator,BackHandler,TouchableHighlight} from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import animLoading from './animations/ocr_loading.json'
import Lottie from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;


import {LogBox} from "react-native";
import { useRoute } from '@react-navigation/native';


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Edit from "react-native-vector-icons/FontAwesome5"; //edit
import Plus from "react-native-vector-icons/AntDesign"; //sca another -- pluscircle

import Rescan from "react-native-vector-icons/Feather"; //rescan --refresh-ccw
import Save from "react-native-vector-icons/MaterialCommunityIcons"; //Save--microsoft-excel



import  Iconx from 'react-native-vector-icons/Feather'
LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])


import { CreateEmptyExcel } from './functions/writeExcel';

import {

  Button,
  Avatar
  
 
} from "@react-native-material/core";
import { ScrollView } from 'react-native-gesture-handler';


export default  function ImageDisplay({navigation}){
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading,setloading] = useState(false)
  
  const [Imgwidth,setImgwidth] = useState(route.params.imgsize.w)
  const [Imgheight,setImgheight] = useState(route.params.imgsize.h)
  const [totalData,setTotaldata]= useState(route.params.tdata)
  // console.log("xldata : ",route.params.xldata)

 
  const [finishClicked,setfinishClicked] = useState(false)
  const [backButtonPopup,setbackbuttonPopup]=useState(false)
  const [stackLength,setstacklength]=useState(0)


  //  BackHandler
  function handleBackButtonClick() {
    //console.log(isloading)
    if(isloading){
      console.log("back__pressed.loading")


     
      return true;
    }
    else{
      setbackbuttonPopup(true)
       //navigation.goBack();
       console.log("back__pressed.not loading")

       return true;
    }
  
  }
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [route.params.path]);

  useEffect(async() => {
    var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

          let bstr =await FileSystem.readFile(path, "ascii");
          bstr=JSON.parse(bstr)
          setstacklength(bstr.scandata.length)
  }, [route.params.path]);


  

  const BackModel = ()=>{
    return(
      <Modal isVisible={backButtonPopup}
                                      
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
                                        setbackbuttonPopup(false)
                                       }}

                                       onTouchCancel={true}
                                       
                                   >
                                    <View style={{flexDirection:"row",justifyContent:"center",}}>
                                      
                                      <View style={{ backgroundColor:'#ebebeb' , height:hp('20%'),width:wp('80%'),justifyContent:'center',justifyContent:'space-evenly',borderRadius:20,borderTopLeftRadius:20,borderTopRightRadius:20}}>
  
                              <Text style={{fontWeight:'bold',color:'black',marginLeft:50}} >Are you sure you want to Discard all Scans</Text>
                                       <View style={{flexDirection:"row",justifyContent:'space-evenly',marginTop:25}}>
                                       <Button title=" Cancel" onPress={()=>{setbackbuttonPopup(false)}} color='#ebebeb' />
                                       <Button title="Discard" onPress={()=>{navigation.navigate('login');
                                        var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;
                                        FileSystem.writeFile(path, JSON.stringify({"scandata":[]}), 'utf8')
                                        .then((success) => {
                                          console.log('empty json file created');
                                         
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                      
                                      
                                      }} color='#ebebeb'/>
                                       </View>
                            </View>
                                

                                
                                    </View>
                                
                              </Modal>
    )
  }

// file name popup
      const [isexcelModalVisible, setexcelModalVisible] = useState(false);
      const [selected,setseleted] = useState(2)
      const [uploadingdrive,setuploadingdrive] = useState(false); 
      const [noteFilename,setnoteFile]=useState("")
      var fname=''
     


      const Note = ()=>{
        if(selected==0){
          return(
            <View style={{ backgroundColor:'#ebebeb' , height:hp('6%'),width:wp('80%'),justifyContent:'center',justifyContent:'space-evenly'}}>
            {/* <IconNote name="md-alert-circle-outline" size={20} color='black' style={{marginRight:0}}></IconNote> */}
  
              <Text style={{fontWeight:'bold',color:'black',marginLeft:10}} >Please select where to save  the scaned data</Text>
            </View>
          )
        }
       }
      
           


  
 // let  totalData = route.params.tdata;
  const img = route.params.path
  console.log('img ',img)
  const excelfilename = route.params.Excelfilename
  const tempImg = route.params.tempImg
  //const opimg = route.params.opImg

  
  //const xldata = []
  

  useEffect(()=>{

   // setloading(true);
    setfinishClicked(false)

  


  },[route.params.path])
   
   

   

  
  

      const v_scale = windowHeight/Imgheight
      const h_scale =windowWidth/Imgwidth


      const x = (v_scale<h_scale)?v_scale:h_scale;

      // console.log(x,v_scale,h_scale)
      // console.log(windowHeight,windowWidth)


     const  Svgheight = (Imgheight*x).toString()+"px"
     const  Svgwidth = (Imgwidth*x).toString()+"px"

     const rem_height =windowHeight-(Imgheight*x)
     const imgdown_hight = (rem_height<=((windowHeight/100)*15))?rem_height:((rem_height/100)*75)
     const imgup_hight =rem_height - imgdown_hight
    //   console.log('height:',Imgheight*x,"width:",Imgwidth*x)
    //   console.log('height:',Imgheight,"width:",Imgwidth*x)

    //  console.log("up  dow : ",imgup_hight,imgdown_hight)



  
    if(isloading){

      return(
        <>
          <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='dark-content'
        hidden={false} />
        <View style={styles.load}>
          <View style={{flex:1}}>
                  <View style={{justifyContent:"center",alignItems:'center',marginLeft:100}}>
           <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{height:hp('50%'),width:wp('100%')}}/>
           </View>
           </View>
        
        {/* <Text style={{color:'black'}}> Getting ready ..</Text> */}
        </View>
        </>

    )
    }

    else{


    return(
      
       

      
      

      <View style={styles.container}>
         <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='dark-content'
        hidden={false} />
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{blurRadius:1}}
         backgroundColor='#212c3b'
        backdropOpacity={0.8}
        deviceWidth={wp('100%')}
       deviceHeight={hp('100%')}
        
        
        
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <View style={{backgroundColor:'white',width:wp('90%'), height:hp('97%'),alignItems:'center',}}>

          <ScrollView>
            {
              route.params.tdata.map((itemOcr)=>{
                return(

                <View style={{backgroundColor:'white',width:wp('100%'),height:hp('45%'),alignItems:'center',justifyContent:'space-evenly',borderBottomWidth:2,borderColor:'#c4c3c0'}} key={itemOcr["_id"]}>
                    <Text style={styles.modalText}>Croped Image</Text>

                  <Image source={{uri:itemOcr['crop_img']}} style={{width: '80%', height: '20%',resizeMode:'contain',alignSelf:'center',marginRight:30}}>
                        </Image>
                    <View style={styles.modalView}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'black',marginRight:7}}>
                        Key : 
                      </Text>
                      <Text style={{color:'black',marginBottom:15,}}>
                        {itemOcr["key"]}
                      </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'black',marginTop:10,marginRight:7,}}>
                        Predicted Text :
                      </Text>
                      
                      <TextInput style={styles.textInput({text:route.params.xldata[0][itemOcr["key"]],regex:itemOcr["regex"],uri:itemOcr['crop_img']})} multiline={true} defaultValue={route.params.xldata[0][itemOcr["key"]]}onChangeText={new_text=>{route.params.xldata[0][itemOcr["key"]]=new_text}} color='black'>

                      </TextInput>
                    </View>
                      
                      <View style={{marginTop:10,}}>

                         
                        </View>
                      </View>
                            </View>
                )
              })
            }
          </ScrollView>
          <Button style={{backgroundColor:'#7FBCD2',marginBottom:10}} width={wp('30%')} title={'done'} onPress={()=>{
                      
                      setModalVisible(false);
            


               }} ></Button>
        
        </View>
      </Modal>
      
      <Modal isVisible={isexcelModalVisible}
                                      //  deviceWidth={wp("0%")}
                                      //  deviceHeight={hp("0%")}
                                       transparent={true}
                                      // onTouchCancel={true}
                                       animationIn='zoomIn'
                                       animationOut='zoomOut'
                                      // backdropColor='#646464'
                                       
                                      onRequestClose={() => {
                                        // // Alert.alert("Modal has been closed.");
                                        //  setModalVisible(!isModalVisible);
                                        setexcelModalVisible(false);setseleted(2);
                                        setuploadingdrive(false)
                                       }}
                                       
                                   >
                                    <View>
                                      
                                      <View style={{ backgroundColor:'#d8d9d9' , height:hp('5%'),width:wp('90%'),borderTopLeftRadius:20,borderTopRightRadius:20}} >
                                          
                                          <TouchableOpacity  style={{flex:1,flexDirection:'row',justifyContent:"flex-end",}}>
                                          <Iconx name="x" size={30} color='black' style={{marginRight:6,marginTop:5}} onPress={()=>{setexcelModalVisible(false);setseleted(2);}}></Iconx>

                                            {/* <Text style={{color:'black',fontSize:30,marginRight:5}}>x</Text> */}


                                          </TouchableOpacity>


                                    </View>
                                  
                                
                                    </View>
                                
                              </Modal>
                              <BackModel/>
      <View style={{height:imgup_hight}}>

      </View>
      
        <View >
          <View style={{height:Imgheight*x,width:Imgwidth*x,backgroundColor:'green'}}>
            <ImageBackground source={{uri:img}} style={{width: '100%', height: '100%',backgroundColor:'black',resizeMode:'contain'}}>
            {
              route.params.tdata.map((item)=>{
                return(
                     
                     <View key={item["_id"]}>
                     

                        <View style={styles.box({x:(item['coordinates']['x']*(Imgwidth*x)),y:(item['coordinates']['y']*(Imgheight*x)),w:item['coordinates']['w']*(Imgwidth*x),h:item['coordinates']['h']*(Imgheight*x),text:route.params.xldata[0][item["key"]],key:item["key"],regex:item["regex"]})} >
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                        <ScrollView horizontal={true} >
                        <Text style={{color:'black',alignSelf:'center',fontSize:(item['coordinates']['h']*(Imgwidth*x))}}>
                          {route.params.xldata[0][item["key"]]}
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

          <View>
            <Text style={{fontWeight:'bold',color:'black',marginLeft:10}}>{stackLength}</Text>
          </View>
                

             <View style={{height:imgdown_hight,justifyContent:'flex-end',backgroundColor:'white',}}>
           
                                      <View style={{width:wp('100%'),height:hp('11%'),backgroundColor:'white',flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center',
                                      }}>
                            <Pressable style={{ width:wp('20%'), backgroundColor: "white",justifyContent:'center',alignItems:'center' }} onPress={async()=>{

                                                          var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

                                                          let bstr = await FileSystem.readFile(path, "ascii");
                                                          bstr=JSON.parse(bstr)

                                                         // bstr.scandata.push(route.params.xldata[0])
                                                          bstr.img=img
                                                          bstr.size={h:route.params.imgsize.h,w:route.params.imgsize.w}
                                                          bstr.tdata=route.params.tdata
                                                          bstr.save=false
                                                          bstr.tepxdt=route.params.xldata[0]




                                                       //   console.log(bstr)

                                                          FileSystem.writeFile(path, JSON.stringify(bstr), 'utf8')
                                                          .then(async(success) => {
                                                            navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename,keydata:totalData,backButton:false})

                                                                        })
                                                          .catch((err) => {
                                                            //console.log(err);
                                                          });

                                                             

                 
               }}>
                            <Rescan name="refresh-ccw" size={23} color='black' style={{marginRight:0,marginTop:0}} ></Rescan>
                          <Text style={{fontWeight:'bold',color:'black',marginTop:5}}>Rescan</Text>
                          
                          </Pressable>
                          <Pressable style={{width:wp('20%'),  backgroundColor: "white",justifyContent:'center',alignItems:'center' }} onPress={()=>{
                      
                      //console.log("model")
                      setModalVisible(true)
            


               }}  >
                            <Edit name="edit" size={23} color='black' style={{marginRight:0,marginTop:0}} ></Edit>
                          <Text style={{fontWeight:'bold',color:'black',marginTop:5,marginRight:3}}>Edit</Text>
                          
                          </Pressable>
                          <Pressable style={{ width:wp('20%'), backgroundColor: "white",justifyContent:'center',alignItems:'center'  }} onPress={async()=>{
                                                                                                  //appendExcel(xldata[0],excelfilename);

                                                                                                 if(!finishClicked && route.params.new){
                                                                                                  var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

                                                                                                  let bstr = await FileSystem.readFile(path, "ascii");
                                                                                                  bstr=JSON.parse(bstr)
                                                                                                  bstr.scandata.push(route.params.xldata[0])
                                                                                                  setstacklength(bstr.scandata.length)
                                                                                                  bstr.img=img
                                                                                                  bstr.size={h:route.params.imgsize.h,w:route.params.imgsize.w}
                                                                                                  bstr.tdata=route.params.tdata
                                                                                                  bstr.tepxdt=route.params.xldata[0]
                                                                                                  bstr.save=false
                                                                                                  //console.log(bstr)
                                                                                                  setfinishClicked(true)

                                                                                                  FileSystem.writeFile(path, JSON.stringify(bstr), 'utf8')
                                                                                                  .then((success) => {
                                                                                                    //console.log('data appended');
                                                                                                                  navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename,keydata:totalData,backButton:false})
                                                                                                                  //console.log(navigation)
                                                                                                                })
                                                                                                  .catch((err) => {
                                                                                                    //console.log(err);
                                                                                                  });
                                                                                                 }
                                                                                                 else{
                                                                                                  navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename,keydata:totalData,backButton:false})


                                                                                                 }




                                                                                                 // navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename})
             
                                                                                                                         }}>
                            <Plus name="pluscircle" size={23} color='black' style={{marginRight:0,marginTop:0}} ></Plus>
                          <Text style={{fontWeight:'bold',color:'black',marginTop:5,textAlign:'center'}}>Scan Another</Text>
                          
                          </Pressable>
                          <Pressable style={{width:wp('20%'),  backgroundColor: "white",justifyContent:'center',alignItems:'center' }} onPress={async()=>{
           
           if(!finishClicked && route.params.new){
            console.log("finish clicked")
            var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

            let bstr = await FileSystem.readFile(path, "ascii");
            bstr=JSON.parse(bstr)

            bstr.scandata.push(route.params.xldata[0])
            setstacklength(bstr.scandata.length)
            bstr.img=img
            bstr.size={h:route.params.imgsize.h,w:route.params.imgsize.w}
            bstr.tdata=route.params.tdata
            bstr.tepxdt=route.params.xldata[0]
            bstr.save=false

            //console.log(bstr)

            FileSystem.writeFile(path, JSON.stringify(bstr), 'utf8')
            .then(async(success) => {
             // console.log('data appended');
             // setexcelModalVisible(true)
             const res =await CreateEmptyExcel(fname,totalData[0]["templateName"],navigation);
            // console.log("res res : ",res)
         
                          })
            .catch((err) => {
             // console.log(err);
            });

            setfinishClicked(true)

           }
           else{
            //setexcelModalVisible(true)
            const res =await CreateEmptyExcel(fname,totalData[0]["templateName"],navigation);

            
            
           }

           
             }} >
                            <Save name="microsoft-excel" size={27} color='black' style={{marginRight:0,marginTop:0}} ></Save>
                          <Text style={{fontWeight:'bold',color:'black',marginTop:5}}>Save</Text>
                          
                          </Pressable>
                          </View>
              </View>

             

        </View>
      </View>
     

    

   

  )
    }

}

const styles = StyleSheet.create({
  box:({x,y,w,h,text,key,regex})=>{

    
    let result = text.match(regex);


    var bordercolor='none'
    var borderwidth = 0
    if(!result && text!='-'){
      
       bordercolor ='red'
     borderwidth = 1.5

    }
    return{
      position:'absolute',
      top:y,
      left:x,
    
      width:w,
      height:h,
      borderWidth:borderwidth,
      borderColor:bordercolor,
     
      //zIndex:300,
      backgroundColor:'white',
     // borderRadius: 10,
    
      
      


    } 

     
  },
  container: {
    flex:1,
     justifyContent:'center',
    alignItems:'center',
    
    backgroundColor:'white',
    blurRadius:'1'
    
    

    
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
  textInput: ({text,regex,uri})=> {
    //console.log(uri)
     
    var bordercolor='black'
    var borderwidth = 0
    let result = text.match(regex);
    if(!result && text!='-'){
      
       bordercolor ='red'
     borderwidth = 1.5

    }

    return{
      justifyContent: "center",
    alignItems: "stretch",
    height: 40,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor:bordercolor ,
    //backgroundColor:'red',
    borderRadius:10
    }

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
    flexDirection:'row'

  }
})
//<Image source={require(route.params.path)} /> <Image source={require('./Default.jpg')} />

//<Image source={{uri:'file:///storage/emulated/0/DCIM/Restored/IMG20220316134958.jpg', width: 100,  height: 100}} />

const data1 = [
  {
          "coordinates": {
          "x": 0.19974044940438687,
          "y": 0.28295283334065474,
          "w": 0.09874308713570168,
          "h": 0.04388039664826179
          },
          "_id": "62b33c825d13528bd83debdf",
          "templateName": "VIT MID-1",
          "key": "Subject",
          "regex": "string",
          "__v": 0
  },
  {
  "coordinates": {
  "x": 0.516121332546533,
  "y": 0.22696754429167118,
  "w": 0.3748205861737651,
  "h": 0.03934101249932418
  },
  "_id": "62b33cb55d13528bd83debe1",
  "templateName": "VIT MID-1",
  "key": "Reg N",
  "regex": "string",
  "__v": 0
  },
  {
  "coordinates": {
  "x": 0.516121332546533,
  "y": 0.28749219109030333,
  "w": 0.37885094567927347,
  "h": 0.03177545144896194
  },
  "_id": "62b33ce05d13528bd83debe3",
  "templateName": "VIT MID-1",
  "key": "Date",
  "regex": "string",
  "__v": 0
  },
  {
  "coordinates": {
  "x": 0.7418197420884937,
  "y": 0.17854777669411628,
  "w": 0.10680378856746832,
  "h": 0.027236093699313364
  },
  "_id": "62b33d035d13528bd83debe5",
  "templateName": "VIT MID-1",
  "key": "Branch",
  "regex": "string",
  "__v": 0

  },
  {
  "coordinates": {
  "x": 0.19369496288387456,
  "y": 0.22242816014273356,
  "w": 0.22569844470046083,
  "h": 0.05901157154756434
  },
  "_id": "62b33db45d13528bd83debe8",
  "templateName": "VIT MID-1",
  "key": "Name",
  "regex": "string",
  "__v": 0
  }
  ]