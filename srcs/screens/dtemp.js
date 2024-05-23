import React, { Component ,useEffect,useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity,FlatList ,Image,  ScrollView, ActivityIndicator,Alert,LogBox,TextInput,StatusBar,RefreshControl, Linking,} from 'react-native';
import Text_Size from './Textscaling';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu from './Menu'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import animLoading from '../animations/loading.json'
import animnodata from '../animations/97179-no-data-found.json'

import Lottie from 'lottie-react-native';
import { Button } from '@react-native-material/core';

import TemplatePreview from '../functions/TemplatePreview';
import  IconDanger from 'react-native-vector-icons/MaterialIcons'



import Modal from "react-native-modal";


import  MyCarousel  from '../functions/Slider';
import { showMessage, hideMessage } from "react-native-flash-message";
import { InAppBrowser } from 'react-native-inappbrowser-reborn'



const Dte = ( propss ) => {
    
      const [isLoading,setLoading] = useState(true)
      const [data,setData] = useState(null)
      const [isModalVisible, setModalVisible] = useState(false);
      const [isTempModalVisible, setTempModalVisible] = useState(false);
      const [iscusTempModalVisible, setcusTempModalVisible] = useState(false);

      const [selected,setseleted] = useState(0)
      const [filename,setfilename] = useState('newfile1')
      const [item,setItem] = useState(null)
      const [netWorkError,setNetworkerror] = useState(false)
      const [errName,seterrName]=useState('Something went wrong')

      var fname='newFile'

      const TemplateModelClicked=()=>{
        setTempModalVisible(false)
        //console.log("**9**")
      }
 const Note = (props)=>{
          return(
            <View style={{ backgroundColor:'white' , height:hp('6%'),width:wp('90%'),justifyContent:'center',justifyContent:'space-evenly',borderBottomColor:'black',borderBottomWidth:1,borderTopRightRadius:15,borderTopLeftRadius:15}}>
            {/* <IconNote name="md-alert-circle-outline" size={20} color='black' style={{marginRight:0}}></IconNote> */}
  
              <Text style={{fontWeight:'bold',color:'black',marginLeft:10,fontSize:18}} >{props.props.text} </Text>
            </View>
          )}
          const Note1 = (props)=>{
            return(
              <View style={{ backgroundColor:'white' ,width:wp('83%'),justifyContent:'center',justifyContent:'space-evenly',}}>
              {/* <IconNote name="md-alert-circle-outline" size={20} color='black' style={{marginRight:0}}></IconNote> */}
    
                <Text style={{fontWeight:'400',color:'black',marginLeft:7,fontSize:18,marginRight:10}} >{props.props.text} </Text>
              </View>
            )}
            const Note2 = (props)=>{
              return(
                <View style={{ backgroundColor:'white' ,width:wp('7%'),justifyContent:'center',justifyContent:'space-evenly'}}>
                {/* <IconNote name="md-alert-circle-outline" size={20} color='black' style={{marginRight:0}}></IconNote> */}
      
                  <Text style={{fontWeight:'bold',color:'black',marginLeft:10}} >{props.props.text} </Text>
                </View>
              )}
     
     const onTepClick=async(item) =>{

      if(item["NameofTemplate"]=='AddCustumTemplate'){
       setcusTempModalVisible(true)


      }
      else{
         setItem(item)
     // console.log("item : ",Object.keys(item))
      setTempModalVisible(true)
      
      }

     
        // fetch(`http://backend.docscanner.teambros.co.in/cropper/get-by-template-name/${item["NameofTemplate"]}`)
        // .then((res)=>res.json())
        // .then((jres)=>{
          
        //  // setData(jres.det)
        // //  console.log(tempName,"* * *")
        //   //console.log("cam key data ",jres.det);
          
        //   //console.log('key data : ',jres.det)
        //   var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;
        //   FileSystem.writeFile(path, JSON.stringify({"scandata":[]}), 'utf8')
        //   .then((success) => {
        //     console.log('empty json file created');
        //     setModalVisible(false);
        //     propss.props.navigate('Camera',{tempName:item["NameofTemplate"],img_temp:item["imguri64"],filename:fname,keydata:jres.det,scan:1})
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
          
         
        //  // console.log(jres.detail);
          
        //   //console.log(data)
          
        // })
        
        // .catch((err)=>{
        //   console.log(err);
        //   setModalVisible(false)
         
        //   showMessage({
        //     message: "Network problem",
        //     description: `Please Check Your Internet Connection`,
        //     type: 'danger',
        //     hideStatusBar:true
        //   });
        //  // navigation.goBack();
        // })
      
    
                 }
     

  


      useEffect(()=>{
        fetch('http://backend.docscanner.teambros.co.in/api/v1/forms/')
        .then((res)=>res.json())
        .then((jres)=>{
          const addTemp ={"NameofTemplate":'AddCustumTemplate'}
          jres.detail.push(addTemp)
          setData(jres.detail)
          
         // console.log(jres.detail)
          setLoading(false);
         // console.log('1')
          
         
         // console.log(jres.detail);
          
          //console.log(data)
          
        })
        .catch((err)=>{
          console.log(err);
          if(err.toString()=="SyntaxError: JSON Parse error: Unrecognized token '<'"){
            seterrName('Internal Server Error')

          }
          else if(err.toString()=='TypeError: Network request failed'){
            
            seterrName('No Internet Connection')

          }
          setNetworkerror(true)
              setLoading(false)
          // showMessage({
          //  // message: err.toString(),//,
          //  message:"002 Network Error " ,
          //   description: `Please Check Your Internet Connection `,
          //   type: 'danger',
          //   duration:2200
          // });
          // Alert.alert(
          //   "Alert ",
          //   "Please Check Your Internet Connection",
          //   [
          //     {
          //       text: "Cancel",
          //       onPress: () => console.log("Cancel Pressed"),
          //       style: "cancel"
          //     },
          //     { text: "OK", onPress: () => console.log("OK Pressed") }
          //   ]
          // );
        })
        
      },[])
      
    
        if(isLoading){

          return(
            
            
            <View style={styles.container}>
               <StatusBar
            translucent={false} 
            backgroundColor={'white'} 
            barStyle='dark-content'
            hidden={false} />
          

            <View style={styles.part_4l}>

            {/* <Spinner
            visible={isLoading}
            textContent={'Loading Templates..'}
            textStyle={{color: '#FFF'}}
            /> */}
                <View style={{flex:1,justifyContent:"center",alignSelf:'center'}}>
                  <View style={{justifyContent:"center",alignSelf:'center',}}>
           <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{height:hp('10%'),width:wp('10%')}}/>
           </View>

               </View>

                


            </View>
            {/* <View style={styles.part_5}>
                <TouchableOpacity
                    style={styles.proceed}
                    //onPress={()=>writeExcel}
                    
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize:Text_Size.Text_size_Type_0 }}>Create custum template</Text>
                </ TouchableOpacity>

            </View> */}

            

        </View>
          )
        }
        else if(netWorkError){

          return(

            <View style={{alignItems:'center',height:hp('50%'),justifyContent:'flex-end'}}>
              <IconDanger name='report-problem' color={'#7FBCD2'} size={100}></IconDanger>

              <Text style={{fontSize:30, color:'black',fontFamily:'sans-serif-medium'}}>{errName}</Text>
            </View>
          )

        }
        else if(data.length<1){

          return(

            <View style={{alignItems:'center',height:hp('50%'),justifyContent:'flex-end',marginTop:40}}>
              {/* <IconDanger name='report-problem' color={'#7FBCD2'} size={100}></IconDanger> */}
              <Lottie source={animnodata} autoPlay loop resizeMode="contain" style={{height:hp('20%'),width:wp('20%')}}/>


              <Text style={{fontSize:30, color:'black',fontFamily:'sans-serif-medium'}}>There are no templates ..</Text>
            </View>
          )

        }
        else{
         // console.log(data)
 
      return (

        <View style={styles.container}>
           
            
           <Modal isVisible={false}
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
                                        // setexcelModalVisible(false);setseleted(2);
                                         setModalVisible(false)
                                       }}
                                       
                                   >
                                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                                      
                                      <View style={{ backgroundColor:'#d8d9d9' , height:hp('10%'),width:wp('75%'),}} >
                                       <View style={{flexDirection:"row",justifyContent:"center",marginTop:25}}>
                                        <Text style={{color:'black',fontWeight:'bold',fontSize:17}}>Loading Keys</Text>
                                       </View>
                                

                                    </View>
                                
                                    </View>
                                
                              </Modal>
                              <Modal isVisible={isTempModalVisible}
                                      //  deviceWidth={wp("0%")}
                                      //  deviceHeight={hp("0%")}
                                       transparent={true}
                                      // onTouchCancel={true}
                                      animationIn='zoomIn'
                                     // animationOut='zoomOut'
                                      useNativeDriver={true} 
                                      // backdropColor='#646464'
                                       
                                      onRequestClose={() => {
                                        setTempModalVisible(false)
                                       
                                       }}
                                       
                                   >
                                    <View style={{flexDirection:"row",justifyContent:"center",backgroundColor:'rgba(255, 254, 255, 0)'}}>
                                    <View style={{ backgroundColor:'rgba(255, 254, 255, 0)' , height:hp('90%'),width:wp('90%'),}} >
                                      <TemplatePreview props={item} nav={propss.props} func={TemplateModelClicked}></TemplatePreview>
                                  
                                    </View>
                                
                                    </View>
                                
                              </Modal>
                              <Modal isVisible={iscusTempModalVisible}
                                      //  deviceWidth={wp("0%")}
                                      //  deviceHeight={hp("0%")}
                                       transparent={true}
                                      // onTouchCancel={true}
                                      animationIn='zoomIn'
                                      animationOut='zoomOut'
                                      useNativeDriver={true} 
                                      // backdropColor='#646464'
                                       
                                      onRequestClose={() => {
                                        setcusTempModalVisible(false)
                                       
                                       }}
                                       
                                   >
                                    <View style={{flexDirection:"row",justifyContent:"center",backgroundColor:'rgba(255, 254, 255, 0)'}}>
                                    <View style={{ backgroundColor:'white' , height:hp('60%'),width:wp('90%'),borderRadius:15,}} >

                                    <Note props={{text:'Instructions :'}}></Note>

                                    <View style={{ backgroundColor:'white' , height:hp('48%'),width:wp('90%'),justifyContent:'space-evenly'}}>
                                      <View style={{flexDirection:'row'}}>
                                    <Note2 props={{text:'1.'}}></Note2>
                                    <Note1 props={{text:'To make a Custom Template you need to make a request by filling a form'}}></Note1>

                                      </View>
                                      <View style={{flexDirection:'row'}}>
                                    <Note2 props={{text:'2.'}}></Note2>
                                    <Note1 props={{text:'Fill the details and upload the image(please make sure that uploaded image need to scanned by printer)'}}></Note1>

                                      </View>
                                      <View style={{flexDirection:'row'}}>
                                    <Note2 props={{text:'3.'}}></Note2>
                                    <Note1 props={{text:'while filling the details template name should be unique(not be used yet)'}}></Note1>

                                      </View>

                                  


                                    </View>

                                    <View style={{justifyContent:'space-evenly',flexDirection:'row'}}>
                                    <Button title="cancel" compact
            variant="text"
            titleStyle={{color:'black'}}  onPress={ ()=>{setcusTempModalVisible(false)}} style={{marginBottom:30}}  color={'white'}/>

                                    <Button title="Proceed "  compact
            variant="text"
            titleStyle={{color:'black'}}  onPress={ ()=>{
                                      

                                      const myFirstPromise = new Promise((resolve, reject) => {
                                        setcusTempModalVisible(false)
                            
                                       
                                        setTimeout(() => {
                            
                            
                                          resolve("foo");
                                        }, 300);
                            
                                          // Yay! Everything went well!
                                      });
                            
                                      myFirstPromise.then((successMessage) => {
                                        // successMessage is whatever we passed in the resolve(...) function above.
                                        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                                        console.log(`Yay! ${successMessage}`);
                                        openLink();

                            
                                       
                                      });
                                      
                                      
                                      }} style={{marginBottom:30}}  color={'white'}/>

                                    </View>


                                    
                                      


                                    </View>
                                
                                    </View>
                                
                              </Modal>

            <View style={styles.part_4}>
            <Text style={{color:'black',fontSize:20,marginTop:20,marginLeft:20,fontWeight:'bold'}}>Select a Template</Text>


                    <MyCarousel tepData={data} fun={onTepClick}></MyCarousel>

                    {/* <TemplateBox tepData={data} fun={onTepClick}></TemplateBox> */}


                {/* <View style={styles.temlets}>
                
                     


                     
                     <ScrollView horizontal={true}>
                      {
                        
                        data.map((item)=>{
                          //console.log(item['templateImage'])
                          return(
                            <View key={item["_id"]}>
              
                                             
                                     <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={() =>{setModalVisible(true),setItem(item) ;}} key={item["_id"]}>
                                    <View style={Tempstyles.tempItem}>

                                        <View style={Tempstyles.tempImgView}>

                                            <Image source={{uri:item['templateImage']}} style={{ width: wp('65%'), height: hp('50%')}}  resizeMode="stretch" />
                                          

                                        </View>
                                        <View style={Tempstyles.tempTextView}>
                                            
                                            <Text style={{color:'black'}}>Template Name :  {item["templateName"]}</Text>

                                        </View>
                                        


                                    </View>
                
                            </TouchableOpacity>
                            </View>
                            )
                        })
                      }

                     </ScrollView> 

                </View> */}
                


            </View>
            {/* <View style={styles.part_5}>
                <TouchableOpacity
                    style={styles.proceed}
                   // onPress={()=>{console.log("l");propss.props.navigate('login')}}
                    
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize:Text_Size.Text_size_Type_0 }}>Create custum template</Text>
                </ TouchableOpacity>

            </View> */}
            

        </View>

    )
  }
}

