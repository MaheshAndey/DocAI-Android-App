import { View, Text ,Image,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import RNPhotoManipulator from 'react-native-photo-manipulator';
import ImageResizer from 'react-native-image-resizer';
import ImageSize from 'react-native-image-size'
import ImageEditor from "@react-native-community/image-editor";

export default function Screen_2(imguri) {
  const img = 'file:///data/user/0/com.docai/cache/119b19b5-397d-4276-824b-d4aed1392f1e.jpg'
  const [reqImg,setReqImg]=useState(img)
  useEffect(()=>{

    //d80bd13d-ba47-4f17-8159-e8f17c181691.jpg
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
      console.log(width,height)
      const cropImagesList = []

      var totalHeights = 0
      var totalWidths = 0
      var gap=0

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
            
              offset: {x:(data['coordinates']["x"]*width)-(((data['coordinates']["w"]*width)/100)*1) , y:(data['coordinates']["y"]*height)-(((data['coordinates']["h"]*height)/100)*5)},
              size: {width: (data['coordinates']["w"]*width)+(((data['coordinates']["w"]*width)/100)*5), height: (data['coordinates']["h"]*height)+(((data['coordinates']["h"]*height)/100)*30)},
              displaySize: {width:(data['coordinates']["w"]*width) , height: (data['coordinates']["h"]*height)},
             // resizeMode: 'contain'  // | 'cover' | 'stretch',
            }
            if(Math.floor(cropData['size'].width)>totalWidths){
     
              totalWidths=Math.floor(cropData['size'].width)
              
            }
       console.log(cropData.offset)
      
          ImageEditor.cropImage(img, cropData,data).then(url => {
            //console.log(totalHeights)

             //console.log("Cropped image uri===", url,cropData);
             const cropItem={}
             cropItem["operation"]= "overlay"
             cropItem['overlay']=url;
            // cropItem['position']={x:300,y:(totalHeights)}
            cropItem['position']={x:cropData.offset.x+gap,y:(cropData.offset.y)}
           // gap=gap+30
           


             const cropTextItem={}
             cropTextItem["operation"]= "text"
            //  cropTextItem['overlay']=url;
            //cropTextItem['options']={ position: {x:200,y:(totalHeights)+(Math.floor(cropData['size'].height)/3)},text:"#",textSize: 45, color: "black"}
            

            //    { operation: "text", options: { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" } },

            // { position: { x: 50, y: 30 }, text: "Text 1", textSize: 30, color: "#000000" },
             //console.log(cropItem)
             cropImagesList.push(cropItem)
             //cropImagesList.push(cropTextItem)

            totalHeights=totalHeights+(Math.floor(cropData['size'].height))

            if(cropImagesList.length==length){
             // console.log("cropImagesList : ",cropImagesList[1])
              Action(height,width,cropImagesList)
             // console.log(totalHeights,totalWidths+500)
            }  
          
            // navigation.navigate('ImageDisplay', { path:img,tdata:totalData});
           }).catch(err=>{
             console.log(err,'======')
            
            // navigation.navigate('Camera',{tempName:totalData[0]["templateName"],img_temp:tempImg,filename:excelfilename,keydata:totalData})
     
           })
      
      }
 
     })
 
 }
 
  },[])
   


const Action=(height,width,keyList)=>{
  // console.log(keyList)
  
          ImageResizer.createResizedImage(
            reqImageUri,
            width,
            height,
            'JPEG',
                  100,
                  0,
                  undefined,
                  true,
                  {mode:"stretch"}
          )
      .then((response) => {
        // Alert.alert(
        //   response.toString(),
        //   "My Alert Msg",
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => console.log("Cancel Pressed"),
        //       style: "cancel"
        //     },
        //     { text: "OK", onPress: () => console.log("OK Pressed") }
        //   ]
        // );
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
        console.log(response)
              const cropRegion = { x: 0, y: 0, height: height, width: width };
              const image =response.uri ;
              const targetSize = { height: height, width: width };
     // const overlay = "file:///data/user/0/com.docai/cache/RNPM_8085042799156735483.jpg";
      const position = { x: 5, y: 20 };

        RNPhotoManipulator.batch(image,keyList, cropRegion).then(path => {
            console.log(`Result image path: ${path}`);
            const file = {
              uri: path,
              name: 'demo_res_342.png',
              type: "image/png"
            }
             
            const options = {
             // keyPrefix: "testImages/",
              bucket: "sift-bucket-1",  
              region: "ap-south-1",
              accessKey: "AKIAWEVT3WY3P6OZOA54",
              secretKey: "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",
              successActionStatus: 201       
            }

            // RNS3.put(file, options).then(response => {
            //   //console.log("rns3.put-----", isLoading1)
            //  // abortController.current = new AbortController();
        
            //  // console.log("backbutton",backButton)
              
            //   if (response.status == 201 ){
            //     //setdoneS3(true)
                
            //     console.log(` is successfuly uploaded to s3`);}
            //     else{
            //       console.log("failed")
            //     }
            //   })

            setReqImg(path)
            // Alert.alert(
            //   path,
            //   "My Alert Msg",
            //   [
            //     {
            //       text: "Cancel",
            //       onPress: () => console.log("Cancel Pressed"),
            //       style: "cancel"
            //     },
            //     { text: "OK", onPress: () => console.log("OK Pressed") }
            //   ]
            // );
        }).catch((err) => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          console.log(err)
          Alert.alert(
            err.toString(),
            "My Alert Msg",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        });
        ;
              })
              .catch((err) => {
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
                console.log(err)
                Alert.alert(
                  err.toString(),
                  "My Alert Msg___",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              });
   
  


}
  return (
    <View style={{backgroundColor:'black'}}>
      <Text>{reqImg}</Text>
      <Image source={{uri:'file:///data/user/0/com.docai/cache/119b19b5-397d-4276-824b-d4aed1392f1e.jpg'}} style={{width: '100%', height: '100%',resizeMode:'center',alignSelf:'center',marginRight:30}}>
                        </Image>
    </View>
  )
}


