import React, { Component, useEffect } from 'react'
import { StyleSheet, View, Alert ,Button,Text} from 'react-native'


import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './srcs/screens/login';

import Camera from './srcs/Camera';
import Dte from './srcs/screens/dtemp';
import {LogBox} from "react-native";
import ImageDisplay from './srcs/ImageDisplay';
import ImgDis from './srcs/screens/test_src/imageDis'
import Loading from './srcs/functions/loading'
import UserInfo from './srcs/screens/UserInfo'

import RNBootSplash from "react-native-bootsplash";
//demo
import screen1 from './srcs/functions/demo_screens/screen_1'
import screen2 from './srcs/functions/demo_screens/screen_2'
import screen4 from './srcs/functions/demo_screens/screen_4'
import screen3 from './srcs/functions/demo_screens/screen_3'

import screenc from './srcs/functions/demo_screens/screen_canvas'




LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])
import FlashMessage from "react-native-flash-message";


const Stack = createNativeStackNavigator();




export default function MyStack  () {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);

  
   
  return (
    <View style={{flex:1}}>
    <NavigationContainer  >
        {/* <CustomButton style={{backgroundColor:'#5364b2'}} title={'Done'}  ></CustomButton> */}
     
      
      <Stack.Navigator screenOptions={{ headerShown: false }}  >
        
      {/* <Stack.Screen name="screen2" component={screen3} />

       <Stack.Screen name="screen4" component={screen4} /> */}
       {/*
      <Stack.Screen name="screen3" component={screen3} />
       */}
{/* <Stack.Screen name="screen2" component={TemplatePreview} /> */}


        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Profile" component={UserInfo} options={{headerShown:true}} />
          <Stack.Screen name="DefaultTemplates" component={Dte} />
          
  
  
          
         
          <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
                    <Stack.Screen name="Camera" component={Camera}options={{animation:"slide_from_right"}}/>
                    <Stack.Screen name="Camera1" component={Camera} />


          <Stack.Screen name="ImageDis" component={ImgDis} />
          <Stack.Screen name="Loading" component={Loading}  />

  
  
        </Stack.Navigator>

        
     

    </NavigationContainer>
    <FlashMessage position="top" />
    </View>
    
  );
};






 