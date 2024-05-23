// import React, { Component } from 'react'
// import { StyleSheet, View, Alert ,Button,Text} from 'react-native'

// import CustomButton from './srcs/CustomButton';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TextExample from './srcs/screens/login';
// import Tempchoosen from './srcs/screens/choosetemp';
// import Dte from './srcs/screens/dtemp';
// import Nearer from './srcs/screens/preview';
// import Edgs from './srcs/screens/xl';
// import {LogBox} from "react-native";
// import ImageDisplay from './srcs/ImageDisplay';
// import CollectImage from './srcs/CollectImage';
// import ImgDis from './srcs/screens/test_src/imageDis'
// import Loading from './srcs/functions/loading'
// import EditPopup from './srcs/functions/popup'
// LogBox.ignoreLogs([
// "exported from 'deprecated-react-native-prop-types'.",
// ])


// const Stack = createNativeStackNavigator();

// export default MyStack = () => {
  
   
//   return (
//     <NavigationContainer >
//       <Stack.Navigator screenOptions={{ headerShown: false }}  >
        
      

//         <Stack.Screen name="login" component={TextExample} />
//         <Stack.Screen name="ChooseTemplates" component={Tempchoosen} />
//         <Stack.Screen name="DefaultTemplates" component={Dte} />
//         <Stack.Screen name="Preview" component={Nearer} />
//         <Stack.Screen name="Edging" component={Edgs} />
//         <Stack.Screen name="CollectImage" component={CollectImage} />

        
       
//         <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
//         <Stack.Screen name="ImageDis" component={ImgDis} />
//         <Stack.Screen name="Loading" component={Loading} />
//         <Stack.Screen name="EditPopup" component={EditPopup} />


//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };




import React ,{ Component ,useState,useEffect}from 'react';
import { View ,Text, Button, MaskedViewBase} from 'react-native';
import auth from '@react-native-firebase/auth';

import filee from "./android/app/google-services.json"
import MyStack from './navStack'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  GDrive,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";


const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo); // just to see if things are working
    console.log("Successful login");
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log("sign in cancelled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log("in progress ");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log("play services not available");
    } else {
      // some other error happened
      console.log("some error happened");
      console.log(error);
    }
  }
};

const App = () => {

  
   useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive'], // We want   read and write access
      webClientId: "356861984876-19gl797bcp520hljb119g54pu405d0i7.apps.googleusercontent.com", // REPLACE WITH YOUR ACTUAL  CLIENT ID !
      offlineAccess: true
 });
   })
 
     
  
  return (
          <View>
            
            <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          
        />
          </View>
        )
  };

  


//export default App;

function MainApp() {
  

  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.appdata',
        		'https://www.googleapis.com/auth/drive.file',], // We want   read and write access
      webClientId: "356861984876-19gl797bcp520hljb119g54pu405d0i7.apps.googleusercontent.com", // REPLACE WITH YOUR ACTUAL  CLIENT ID !
      offlineAccess: true
      });
        })
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    console.log("user not loged")
    return (
      <View>
            
              <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => onGoogleButtonPress().then(() =>{ console.log('Signed in with Google!');
         
          
          })}
            
          />
    </View>
    );
  }
   else{
    console.log("user already loged")
        return (
          
          <View>
            <Text>Welcome {user.email}</Text>
            <Button title='log out' onPress={logOut} >

            </Button>
            <Button title='write' onPress={createFolder} >

            </Button>
          </View>
          
        );
   }
}

export default MainApp;

async function onGoogleButtonPress() {
 try{
   // Get the users ID token
   const { idToken } = await GoogleSignin.signIn();

   // Create a Google credential with the token
   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      //gdrive
        
        
      //  console.log(await gdrive.files.list());
        
                    
          
   // Sign-in the user with the credential
   return auth().signInWithCredential(googleCredential);
 }
 catch(err){
  console.log(err,"*-*")

 }
}


const logOut= async()=>{

  //fire base logout
   await auth()
  .signOut()
  .then(() => console.log('User signed out!'))
  .catch(() => console.log(' signed out fail'));


  //google logout
  try {
    await GoogleSignin.signOut();
    //setUser({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }


}


const writeDrive = async()=>{
  if (GDrive.isInitialized()) {
    //Google Drive is Initialized Now!!
    console.log("writing start")
                try {
                    const folderId = await GDrive.files.safeCreateFolder({
                      name: 'My Backups',
                    parents: ['root'],
                  }).catch((err)=>{
                    console.log(err)

                  })
    } catch(err) {
       console.log(err)
    }
   }
}

const drive_fun =async()=>{

  const gdrive = new GDrive();
  gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  
  console.log(await gdrive.files.list());

  // const id = (await gdrive.files.newMultipartUploader()
  
  //   .setData("mani", MimeTypes.TEXT)
  //   .setRequestBody({
  //     name: "file_drive_1.txt"
  //   })
  //   .execute()
  // ).id;

 // console.log(await gdrive.files.getBinary(id));
const idd = gdrive.files.safeCreateFolder({
  name:"my_app_folder",
  parents:['root']
}).then(
  console.log('k')
).catch((err)=>{console.log(err,"8")})

  // const folderId = await  GDrive.files.createIfNotExists({
  //   name: 'My__Backups',
  //   parents: ['root'],
  // }).then(
  //   console.log(folderId)
  // ).catch((err)=>{console.log(err,"8")})
  
//Now to upload it
//Put the folderId as parent for creating the file


}

const createFolder = async()=>{
     
  const gdrive = new GDrive();
  gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken
  
       
  //console.log(await gdrive.files.list());

  const id = (await gdrive.files.newMultipartUploader()
     .setData(filee, MimeTypes.JSON_UTF8)
    .setRequestBody({
      name: "s11fkrscsscwkfrddexaepldewde.json"
    })
    .execute()
  ).id;



}
  

//gdrive.files.createIfNotExist()


// import gapi from '@maxim_mazurok/gapi.client.drive-v3'

// const test = ()=>{
//   gapi.auth.authorize(
//     { client_id: '356861984876-19gl797bcp520hljb119g54pu405d0i7.apps.googleusercontent.com', scope: ['https://www.googleapis.com/auth/drive.appdata',
//     'https://www.googleapis.com/auth/drive.file',], immediate:true },
//     authResult => {
//       if (authResult && !authResult.error) {
//           /* handle successful authorization */
//           console.log("done")
//       } else {
//           /* handle authorization error */
//           console.log("no")
//       }
//   });
//}


 