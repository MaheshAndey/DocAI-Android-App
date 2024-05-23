import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import Loading from '../loading'
import { useCameraDevices,Camera } from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import { ActivityIndicator, Button } from '@react-native-material/core';

export default function App() {
  
  const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

  const devices = useCameraDevices()
  const device = devices.back

  const permission = async()=>{
    const newCameraPermission = await Camera.requestCameraPermission()
  }
  permission()

  if (device == null) return <ActivityIndicator></ActivityIndicator>
  return (<>
    <Reanimated.View style={StyleSheet.absoluteFill}>
    <ReanimatedCamera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}

      
    ></ReanimatedCamera>
      </Reanimated.View>

     <Button title={'jgr'} width={200}></Button>
     </>
     
  )
}