export default Dte
const styles = StyleSheet.create({
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

  },
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
    
    // part_3: {
    //     flex: 0.1,
    //     alignItems:'center',
    //   // backgroundColor:'green',
    //     justifyContent:'flex-end',
    //    // marginTop:,
    //     marginLeft:49,
    //   //  marginBottom:25
        
    // },
    part_4l: {
      flex: 0.75,
      alignItems:'center',
     // backgroundColor:'red',
      justifyContent:'center',
      height:hp('60%'),
      width:wp('50%'),
      alignSelf:'center',
    //  marginBottom:20

      

  },
    
    part_4: {
        //flex: 0.80,
       // alignItems:'center',
        //backgroundColor:'#7FBCD2',
       
       
       // justifyContent:'center',
        // height:hp('79%'),
        // width:wp('100%'),
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
       // marginBottom:100

        //alignSelf:'center',
        
      //  marginBottom:20

        

    },

    temlets:{
        
       // backgroundColor:'#5364b2',
        borderRadius:wp('7%'),
        height:hp('65%'),
        width:wp('95%'),
        
        
        

    },
    // part_5: {
    //     flex: 0.1,
        
    //     alignItems:'center',
    //    // backgroundColor:'yellow',

   // },
    proceed:{ height:hp('7%'),
          width: wp('95%'),
          justifyContent: "center", 
          alignItems: "center", 
          borderRadius: 20,
          backgroundColor:'#5364b2',
          marginTop:17,
          fontStyle:'Inter' },
    


    container: {
        flex: 1,
        flexDirection: 'column',
           alignItems: 'center',
        //   marginTop: 100,
        //   padding: 20,
       // backgroundColor:'red',
        justifyContent:'center'
        
    },
    circleshape: {
            // width:wp*270,
            // height:wp*270,
            // borderRadius:wp*129,
            // backgroundColor: '#5364b2',
            //  marginTop:wp*-90,
            //  marginLeft:wp*-60
    },
    part_2_1: {
        flex: 0.1
        

    },
    part_2_2: {
        flex: 0.9,
       // backgroundColor:'green'

    },

    // csp: {
        
    //       height:hp('14%'),
    //       width:wp('19%'),
    //     // borderRadius:150/2,
    //     backgroundColor: '#5364b2',
    //     borderRadius:wp('22%'),
    //     backgroundColor: '#5364b2',
    //     marginTop:wp('-8%'),
    //     // marginTop:-85,
    //      marginLeft:wp('-4%'),
    // },
    // boy: {
    //      flex:1,
    //     width: wp('90%'),
    //     height: hp('50%'),
    //       marginTop:-130,
    //       marginLeft:-10
    //},
    dt: {
          
        // fontFamily:'Inter',
         fontSize:Text_Size.Text_size_Type_1,
        // marginTop:-10,
        // marginLeft:-61,
         fontWeight: 'bold',
         color: '#00000014', 
    },
    gup: {
        // fontFamily:'Inter',
        // fontSize:17.5,
        // marginLeft:10,
        // marginTop:3,
        // fontWeight:'Semibold',
        // color:"#353935"
    },

    xsheet: {
        //  fontSize:20,
        //  marginTop:-30,
        //  marginLeft:-89
    },
    tlin: {
        //  height:50,
        //  width:300,
        //  marginTop:18,
        //  borderWidth:1,
        //  borderColor:'black',
        //  borderRadius:20
    },
    menu:{
     // flex:0.7,
    //  backgroundColor:'black'
    }
    
});