const totalData = [{"__v": 0, "_id": "6336b862257f65d6331bc77f", "coordinates": {"h": 0.04126875305175781, "w": 0.29206474503978125, "x": 0.17369319324533905, "y": 0.20492066955566407}, "key": "Name", "regex": "String", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b862257f65d6331bc781", "coordinates": {"h": 0.0256151123046875, "w": 0.12488285396762208, "x": 0.36706020303930026, "y": 0.5137247314453125}, "key": "Q1b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b862257f65d6331bc783", "coordinates": {"h": 0.02276898193359375, "w": 0.12286862901821258, "x": 0.24419157402108768, "y": 0.53933984375}, "key": "Q2a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc785", "coordinates": {"h": 0.0341534423828125, "w": 0.2719223335627875, "x": 0.1877928650809448, "y": 0.2703814392089844}, "key": "Subject", "regex": "String", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc787", "coordinates": {"h": 0.0199228515625, "w": 0.11884015752167375, "x": 0.37108865293811927, "y": 0.5407628784179688}, "key": "Q2b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc789", "coordinates": {"h": 0.01992279052734375, "w": 0.12286862901821258, "x": 0.24419157402108768, "y": 0.5621088256835938}, "key": "Q3a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc78d", "coordinates": {"h": 0.04126875305175781, "w": 0.4189618563533926, "x": 0.5402848013562677, "y": 0.20634373474121093}, "key": "RegNo", "regex": "String", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc78f", "coordinates": {"h": 0.0199228515625, "w": 0.11682591097454441, "x": 0.37108865293811927, "y": 0.5606857299804687}, "key": "Q3b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc78b", "coordinates": {"h": 0.0241920166015625, "w": 0.12488287556534192, "x": 0.24217732747395834, "y": 0.5151478271484375}, "key": "Q1a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc791", "coordinates": {"h": 0.02276898193359375, "w": 0.12085438247108324, "x": 0.24419157402108768, "y": 0.5806085815429688}, "key": "Q4a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc793", "coordinates": {"h": 0.02134588623046875, "w": 0.12286860742049274, "x": 0.36706020303930026, "y": 0.5806085815429688}, "key": "Q4b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc795", "coordinates": {"h": 0.0199228515625, "w": 0.08862650251017339, "x": 0.7396945183950372, "y": 0.5151478271484375}, "key": "Q1total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc797", "coordinates": {"h": 0.0199228515625, "w": 0.12085438247108324, "x": 0.24419157402108768, "y": 0.6019544677734375}, "key": "Q5a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc799", "coordinates": {"h": 0.02276898193359375, "w": 0.12085436087336342, "x": 0.3690744495864296, "y": 0.6005314331054687}, "key": "Q5b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc79b", "coordinates": {"h": 0.0256151123046875, "w": 0.12488285396762208, "x": 0.36706020303930026, "y": 0.6218773193359375}, "key": "Q6b", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc79d", "coordinates": {"h": 0.0241920166015625, "w": 0.12488287556534192, "x": 0.24419157402108768, "y": 0.6233004150390625}, "key": "Q6a", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc79f", "coordinates": {"h": 0.021345947265625, "w": 0.09265499560443206, "x": 0.7356660253007785, "y": 0.537916748046875}, "key": "Q2total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7a1", "coordinates": {"h": 0.02134588623046875, "w": 0.09265499560443206, "x": 0.7356660253007785, "y": 0.5592626953125}, "key": "Q3total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7a3", "coordinates": {"h": 0.02134588623046875, "w": 0.08862658890105272, "x": 0.7376802286524682, "y": 0.5806085815429688}, "key": "Q4total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7a5", "coordinates": {"h": 0.0199228515625, "w": 0.08862650251017339, "x": 0.7396945183950372, "y": 0.6019544677734375}, "key": "Q5total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7a7", "coordinates": {"h": 0.0256151123046875, "w": 0.0906407922527424, "x": 0.7376802286524682, "y": 0.6218773193359375}, "key": "Q6total", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7a9", "coordinates": {"h": 0.04553790283203125, "w": 0.1107831713331564, "x": 0.8303353106477795, "y": 0.5151478271484375}, "key": "Q1Q2best", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7ab", "coordinates": {"h": 0.04269183349609375, "w": 0.11279737468484607, "x": 0.8303353106477795, "y": 0.5606857299804687}, "key": "Q3Q4best", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7ad", "coordinates": {"h": 0.0441148681640625, "w": 0.1107831713331564, "x": 0.8323495139994692, "y": 0.6019544677734375}, "key": "Q5Q6best", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7af", "coordinates": {"h": 0.0355765380859375, "w": 0.11279746107572541, "x": 0.8283210209052105, "y": 0.6901842041015624}, "key": "TotalMarks", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}, {"__v": 0, "_id": "6336b863257f65d6331bc7b1", "coordinates": {"h": 0.0355765380859375, "w": 0.11481166442741507, "x": 0.8263068175535209, "y": 0.724337646484375}, "key": "TotalMarks(20)", "regex": "Number", "templateName": "MID-TEMPLATE-(autonomous)"}]