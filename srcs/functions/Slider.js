import  React ,{useState,useEffect}from 'react';
import {
  Text, 
  View,
  Image,
  SafeAreaView, 
  Pressable,
} from 'react-native';
import Carousel2 from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from "react-native-gesture-handler";


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from "react-native-vector-icons/AntDesign";
import TempBoxwithLoading from './tempBox';

export default class App extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
         carouselItems: props.tepData,
         carouselFunction : props.fun
      };
      
      

      
    }

    _renderItem({item,index}){
        
        
        return (
          <Pressable onPress={()=>{console.log("j")}}>
            <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: hp('50%'),
             // padding: 50,
              marginLeft: 25,
              marginRight: 25, }}>

            <Image source={{uri:item['templateImage']}} style={{ width: wp('65%'), height: hp('50%')}}  resizeMode="stretch" />

            <Text style={{fontSize: 30}}>{item["templateName"]}</Text>
            {/* <Text>{item.text}</Text> */}
          </View>
          </Pressable>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'none',marginBottom:70 }}>
            <GestureHandlerRootView>
                <Carousel2
                 mode={"parallax"}
                 width={wp('100%')}
                 height={hp('100%')}
                 autoPlay={false}
                 autoFillData={false}
                 loop={false}
                 
                 data={this.state.carouselItems}
                //data={[...new Array(6).keys()]}
                 scrollAnimationDuration={300}
                 onSnapToItem={(index) => console.log('current index:', index)}
                  renderItem={
                    
                    ({item,index})=>{
                      var imguri=''

                    //  const [imgLoading ,setimgLoading]=useState(true);
                    //  const [imguri,setimguri]=useState('')
                     
                    if(item['imguri64']=="AddTemplete"){
                      return(
                        <Pressable // onPress={()=>this.state.carouselFunction(item)} 
                        >
                                <View style={{
                                   backgroundColor:'#7FBCD2',
                                  borderRadius: 12,
                                  height: hp('70%'),
                                  width:wp('99%'),
                                  // padding: 50,
                                  // marginLeft: 5,
                                 //  marginRight: 25,
                                   alignItems:'center',
                                   justifyContent:'center',
                                  // margin:10
                                   }}>
                                    <View>
                                    <Icon name="pluscircle" size={100} color='white' style={{marginRight:0}}></Icon>

                                    </View>

                    
                                 <Text style={{fontSize: 18,color:'white',marginTop:10,fontFamily:'Courier-BoldOblique'}}>Add New Template</Text>
                                 {/* <Text>{item.text}</Text> */}
                               </View>
                               </Pressable>
                     
            
                       )

                    }
                    else{

                      return(
                        <Pressable //onPress={()=>this.state.carouselFunction(item) } 
                        >
                               <TempBoxwithLoading props={{item:item,fun:this.state.carouselFunction}}>

                               </TempBoxwithLoading>
                               
                               </Pressable>
                     
            
                       )

                    }
                        
                    

                       
                           
                          


                    }



                  }
                  />
                  </GestureHandlerRootView>
          
          </SafeAreaView>
        );
    }
}

