import React from "react";
import { Text } from "react-native";
import { Pressable } from "@react-native-material/core";
import { View } from "react-native-animatable";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const App = () => (
  <View style={{width:wp('100%'),height:hp('10%'),backgroundColor:'green',flexDirection:'row',justifyContent:'space-evenly',alignSelf:'center'}}>
    <Pressable style={{  backgroundColor: "skyblue" }} >
  <Text>manidddddd</Text>
  
  </Pressable>
  <Pressable style={{  backgroundColor: "skyblue" }} >
  <Text>manssssi</Text>
  
  </Pressable>
  <Pressable style={{  backgroundColor: "skyblue" }} >
  <Text>manisss</Text>
  
  </Pressable>
  <Pressable style={{  backgroundColor: "skyblue" }} >
  <Text>mani</Text>
  
  </Pressable>
  </View>
  
);

export default App;