import { View, Text,Pressable ,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  MyCarousel  from '../functions/Slider';
import Icon from "react-native-vector-icons/AntDesign";
import { showMessage, hideMessage } from "react-native-flash-message";

// const TemplateBox =  (propss)=> {

//     const [imgLoading ,setimgLoading]=useState(true);
//     const [imguri,setimguri]=useState(' ')
//     const [tempList,settempList]=useState([{"imguri64":"AddTemplete"}]);

//     propss.tepData.map((item)=>{
//       useEffect(()=>{
//         fetch(`https://sift-bucket-1.s3.ap-south-1.amazonaws.com/Reference+images/${item["NameofTemplate"]}.jpeg`)
//                     .then((res)=>res.text())
//                     .then((tres)=>{
//                        // console.log((tres.includes("The specified key does not exist")))
                       

//                         if(!(tres.includes("The specified key does not exist"))){
//                             //console.log(tres)
//                             console.log(item["NameofTemplate"])
//                          // setimguri(tres);
//                          // setimgLoading(false)
//                           item["imguri64"]=tres
//                         if(tempList.length>1){
//                           //const items = [1, 2, 3, 4, 5]
//                           console.log("*")

//                           const insert = (arr, index, ...newItems) => [
//                             // part of the array before the specified index
//                             ...arr.slice(0, index),
                            
//                             // inserted items
//                             ...newItems,
//                             // part of the array after the specified index
//                             ...arr.slice(index)
//                           ]

//                           tempList = insert(tempList, -1, item)

//                           settempList(tempList) 
//                           console.log("x ",tempList.length)




//                         }
//                         else{

//                           settempList(tempList.unshift(item))
//                         }

//                         }
//                         else{
//                             //setimguri(null)
//                         }
                      
                     
                      
//                     })
//                     .catch((err)=>{
//                      // if(err.toString() =='[TypeError: Network request failed]'){
//                         console.log(err)
                   
//                     })


//       },[])

//     })

    // if(tempList.length<=0){
    //   return(

    //     <Spinner
    //           visible={tempList.length<=0}
    //           textContent={'Loading Templates..'}
    //           textStyle={{color: '#FFF'}}
    //           />
    //   )
    // }
   
      
    //  return(
    //   <MyCarousel tepData={tempList} fun={propss.fun}></MyCarousel>
    //  )
    
         

    // if(imgLoading && imguri!=null){
    //     return(
    //         <Text>Loading</Text>
    //     )
    // }
    // else if(imguri!=null){
    //     return (
    //         <Pressable  >
    //         <View style={{
    //           backgroundColor:'#7FBCD2',
    //           borderRadius: 5,
    //           height: hp('73%'),
    //           width:wp('75%'),
    //          // padding: 50,
    //          // marginLeft: 5,
    //         //  marginRight: 25,
    //           alignItems:'center',
    //           marginTop:10
    //           }}>

    //         <Image source={{uri:imguri}} style={{ width: wp('75%'), height: hp('67%')}}  resizeMode="stretch" />

    //         <Text style={{fontSize: 18,color:'white'}}>Template Name : {propss.item["NameofTemplate"]}</Text>
    //         {/* <Text>{item.text}</Text> */}
    //       </View>
    //       </Pressable>
    //     )

   // }
   
//}



// import { View, Text } from 'react-native'
// import React from 'react'
import animLoading from '../animations/template-skeleton-loading-image-tile.json'
import Lottie from 'lottie-react-native';

const  TempBoxwithLoading =(props)=> {
  const [loading,setLoading]= useState(true)
  const item = props.props.item
  const onclickfunction = props.props.fun

  
  const Note = ()=>{
      return(
        <View style={{ backgroundColor:'#ebebeb' , height:hp('6%'),width:wp('75%'),justifyContent:'center',justifyContent:'space-evenly',marginTop:20}}>
        {/* <IconNote name="md-alert-circle-outline" size={20} color='black' style={{marginRight:0}}></IconNote> */}

          <Text style={{fontWeight:'bold',color:'black',marginLeft:10}} >Note : You need to make a Request by  Providing  a Scaned image of the Template </Text>
        </View>
      )
    
   }

  useEffect(()=>{

   if(item["NameofTemplate"]=='AddCustumTemplate'){
    setLoading(false)


   }
   else{
    fetch(`https://sift-bucket-1.s3.ap-south-1.amazonaws.com/Reference+images/${item["NameofTemplate"]}.jpeg`)
    .then((res)=>res.text())
    .then((tres)=>{
       // console.log((tres.includes("The specified key does not exist")))
       

        if(!(tres.includes("The specified key does not exist"))){
            //console.log(tres)
            console.log(item["NameofTemplate"])
         // setimguri(tres);
         // setimgLoading(false)
          item["imguri64"]=tres
          setLoading(false)
       

        }
        else{
            //setimguri(null)
        }
      
     
      
    })
    .catch((err)=>{
     // if(err.toString() =='[TypeError: Network request failed]'){
        console.log(err)
   
    })
   }


  },[])

  if(loading){

    return (
      <Pressable onPress={()=>{
        showMessage({
          message: "Please wait till the Template load",
          description: ``,
          type: "success",
         // autoHide:false,
          backgroundColor: "#020302",
          style:{flex:1,marginBottom:30,justifyContent:'center'
        ,elevation:10,
        shadowColor:'black',},
        position:"bottom",
        duration:1000
        
        });
      }}>
        <View style={{
      backgroundColor:'white',
     borderRadius: 12,
     height: hp('80%'),
     width:wp('99%'),
     elevation:15,
     shadowColor:'black',
     // padding: 50,
     // marginLeft: 5,
    //  marginRight: 25,
      alignItems:'center',
      justifyContent:'center'
    // marginTop:10
      }}>
        <View style={{ flex:1, justifyContent:"center",alignItems:'center'}} >
                  <View style={{justifyContent:"center",alignItems:'center'}}>
           <Lottie source={animLoading} autoPlay loop resizeMode="contain" style={{width: wp('45%'), height: hp('45%')}}/>
           </View>
           


    <Text style={{fontSize: 20,color:'black',fontFamily:'Roboto',marginTop:30,fontWeight:'bold'}}> {item["NameofTemplate"]}</Text>
    {/* <Text>{item.text}</Text> */}
  </View>
  </View>
      </Pressable>
      
    )
  }
  else if( item["NameofTemplate"]=='AddCustumTemplate'){
    return(
      <Pressable onPress={()=>onclickfunction(item)}>

      <View style={{
        backgroundColor:'white',
       borderRadius: 12,
       height: hp('80%'),
       width:wp('99%'),
       // padding: 50,
       // marginLeft: 5,
      //  marginRight: 25,
        alignItems:'center',
        justifyContent:'center',
        elevation:15,
        shadowColor:'black'
      // marginTop:10,
        }}>
          <View style={{ flex:1, justifyContent:"center",alignItems:'center'}} >
            
                    <View style={{justifyContent:"center",alignItems:'center'}}>
             </View>

             
             <Icon name="pluscircle" size={100} color='black' style={{marginRight:0}}></Icon>
  
   
      <Text style={{fontSize: 20,color:'black',fontFamily:'Roboto',marginTop:30,fontWeight:'bold'}}> Add Your Own Template</Text>
      {/* <Text>{item.text}</Text> */}
    </View>
    </View>
    </Pressable>


    )

  }
  else{
    return(
      <Pressable onPress={()=>onclickfunction(item)}>
        <View style={{
        backgroundColor:'white',
       borderRadius: 12,
       height: hp('80%'),
       width:wp('99%'),
       // padding: 50,
       // marginLeft: 5,
      //  marginRight: 25,
        alignItems:'center',
      // marginTop:10,
      elevation:15,
     // shadowColor:'black'
        }}>
  
     <Image source={{uri:item['imguri64']}} style={{ width: wp('93%'), height: hp('67%'),marginTop:10}}  resizeMode="stretch" />
  
      <Text style={{fontSize: 20,color:'black',fontFamily:'Roboto',marginTop:30,fontWeight:'bold'}}> {item["NameofTemplate"]}</Text>
      {/* <Text>{item.text}</Text> */}
    </View>
      </Pressable>
      
    )
  }
}

export default TempBoxwithLoading;