const Tempstyles = StyleSheet.create({
    tempItem:{
        backgroundColor:'white',
       // borderRadius:wp('7%'),
        height:hp('61%'),
        width:wp('80%'),
        marginRight:20,
        //marginTop:83,
       // borderBottomColor:'rgba(100, 100, 100, 0.9)',
       // shadowColor:'rgba(0, 0, 0,0.9)'
      //  shadowColor: 'black',
      //   shadowOffset: {width: -2, height: 4},
      //   shadowOpacity: 1.0,
      //   shadowRadius: 3,
    
        
        
    },
    tempImgView:{
        flex:0.95,
       // backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        

    },
    tempTextView:{
      //  flex:0.05,
       // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
       // marginBottom:14

    },
    tempNavigate:{
        flex:0.1
    }
    

});


//navigation.navigate('Camera',{tempName:item["templateName"],img_temp:item["templateImage"]})
const  openLink=async() =>{
  try {
    const url = 'http://docscanner.teambros.co.in/form'
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: 'red',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: 'white',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        showInRecents: true,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right'
        },
        headers: {
          'my-custom-header': 'my custom header value'
        }
      })
     // await this.sleep(800);
      //Alert.alert(JSON.stringify(result))
    }
    else{
      
      Linking.openURL(url)
     // Alert.alert("else")
    }
  } catch (error) {
    Alert.alert(error.message)
  }
}