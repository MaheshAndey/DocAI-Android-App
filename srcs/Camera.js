import React, { Component ,useState,useEffect, useRef,useMemo} from 'react'
import { Image,Pressable} from 'react-native';
import * as FileSystem from  'react-native-fs'
import ImageSize from 'react-native-image-size'
import { RNS3 } from 'react-native-aws3';
import { showMessage, hideMessage } from "react-native-flash-message";
import RNPhotoManipulator from 'react-native-photo-manipulator';
import ImageEditor from "@react-native-community/image-editor";
import Modal from "react-native-modal";

import animLoading from './animations/ocr_loading.json'
import Lottie from 'lottie-react-native';

import { StyleSheet, View,ActivityIndicator, Alert ,Button,Text,TouchableOpacity,StatusBar,PermissionsAndroid,BackHandler} from 'react-native'
import RNFS from 'react-native-fs';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';


import IconFlash from "react-native-vector-icons/MaterialIcons";
import IconCam from "react-native-vector-icons/MaterialCommunityIcons";
import IconGal from "react-native-vector-icons/Ionicons";

import ImageResizer from 'react-native-image-resizer';
import { useCameraDevices,Camera } from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import { Buffer } from "buffer";
import { TextractClient, AnalyzeDocumentCommand,DetectDocumentTextCommand } from "@aws-sdk/client-textract";
export default function Cameraa({navigation}){


 // const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

  const devices = useCameraDevices()
 // console.log(devices)
  const device = devices.back
  const camera = useRef(null);

  const permission = async()=>{
    const newCameraPermission = await Camera.requestCameraPermission()
  }
  permission()

    console.log("camera screen rendered")
    const [isLoading1,setLoading] = useState(false)
    console.log("outside-----------", isLoading1)
    
    const [Flash,setFlash]=useState(2)
    const [FlashOption,setFlashOption]=useState("on")
    const [timeoutModal,settimeoutModal]=useState(false)

    const route = useRoute();

    const tempName = route.params.tempName; 
    const tempImg = route.params.img_temp;
    const filename = route.params.filename
    const data = route.params.keydata
    var backButton = useRef(false)
    console.log(backButton,"00")
    var timeOut = useRef(true)
   
      
    useEffect(()=>{
      backButton.current=false
      timeOut.current=true
      settimeoutModal(false)
 

    },[route])

   
    
    const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
  

   async function  AmazonTextract(buffer){
      const client = new TextractClient({
        region: 'ap-south-1',
        credentials: {
          accessKeyId: 'AKIAWEVT3WY3P6OZOA54',
          secretAccessKey: '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',
        },
      });
      
      
        const params = {
          Document: {
      
            Bytes: buffer
            
          },
        // FeatureTypes:["TEXT"]
          
          
        }
       const command = new DetectDocumentTextCommand(params);
       //console.log(command)
      
          console.log("started")
          const data = await client.send(command);
          // process data.
         // console.log(JSON.parse(JSON.stringify(data))['Blocks'][5])
          const OutputList = []
         // const templistwithcor =[]
        //const OutputList =["#", "Yadal Manf Koa", "#", "20", "#", "10", "#", "Ljs", "#", "AVA", "#", "19", "#", "Amak", "#", "2OPAIA5y55", "#", "88", "#", "9", "#", "11", "#", "Lyo", "#", "77", "#", "99", "#", "20", "#", "99", "#", "99", "#", "30", "#", "00", "#", "98", "#", "9", "#", "76", "#", "87", "#", "77", "#", "99", "#", "99"]
          const WordsList = []
          for (var i = 0; i < JSON.parse(JSON.stringify(data))['Blocks'].length; i++){

            const resobj ={}
            const resobj1 = {}
            if(JSON.parse(JSON.stringify(data))['Blocks'][i]["BlockType"]==="LINE" ){
             //console.log(JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"])
             // OutputList.push(JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"])
             // templistwithcor.push(JSON.stringify(data))
             resobj['RecText']=JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"]

             resobj['Coordinates']=(JSON.parse(JSON.stringify(data))['Blocks'][i]["Geometry"]['BoundingBox'])
             resobj['Confidence']=(JSON.parse(JSON.stringify(data))['Blocks'][i]['Confidence'])

             OutputList.push(resobj)


            }
            else if(JSON.parse(JSON.stringify(data))['Blocks'][i]["BlockType"]==="WORD" ){
              //console.log(JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"])
              // OutputList.push(JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"])
              // templistwithcor.push(JSON.stringify(data))
              resobj1['RecText']=JSON.parse(JSON.stringify(data))['Blocks'][i]["Text"]
 
              resobj1['Coordinates']=(JSON.parse(JSON.stringify(data))['Blocks'][i]["Geometry"]['BoundingBox'])
              resobj1['Confidence']=(JSON.parse(JSON.stringify(data))['Blocks'][i]['Confidence'])
              //console.log('coordinates : ',(JSON.parse(JSON.stringify(data))['Blocks'][i]["Geometry"]['BoundingBox']))
              WordsList.push(resobj1)
              //console.log(resobj1)
 
 
             }
          }

          OutputList.push(WordsList)
          //console.log("temcor : ",OutputList)
      
         // console.log("Output textract",JSON.stringify(OutputList))
          return new Promise((resolve, reject)=>{if(OutputList!=[]){resolve(OutputList)}else{reject("Rejected")}})
      // }).catch((e)=>console.log(e));
    }
    
 

  const abortController = useRef(false)
  //var backButton = false;
  const cancelRequest = ()=>{
    console.log('fetched canceled');
    abortController.current && abortController.current.abort();
  }

async function handleBackButtonClick() {
         console.log("back__pressed_loading : ",isLoading1)
 // 
            var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

            let bstr = await FileSystem.readFile(path, "ascii");
            bstr=JSON.parse(bstr)

          //  bstr.scandata.push(route.params.xldata[0])
          
            console.log(bstr)
  
            backButton.current=true
              setLoading(false)
            // setBackButton(true)
            console.log(backButton,"00")

            if(!bstr.tepxdt){
              navigation.goBack();

            }
            else{

              navigation.navigate('ImageDisplay', { path:bstr.img,tdata:bstr.tdata,Excelfilename:'',tempImg:bstr.img,xldata:[bstr.tepxdt],imgsize:bstr.size,new:false});  //{h:height,w:width}


            }
   
  try{
    cancelRequest();
    console.log("fetch aborted");
  }
  catch{
    console.log('fetch not aborted');
  }
  
 
 
 // cancelRequest();
  return true;
}

useEffect(() => {
  
  
  BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  return () => 
  {console.log("use efffect back buttomn")
    BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  };
}, []);

    const FlashComp = ()=>{
      if(Flash==0){
        return(
          <View>
            <IconFlash name='flash-auto' color={'white'} size={30}  onPress={()=>{setFlash(1);setFlashOption(RNCamera.Constants.FlashMode.off)}}></IconFlash>
          </View>
        )
     
      }
      else if(Flash==1){
        return(
          <View>
            <IconFlash name='flash-off' color={'white'} size={30}  onPress={()=>{setFlash(2);setFlashOption('on')}}></IconFlash>
          </View>
        )
          
        }
        else if(Flash==2){
          return(
            <View>
              <IconFlash name='flash-on' color={'white'} size={30}  onPress={()=>{setFlash(1);setFlashOption('off')}}></IconFlash>
            </View>
          )
            
          }  
    

    }
  
   const imageGot=async(uri)=>{

    const myTimeout =  setTimeout(() => {
    

      if(timeOut.current){
        settimeoutModal(true)
      }

      
    }, 20000);
    // setLoading(true);
    console.log(uri);
    //var imgName = uri.slice(-40);
    var  imgName = uri.substring(uri.lastIndexOf("/") + 1);
    console.log(imgName);

     const file = {
      uri: uri,
      name: imgName,
      type: "image/png"
    }
     
    const options = {
      keyPrefix: "testImages/",
      bucket: "sift-bucket-1",  
      region: "ap-south-1",
      accessKey: "AKIAWEVT3WY3P6OZOA54",
      secretKey: "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",
      successActionStatus: 201      ,
    }
     
    RNS3.put(file, options).progress((e) => console.log('persentage : ',e.percent)).then(response => {
      console.log("rns3.put-----", backButton.current)
      abortController.current = new AbortController();

      console.log(response)
      
      if (response.status == 201 && !backButton.current){
        //setdoneS3(true)
        
        console.log(`${imgName} is successfuly uploaded to s3`);
        console.log("s3----", isLoading1)
        fetch("http://backend.docscanner.teambros.co.in/sift/details", {

        signal:abortController.current.signal ,

          // Adding method type
          method: "POST",
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          },
           
          // Adding body or contents to sendd
          body: JSON.stringify({
                    ref: `${tempName}.jpeg`,
                    test : imgName
                  }),
           
         
      })
       
      // Converting to JSON
      .then(response => response.json())
      .then(res=>{console.log(res)

        if(res.message=="Image Saved successfully"){

          
           const newPath = `${FileSystem.CachesDirectoryPath}/${imgName}`; 

          
            FileSystem.downloadFile({fromUrl:`https://sift-bucket-1.s3.ap-south-1.amazonaws.com/surfImages/${imgName}`,toFile: newPath}).promise.then((r) => {
              // console.log("done")
              // console.log("key data :: ",backButton)
              // console.log("download file------ ", isLoading1)
             if(!backButton.current){
               photoManipulate(`file://${newPath}`,route.params.keydata,filename,myTimeout
               )
              //  .then((res)=>{
              //   console.log("res : ",res)
              //   //  navigation.navigate('ImageDisplay', { path:`file://${newPath}`,tdata:data,Excelfilename:filename,tempImg:tempImg,opImg:`file://${newPath}`});

              // })

             }
             else{
              clearTimeout(myTimeout);

             } 
              //setLoading(false)

            })
            .catch((err)=>{
              clearTimeout(myTimeout);

              console.log(err);
              console.log("Failed to get image from S3")
              setLoading(false)
              showMessage({
               // message: "Failed to get image from S3",
        message: "Network Error",

                description: `please try again 018`,
                type: 'danger',
                hideStatusBar:true,
                duration:2200
              });

          // navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data})             
                   
                 })
            
            
            ;

        }
        else{
          clearTimeout(myTimeout);


         if(!backButton.current){
          showMessage({
            message: "Got invalid image",
            description: `please select a image related to selected template 017`,
            type: 'danger',
            hideStatusBar:true,
            duration:2200
          });
         }
          setLoading(false)
          //navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data}) 
        }
      
      })
      .catch((error) => {
        clearTimeout(myTimeout);

        console.error(error);
        setLoading(false)
                     if(!backButton.current){
                      
                      showMessage({
                        message: "Server is not responded",
                        description: `please try again 016`,
                        type: 'danger',
                        hideStatusBar:true,
                        duration:2200
                      });
                     }
        
             // navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data})             
       
      });

    }
      else{
         //throw new Error("Failed to upload image to S3");
         // console.log(response.body);
         clearTimeout(myTimeout);

         console.log("Failed to upload image to S3-")
         setLoading(false)
        if(!backButton.current){
          showMessage({
            //message: "Image failed to upload to S3",
        message: "Network Error",

            description: `please try again 015`,
            type: 'danger',
            hideStatusBar:true,
            duration:2200
          });
        }

// navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data})             

      }
       

    }
    )
    .catch((err)=>{
      console.log(err)
      clearTimeout(myTimeout);

      console.log("Failed to upload image to S3..")
      setLoading(false)
     if(!backButton.current){
      showMessage({
        //message: "Image failed to upload to S3",
        message: "Network Error",
        description: `please try again 014`,
        type: 'danger',
        hideStatusBar:true,
        duration:2200
      });
     }

  //  navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data}) 
    })
    ;

 
    }

    const takePhotoOptions = useMemo(
      () => ({
        photoCodec: 'jpeg',
        qualityPrioritization: 'speed',
        flash: FlashOption,
        quality: 90,
        skipMetadata: true,
      }),
      [FlashOption],
    );

    const captureHandels3 =async ()=>{
      try{
        //takePicture({ quality: 0.8,orientation: 'portrait', fixOrientation: true})

        if (camera.current == null) throw new Error('Camera ref is null!');

        else{
           console.log('Taking photo...');
         camera.current.takePhoto(takePhotoOptions)
        .then((uri)=>{
        //console.log(uri);
        const filepath =`file://${uri['path']}`;
        ImageSize.getSize(filepath).then(size => {
          
          console.log(size,"00")
         })
        // ImagePicker.openCropper({
        //   path: filepath,
        //  // width: 750,
        //  // height:1600,

        //   freeStyleCropEnabled:true
        // })
        .then(image => {
          setLoading(true);
          console.log("imageGot-------------", backButton)
          // image['path']
          console.log(backButton,"before imggotfunc");
          if(!backButton.current){

            imageGot(`file://${uri['path']}`)
          }
          else{
            console.log("back button clicked..")
          }
          
          })
         
        }).catch(err=>{
          console.log('camera stopped ' ,err);
        })
        }
      }
      catch{
        console.log('error');
        console.log("Failed to upload image to S3.")
        setLoading(false)
       if(!backButton.current){
        showMessage({
          // message: "Image failed to upload to S3",
          message: "Network Error",
           description: `please try again 013`,
           type: 'danger',
           hideStatusBar:true,
           duration:2200
         });
       }

     // navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data}) 
      }
      
  
    }
   

    
    const openGallarys3 = ()=>{

      
     try{
      ImagePicker.openPicker({
        
        cropping: true,
        showCropFrame:false,
        freeStyleCropEnabled:true,
        mediaType:'photo'
        
        
      }).then(image => {
        setLoading(true);
        // image['path']
        console.log(image['path']);
        console.log("imageGot-------------", isLoading1)
        imageGot(image['path'])
        
        })

      

       
      .catch(err=>{
        console.log('picker is stopped',err);
      })
     }
     catch(err){
      
      console.log(err)
          //console.log(err)
          setLoading(false)
         if(!backButton.current){
          showMessage({
            message: "Something went wrong ",
            description: `please try again 012`,
            type: 'danger',
            hideStatusBar:true,
            duration:2200
          });
         }

       // navigation.navigate('Camera',{tempName:tempName,img_temp:tempImg,filename:filename,keydata:data}) 

     }
    }

    
    const photoManipulate =(img,totalData,filename,myTimeout)=>{
      {
        //const img = 'file:///data/user/0/com.docai/cache/8fb870ac-eb9a-4083-bf18-b6cc49c561c8.jpg'
      
        
      
         
          //const [path,setPath]= useState('')
          //console.log(totalData)
         
          if(totalData.length==0){
          // console.log("**")
             ImageSize.getSize(img).then(size => {
             console.log("==",img)
             const width1 =size.width
             const height1 = size.height
       
             //navigation.navigate('ImageDisplay', { path:img,tdata:object,xldata:list,imgW:size.width,imgH:size.height});
             //console.log({object,list,width1,height1})
             navigation.navigate('ImageDisplay', { path:img,tdata:totalData,Excelfilename:filename,tempImg:img,xldata:[{}],imgsize:{h:height1,w:width1},new:true});
             setLoading(false)
             clearTimeout(myTimeout);

            
       
         
            })
          }
       else{
       //console.log(object)
       const list ={}
       var length = totalData.length;
       console.log(length)
       var temp =0;
       ImageSize.getSize(img).then(size => {
        //console.log("==",img)
        const width =size.width
        const height = size.height
        const cropImagesList = []
  
        var totalHeights = 0
        var totalWidths = 0
  
        for (var item in totalData) {
          const data = totalData[item]
  
            //croping data
            //console.log(data['coordinates']["x"]*width,data['coordinates']["y"]*height,'--------------   --')
            //console.log(data['coordinates']["w"]*width,data['coordinates']["h"]*height,'--------------   --')
            // const coordinates ={}
            // coordinates['x']=data['coordinates']["x"]//*width
            // coordinates['y']=data['coordinates']["y"]//*height
            // coordinates['w']=data['coordinates']["w"]//*width
            // coordinates['h']=data['coordinates']["h"]//*height
        
            // dic['coordinates']=coordinatesa
        
            const cropData = {
              
                offset: {x:(data['coordinates']["x"]*width)-(((data['coordinates']["x"]*width)/100)*0) , y:(data['coordinates']["y"]*height)-(((data['coordinates']["y"]*height)/100)*0)},
                size: {width: (data['coordinates']["w"]*width)+(((data['coordinates']["w"]*width)/100)*0), height: (data['coordinates']["h"]*height)+(((data['coordinates']["h"]*height)/100)*0)},
                displaySize: {width:data['coordinates']["w"]*width , height: data['coordinates']["h"]*height},
               // resizeMode: 'contain'  // | 'cover' | 'stretch',
              }
              if(Math.floor(cropData['size'].width)>totalWidths){
       
                totalWidths=Math.floor(cropData['size'].width)
                
              }
         
        
            ImageEditor.cropImage(img, cropData,data).then(url => {
              //console.log(totalHeights)
  
               //console.log("Cropped image uri===", url,cropData);
               const cropItem={}
               cropItem["operation"]= "overlay"
               cropItem['overlay']=url;
              // cropItem['position']={x:300,y:(totalHeights)}
              cropItem['position']={x:cropData.offset.x,y:cropData.offset.y}
              data['crop_img']=url
             
  
  
              //  const cropTextItem={}
              //  cropTextItem["operation"]= "text"
              // //  cropTextItem['overlay']=url;
              // cropTextItem['options']={ position: {x:200,y:(totalHeights)+(Math.floor(cropData['size'].height)/3)},text:"#",textSize: 45, color: "black"}
              
  
              //    { operation: "text", options: { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" } },
  
              // { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" },
               //console.log(cropItem)
               cropImagesList.push(cropItem)
              // cropImagesList.push(cropTextItem)
  
              // totalHeights=totalHeights+(Math.floor(cropData['size'].height))
  
              if(cropImagesList.length==length){
               // console.log("cropImagesList : ",cropImagesList[1])
                Action(height,width,cropImagesList,myTimeout)
               // console.log(totalHeights,totalWidths+500)
              }  
            
              // navigation.navigate('ImageDisplay', { path:img,tdata:totalData});
             }).catch(err=>{
               console.log(err,'======')
               clearTimeout(myTimeout);

              
              // navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename,keydata:totalData})
       
             })
        
        }
   
       })
   
       }
       
        
         
      
      
      const Action=async(height,width,keyList,myTimeout)=>{
       // console.log(keyList)
        
            //     ImageResizer.createResizedImage(
            //       wimgb64,
            //       width,
            //       height,
            //       'JPEG',
            //             100,
            //             0,
            //             undefined,
            //             true,
            //             {mode:"stretch"}
            //     )
            // .then((response) => {
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
              //console.log(response)
                    // const cropRegion = { x: 0, y: 0, height: height, width: width };
                    // const image =response.uri ;
           
      
            //  RNPhotoManipulator.batch(image, keyList, cropRegion).then( (path) => {
              //    console.log(`Result image path: ${path}`);

                        var myBuffer = ""
                        RNFS.readFile(img, 'base64')
                        .then(res =>{
                         // console.log(res);
                          myBuffer = Buffer.from(res, 'base64')}
                        ).then(()=> 
                   {AmazonTextract(myBuffer).then( response => {
                    
                    const xldata=[{}]
                    var done = 0
                    for(var item in totalData){
    
                      var tep = 0
                     for(var res =0 ;res<response.length-1;res++){
                         
                         const centerX=(response[res]['Coordinates']['Left']+(response[res]['Coordinates']['Width'])+response[res]['Coordinates']['Left'])/2
                         const centerY=(response[res]['Coordinates']['Top']+(response[res]['Coordinates']['Height'])+response[res]['Coordinates']['Top'])/2
                        // console.log(centerX,centerY)
                        // console.log(totalData[item]['coordinates']['x'],totalData[item]['coordinates']['w'])
                         if(totalData[item]['coordinates']['x']<=centerX && centerX<=(totalData[item]['coordinates']['w']+totalData[item]['coordinates']['x']) && totalData[item]['coordinates']['y']<=centerY &&  centerY<=(totalData[item]['coordinates']['h'])+totalData[item]['coordinates']['y']){
                             
                             if(response[res]['Coordinates']['Width']>totalData[item]['coordinates']['w'] ||
                             (response[res]['Coordinates']['Left']<totalData[item]['coordinates']['x'] || (response[res]['Coordinates']['Left']+response[res]['Coordinates']['Width'])>(totalData[item]['coordinates']['x']+totalData[item]['coordinates']['w']) )

                             
                             
                             ){
                              console.log(totalData[item]['key'])
                                 var str = ""
                                 var value =0
                                 var once =0
                                 var count =0
                                 
                                 for (var item1 = value;item1<response.length;item1++){
                                     //console.log(response[response.length-1][item1]['RecText'])
                                    // console.log(item1)
                                     
                                  const centerX1=(response[response.length-1][item1]['Coordinates']['Left']+(response[response.length-1][item1]['Coordinates']['Width'])+response[response.length-1][item1]['Coordinates']['Left'])/2
                         const centerY1=(response[response.length-1][item1]['Coordinates']['Top']+(response[response.length-1][item1]['Coordinates']['Height'])+response[response.length-1][item1]['Coordinates']['Top'])/2
                          if(totalData[item]['coordinates']['x']<=centerX1 && centerX1<=(totalData[item]['coordinates']['w']+totalData[item]['coordinates']['x']) && totalData[item]['coordinates']['y']<=centerY1 &&  centerY1<=(totalData[item]['coordinates']['h'])+totalData[item]['coordinates']['y']){
                            // console.log(response[response.length-1][item1]['RecText'])
                                         //tep =1
                                      
                              str=str+response[response.length-1][item1]['RecText']
                              str=str+" "
                       
                              value= item1
                              once=once+1
                         
                             
                          }
                          else{
                              count=count+1
                              
                              if(once>1 && count>2){
                                 // console.log("**")
                                break
                            }
                          }
                          
                                     
                                 }
                                //console.log(str)
                              //  console.log(totalData[item]['key'])
                                xldata[0][totalData[item]['key']]=str
                               // console.log(xldata[0][totalData[item]['key']])
                                
                                 tep =1
                                 
                             }
                             else{
                                  
                             tep =1
                             
                             //console.log(response[res])
                            // totalData[item]['ocrRes']=response[res]['RecText']
                           //  totalData[item]['Confidence']=response[res]['Confidence']
                             xldata[0][totalData[item]['key']]=response[res]['RecText']
                             //console.log(totalData[item])
                             
                            // console.log(response.length)
                             response.splice(res, 1)
                            // console.log(response.length)
                             }
                        
                         }
                         
                     }
                     if(tep==0){
                        // totalData[item]['ocrRes']='-'
                            // totalData[item]['Confidence']=100
                             xldata[0][totalData[item]['key']]='-'
                         
                     }
                    //break;
                    //console.log(item)
                    if(item==totalData.length-1){
                      done=1
                    }
                    
                 }
         
    //console.log(xldata)             
                    
                    if(!backButton.current && done==1){

                      timeOut.current=false
                      clearTimeout(myTimeout);
                      navigation.navigate('ImageDisplay', { path:img,tdata:totalData,Excelfilename:filename,tempImg:img,xldata:xldata,imgsize:{h:height,w:width},new:true});
                      setLoading(false)
                      
                    }
                    else if(backButton.current){
                      clearTimeout(myTimeout);
                      


                    }
                    // else{
                    //   setLoading(false)
                    //  }  

                 }).catch((err)=>
              {
                clearTimeout(myTimeout);

              
              console.log(err)
                setLoading(false)
           if(!backButton.current){
            showMessage({
              message: "Something went wrong ",
              description: `please try again 011`,
              type: 'danger',
              hideStatusBar:true,
              duration:2200
          });
           }
              }
                 )
                })
                  // console.log(outputTesrac)
                  console.log("**")
            //  });
                    // })
                    // .catch((err) => {
                    //   setLoading(false)
                    //   showMessage({
                    //   //  message: "Something went wrong ",
                    //   message: err.toString(),
                    //     description: `please try again 010`,
                    //     type: 'danger',
                    //     hideStatusBar:true,
                    //     duration:2200
                    // });
                    //   // Oops, something went wrong. Check that the filename is correct and
                    //   // inspect err to get more details.
                    //   console.log(err)
                    // });
 
      }
        
      }
    }
   


    

        if(isLoading1){



          return(
            
            <View style={styles.load}>
                <View style={{flex:1}}>
                  <View style={{justifyContent:"center",alignItems:'center',marginLeft:100}}>
           <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{height:hp('50%'),width:wp('100%')}}/>

           </View>
          </View>
          <Modal isVisible={timeoutModal}
                                      
                                      transparent={true}
                                     // onTouchCancel={true}
                                      animationIn='zoomIn'
                                      animationOut='zoomOut'
                                     // backdropColor='#646464'

                                     //onBackButtonPress={()=>setbackbuttonPopup(false)}
                                      
                                     onRequestClose={() => {
                                       
                                      settimeoutModal(false)
                                      }}

                                      onTouchCancel={true}
                                      
                                  >
                                   <View style={{flexDirection:"row",justifyContent:"center",}}>
                                     
                                     <View style={{ backgroundColor:'#d1cdcd' , height:hp('18%'),width:wp('80%'),justifyContent:'center',justifyContent:'space-evenly',borderRadius:7,borderTopLeftRadius:7,borderTopRightRadius:7}}>
                                    
                             {/* <Text style={{fontWeight:'bold',color:'red',marginLeft:50,textAlign:'left'}} >Your Last scan is not saved</Text> */}
                             <Text style={{fontWeight:'bold',marginLeft:13,color:'black',padding:20,textAlign:'left'}} >It is taking long time do u want to wait or stop</Text>


                                      <View style={{flexDirection:"row",justifyContent:'space-evenly',marginTop:25}}>
                                      <TouchableOpacity title="cancel" onPress={()=>{
                                        console.log("cancel")
                                        handleBackButtonClick()
                                       
                                        
                                      }} 
                                      color='#ebebeb'><Text style={{color:'red'}}>STOP</Text></TouchableOpacity>
                                      <TouchableOpacity title="cancel" onPress={()=>{
                                        console.log("cancel")
                                        settimeoutModal(false)
                                       
                                        
                                      }} 
                                      color='#ebebeb'><Text style={{color:'green'}}>WAIT</Text></TouchableOpacity>
                                      </View>
                           </View>
                               

                               
                                   </View>
                               
                             </Modal>
            </View>

         
          )
        }
      else {  
        if(device == null) return
        
    return(
      <><StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle='dark-content'
        hidden={false} />
        <View style={styles.camera}>
         <Reanimated.View style={StyleSheet.absoluteFill}>
    <ReanimatedCamera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      photo={true}
      flash = {false}
      ref={camera}
    ></ReanimatedCamera>
      </Reanimated.View>

      <View style={{ flexDirection: 'row',bottom:0,position:'absolute' }}>

<View style={{ flex: 0.25, alignItems: 'center' ,justifyContent:'center',}}>
  <FlashComp></FlashComp>
  </View>

  <View style={{ flex: 0.50, alignItems: 'center'  ,justifyContent:'flex-start',marginBottom:25 }}>
    
   

      <IconCam name='camera-iris' color={'white'} size={80} onPress={captureHandels3} />
    
  </View>
  <View style={{ flex: 0.25, alignItems: 'center' ,justifyContent:'center',}}>
    {/* <Svgimg1 height={hp('10%')} width={wp('10%')} onPress={openGallarys3} /> */}
    <IconGal name='images' color={'white'} size={30} onPress={openGallarys3} />

  </View>

</View>

        </View></>
    )
      }
  }
 
  const styles= StyleSheet.create({
  
    camera: {
    flex:1,
    
  },
  preview:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:"center",
    flexDirection:'row'
    


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
  
  
});



const wimgb64 ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAAEsCAMAAABgwwj8AAAAP1BMVEX9/f39/vn8/f39/fv9/f/5/vz9/vr0/f74/f3y/v71/f/2/v3t/v3w/v7z/vz2//v++vP5+PXo/v/r/P//+fR8p2CTAAABIUlEQVR4nO3Yy27CMBBAUezYsfMCGvr/31pAqmCBBJs2sXTOMqurcTxScjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBfSVsHfCTnGrdu+ESajm2ExlLq1g0fObUSOg5jaeLor6G1hVsfx6E0EBpTHsYpb53xXkz12MA8r0s0nhpZ94fYwLnftXDuAAAA8G9SjDmXKYe9fzHHPJYynPrQbV3yRqzLMq/5HPrfJ13f7y86xrHM6+XydX60dWF/0035OMzzupbz3kPTuCzrfDl9P+JC6EPYtOqFVMsyL0MJT0MMN1tGvRLrVOtxys93/jrPx8XajXj/gdt1zy9lv8POdIjptujT07ZP1+q9L38AAIDW/ABivwT1SNSFJgAAAABJRU5ErkJggg=="
const bimg64='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCALcAXMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k='