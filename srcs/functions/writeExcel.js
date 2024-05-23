import { Snackbar } from "@react-native-material/core";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

 import XLSX from 'xlsx';
 import * as FileSystem from  'react-native-fs'
 import React from 'react';
 import { Alert } from 'react-native';
 
 import auth from '@react-native-firebase/auth';

 import { showMessage, hideMessage } from "react-native-flash-message";
 import * as ScopedStorage from "react-native-scoped-storage"

 import AsyncStorage from '@react-native-async-storage/async-storage';

  const writeExcelToDrive = async(filename,templateName) => {
    

    
   
    var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;
  try{
 

          let bstr = await FileSystem.readFile(path, "ascii");
          bstr=JSON.parse(bstr)
          console.log("*.*",bstr)
         
     CreateEmptyExcel(bstr["scandata"],filename,templateName)   


  console.log("done")

  
  showMessage({
    message: "Success",
    description: `File saved Successfuly`,
    type: "success",
  });
  return 1;


  }
  catch(err){
    console.log(err)

    if(err=='AbortError: Aborted'){
     
      showMessage({
        message: "Success",
        description: `${filename} is Successfuly uploaded to drive`,
        type: "success",
      });

     // console.log('fun  ',1);

      return 1;
      
    }
    else{
     
      showMessage({
        message: "Network Problem",
        description: ``,
        type: 'danger',
      });

      return 0;

    }
    
    
  }

   

  }

   export {writeExcelToDrive};




  
const createFolder = async(data)=>{
  
     
//  const gdrive = new GDrive();
//  gdrive.fetchTimeout = 3000 
 
//  gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken
       
//   console.log(await gdrive.files.list());
//   console.log("0--")

//   //let fileContent = await FileSystem.readFile(data, "base64");
//  // console.log(data)
//   const id = (await gdrive.files.newMultipartUploader()
//   .setData(data, MimeTypes.BINARY)
//         .setIsBase64(true)
//         .setRequestBody({
//           name: "base64fssfssa.xlsx",
//         })
//   .execute()
// ).id;
//   console.log(id)



}
export {createFolder}



const CreateEmptyExcel = async(filename,templateName,navigation) => {

  var path = FileSystem.ExternalDirectoryPath + `/myscandata.json`;

  let bstr = await FileSystem.readFile(path, "ascii");
  bstr=JSON.parse(bstr)
  const data = bstr["scandata"] 

  

  if(templateName.toLowerCase().includes('mid') || templateName.toLowerCase().includes('sem')){

    // if(filename.toLowerCase().includes('mid') || filename.toLowerCase().includes('sem') ){
    //   const myHeader=['Reg','Name','Subject','Q1','Q2']
    // }
   
    data.unshift({'RegNo':'', 'Name':'', 'Subject':'','Q1a':'','Q1b':'','Q1total':'','Q2a':'','Q2b':'','Q2total':'','Q1Q2best':'','Q3a':'','Q3b':'','Q3total':'','Q4a':'','Q4b':'','Q4total':'','Q3Q4best':'','Q5a':'','Q5b':'','Q5total':'','Q6a':'','Q6b':'','Q6total':'','Q5Q6best':'','TotalMarks':'','TotalMarks(20)':''},
    {'RegNo':'', 'Name':'', 'Subject':'','Q1a':'','Q1b':'','Q1total':'','Q2a':'','Q2b':'','Q2total':'','Q1Q2best':'','Q3a':'','Q3b':'','Q3total':'','Q4a':'','Q4b':'','Q4total':'','Q3Q4best':'','Q5a':'','Q5b':'','Q5total':'','Q6a':'','Q6b':'','Q6total':'','Q5Q6best':'','TotalMarks':'','TotalMarks(20)':''}
        )

    const myHeader = ['RegNo', 'Name', 'Subject','Q1a','Q1b','Q1total','Q2a','Q2b','Q2total','Q1Q2best','Q3a','Q3b','Q3total','Q4a','Q4b','Q4total','Q3Q4best','Q5a','Q5b','Q5total','Q6a','Q6b','Q6total','Q5Q6best','TotalMarks','TotalMarks(20)']
    
      
    
    
      var ws = XLSX.utils.json_to_sheet(data,{header: myHeader,skipHeader: true});
              ws.A1={t: 's', v: 'RegNo'}
              ws.B1={t: 's', v: 'Name'}
              ws.C1={t: 's', v: 'Subject'}
              ws.D1={t: 's', v: 'Q1'}
              ws.G1={t: 's', v: 'Q2'}
              ws.J1={t: 's', v: 'Q1Q2Best'}

              ws.K1={t: 's', v: 'Q3'}
              ws.N1={t: 's', v: 'Q4'}
              ws.Q1={t: 's', v: 'Q3Q4Best'}

              ws.R1={t: 's', v: 'Q5'}
              ws.U1={t: 's', v: 'Q6'}
              ws.X1={t: 's', v: 'Q5Q6Best'}


              ws.Y1={t: 's', v: 'Total(30)'}
              ws.Z1={t: 's', v: 'Total(20)'}


              ws.D2={t: 's', v: 'a'}
              ws.E2={t: 's', v: 'b'}
              ws.F2={t: 's', v: 'Total'}

              ws.G2={t: 's', v: 'a'}
              ws.H2={t: 's', v: 'b'}
              ws.I2={t: 's', v: 'Total'}
              

              ws.K2={t: 's', v: 'a'}
              ws.L2={t: 's', v: 'b'}
              ws.M2={t: 's', v: 'Total'}

              ws.N2={t: 's', v: 'a'}
              ws.O2={t: 's', v: 'b'}
              ws.P2={t: 's', v: 'Total'}

              ws.R2={t: 's', v: 'a'}
              ws.S2={t: 's', v: 'b'}
              ws.T2={t: 's', v: 'Total'}

              ws.U2={t: 's', v: 'a'}
              ws.V2={t: 's', v: 'b'}
              ws.W2={t: 's', v: 'Total'}


              const merge = [
                       { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Reg
                            { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },  // Name
                            { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },   // Subject
                            { s: { r: 0, c: 3 }, e: { r: 0, c: 5 } }, //Q1
                            { s: { r: 0, c: 6 }, e: { r: 0, c: 8 } }, //Q2

                            { s: { r: 0, c: 10 }, e: { r: 0, c: 12 } }, //Q3
                            { s: { r: 0, c: 13 }, e: { r: 0, c: 15 } }, //Q4

                            { s: { r: 0, c: 17 }, e: { r: 0, c: 19 } }, //Q5
                            { s: { r: 0, c: 20 }, e: { r: 0, c: 22 } }, //Q6

                            { s: { r: 0, c: 9 }, e: { r: 1, c: 9 } }, //Q1Q2Best
                            { s: { r: 0, c: 16 }, e: { r: 1, c: 16 } }, //Q3Q4Best
                            { s: { r: 0, c: 23 }, e: { r: 1, c: 23 } }, //Q5Q6Best
                            { s: { r: 0, c: 24 }, e: { r: 1, c: 24 } }, //Total(30)
                            { s: { r: 0, c: 25 }, e: { r: 1, c: 25 } }, //TotaL(15)

        
                          ] // Measurements
              ws['!merges'] = merge;



              





      var wb = XLSX.utils.book_new();
     
      XLSX.utils.book_append_sheet(wb, ws, "sheet-1");
      
      const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
       });
       console.log('+++')
       console.log("wbout--ready")
      // console.log(FileSystem.ExternalDirectoryPath)
      // const uri = dist_dir + `/${filename}.xlsx`;
      // console.log(uri);
     // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
     const res = await ScopedStorage.createDocument("newFile.xlsx",'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', wbout,'base64')
     
    //  .then(res=>{
         console.log('Empty file created ',res)
         if(res!=null){
          await AsyncStorage.setItem('userMediaDirectoryMM',JSON.stringify(res));

      // const array  = await ScopedStorage.getPersistedUriPermissions()

    //    for (var index = 0; index < array.length; index++) {
    //     //console.log();
    //     await ScopedStorage.releasePersistableUriPermission(array[index])

    // }
        console.log(await ScopedStorage.getPersistedUriPermissions())
       navigation.navigate('login')

       bstr.save=true

       //console.log(bstr)

       FileSystem.writeFile(path, JSON.stringify(bstr), 'utf8')
       .then(async(success) => {
         console.log('saved variable stored in json');
        // // setexcelModalVisible(true)
        // const res =await CreateEmptyExcel(fname,totalData[0]["templateName"],navigation);
        // console.log("res res : ",res)
    
                     })
       .catch((err) => {
         console.log(err);
       });
        showMessage({
          message: "Success",
          description: `File saved Successfuly with name ${res.name}`,
          type: "success",
         // autoHide:false,
          backgroundColor: "#020302",
          style:{flex:1,marginBottom:30,justifyContent:'center'
        ,elevation:10,
        shadowColor:'black',},
        position:"bottom",
        duration:2300
        
        });
      }
    //     return 1;
    //   }).catch(err=>{
    //     console.log(err,'**');
    //     return 0;
    //   })

    
  }
  else{
   
      const myHeader=[]
  
  
    
      
    
      
     
    
      var ws = XLSX.utils.json_to_sheet(data,{header: myHeader});
      var wb = XLSX.utils.book_new();
     
      XLSX.utils.book_append_sheet(wb, ws, "sheet-1");
      
      const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
       });
       console.log('+++')
       console.log("wbout--ready")
      // console.log(FileSystem.ExternalDirectoryPath)
      const uri = FileSystem.DocumentDirectoryPath + `/${filename}.xlsx`;
      console.log(uri);
     // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
      FileSystem.writeFile(uri, wbout,'base64').then(res=>{
        console.log('Empty file created ')
      }).catch(err=>{
        console.log(err,'**');
      })
  }

  


 

   

  }

   export {CreateEmptyExcel};

const ccm = [{"Name":"A Lakshmi Saketha","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5401","Q3b":"-","Q1a":"4","Q4a":"2","Q4b":"4","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"6","Q5Q6best":"6","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"A.Purna parameswari ","Q1b":"-","Q2a":"-","Subject":"Competitive coding ","Q2b":"-","Q3a":"5","RegNo":"2OPA1A5402","Q3b":"3","Q1a":"4","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"6","Q3Q4best":"8","Q5Q6best":"4","TotalMarks":"28)","TotalMarks(20)":"-"},{"Name":"A.N.V.S.Mahesh ","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5403","Q3b":"-","Q1a":"6","Q4a":"4","Q4b":"4","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"8","Q5Q6best":"4","TotalMarks":"23","TotalMarks(20)":"-"},{"Name":"A.Pavan kumar","Q1b":"3","Q2a":"-","Subject":"competitive Coding","Q2b":"-","Q3a":"5","RegNo":"2OPA1A54O4","Q3b":"4","Q1a":"4","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"7","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"A. Raghunandan","Q1b":"4","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"5","RegNo":"20PA1A5405","Q3b":"5","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"10","Q5Q6best":"5","TotalMarks":"24","TotalMarks(20)":"-"},{"Name":"R. Shannukh Sri Nayak ","Q1b":"4","Q2a":"6","Subject":"Competitive coding ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5407","Q3b":"-","Q1a":"4","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"6","Q5Q6best":"4","TotalMarks":"18","TotalMarks(20)":"-"},{"Name":"B.Akshaya","Q1b":"5","Q2a":"-","Subject":"Competitive Codin ","Q2b":"-","Q3a":"4","RegNo":"2OPA1A5409","Q3b":"5","Q1a":"4","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"9","Q5Q6best":"4","TotalMarks":"22","TotalMarks(20)":"-"},{"Name":"D. VeeraBrahman ","Q1b":"-","Q2a":"5","Subject":"competizive coding","Q2b":"5","Q3a":"-","RegNo":"20PA1A5411","Q3b":"5","Q1a":"-","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"5","Q5Q6best":"3","TotalMarks":"18","TotalMarks(20)":"-"},{"Name":"D.Nikhil ","Q1b":"-","Q2a":"3","Subject":"Competitive Coding","Q2b":"4","Q3a":"-","RegNo":"20PA1A5412","Q3b":"-","Q1a":"-","Q4a":"4","Q4b":"1","Q1total":"-","Q5a":"-","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"7","Q3Q4best":"5","Q5Q6best":"-","TotalMarks":"12","TotalMarks(20)":"-"},{"Name":"G.Taraka Siva Rama Raju","Q1b":"4","Q2a":"-","Subject":"Competitive Coding ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5413","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"4","Q1total":"-","Q5a":"2","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"8","Q5Q6best":"2","TotalMarks":"19","TotalMarks(20)":"-"},{"Name":"G. Sundar","Q1b":"5","Q2a":"-","Subject":"C.C","Q2b":"-","Q3a":"5","RegNo":"2OPA1A5414","Q3b":"6","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"11","Q5Q6best":"4","TotalMarks":"25","TotalMarks(20)":"-"},{"Name":"G.Priyanka","Q1b":"4","Q2a":"-","Subject":"CC","Q2b":"-","Q3a":"-","RegNo":"20PA1A5415","Q3b":"-","Q1a":"6","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"10","Q5Q6best":"4","TotalMarks":"24","TotalMarks(20)":"-"},{"Name":"K Harshavardhan ","Q1b":"4","Q2a":"-","Subject":"competitive cading","Q2b":"","Q3a":"3","RegNo":"20PA1A5416","Q3b":"4","Q1a":"2","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"6","Q3Q4best":"7","Q5Q6best":"4","TotalMarks":"17","TotalMarks(20)":"-"},{"Name":"K.ch. S. Souanya Sri","Q1b":"5","Q2a":"-","Subject":"Competitive Codeng ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5417","Q3b":"-","Q1a":"4","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"10","Q5Q6best":"5","TotalMarks":"24","TotalMarks(20)":"-"},{"Name":"K.Srinuth","Q1b":"4","Q2a":"1","Subject":"Competitive Coding ","Q2b":"7","Q3a":"-","RegNo":"2op9l45418","Q3b":"-","Q1a":"6","Q4a":"3","Q4b":"3","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"6","Q5Q6best":"4","TotalMarks":"19","TotalMarks(20)":"-"},{"Name":"K.Vasanth Baby","Q1b":"-","Q2a":"5","Subject":"Love Wive edim ","Q2b":"5","Q3a":"-","RegNo":"20PA1A5419","Q3b":"-","Q1a":"-","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"-","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"-","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"-","TotalMarks(20)":"20"},{"Name":"K. . Trishaswee ","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5420","Q3b":"-","Q1a":"6","Q4a":"5","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"1)","Q3Q4best":"5","Q5Q6best":"5","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"K.Naga sai","Q1b":"-","Q2a":"4","Subject":"C.C","Q2b":"5","Q3a":"-","RegNo":"20PA1A5421","Q3b":"-","Q1a":"-","Q4a":"3","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"3","Q5Q6best":"4","TotalMarks":"16","TotalMarks(20)":"-"},{"Name":"K: Venkatesh","Q1b":"4","Q2a":"-","Subject":"Comparative Coding ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5422","Q3b":"-","Q1a":"5","Q4a":"3","Q4b":"2","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"5","Q5Q6best":"3","TotalMarks":"17","TotalMarks(20)":"-"},{"Name":"K.Nihith ","Q1b":"4","Q2a":"-","Subject":"CC","Q2b":"-","Q3a":"-","RegNo":"20PA1A5423","Q3b":"-","Q1a":"4","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"9","Q5Q6best":"3","TotalMarks":"20","TotalMarks(20)":"-"},{"Name":"k.yasaswini ","Q1b":"3","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5424","Q3b":"-","Q1a":"5","Q4a":"6","Q4b":"5","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"11","Q5Q6best":"4","TotalMarks":"23","TotalMarks(20)":"-"},{"Name":"K.Rohith Raj","Q1b":"4","Q2a":"-","Subject":"CompetitiveCoding ","Q2b":"-","Q3a":"5","RegNo":"20PA1A5425","Q3b":"5","Q1a":"3","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"7","Q3Q4best":"10","Q5Q6best":"4","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"K. Rahul","Q1b":"3","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"3,","RegNo":"20PA1A5426","Q3b":"4","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"5","Q3Q4best":"7","Q5Q6best":"3","TotalMarks":"16","TotalMarks(20)":"-"},{"Name":"L.Likith vijay Sai","Q1b":"3","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5427","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"2","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"6","Q5Q6best":"4","TotalMarks":"18","TotalMarks(20)":"-"},{"Name":"Mvishnuvardhon ","Q1b":"5","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5428","Q3b":"-","Q1a":"5","Q4a":"6","Q4b":"6","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"10","Q5Q6best":"5","TotalMarks":"25","TotalMarks(20)":"24"},{"Name":"Maddi. Sravya ","Q1b":"6","Q2a":"-","Subject":"competitive coding And ","Q2b":"-","Q3a":"3","RegNo":"20PA1A5429","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"1","Q3Q4best":"4","Q5Q6best":"5","TotalMarks":"20","TotalMarks(20)":"-"},{"Name":"M.N.V.Tejasri ","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"5","RegNo":"2OPA1A5430","Q3b":"5","Q1a":"5","Q4a":"4","Q4b":"4","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"26","TotalMarks(20)":"-"},{"Name":"N.L.S.VENKAT ","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5432","Q3b":"-","Q1a":"6","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"27","TotalMarks(20)":"-"},{"Name":"N.I.P Pravallika ","Q1b":"5","Q2a":"-","Subject":"Competitive coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5433","Q3b":"-","Q1a":"6","Q4a":"4","Q4b":"6","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"27.","TotalMarks(20)":"-"},{"Name":"N.S.R.G.Pavan kumar","Q1b":"5","Q2a":"-","Subject":"Competitive Cocling","Q2b":"-","Q3a":"5","RegNo":"2OPA1A5434","Q3b":"5","Q1a":"6","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"12","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"28","TotalMarks(20)":"-"},{"Name":"pNikhila","Q1b":"4","Q2a":"-","Subject":"Compatilive coding","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5435","Q3b":"-","Q1a":"6","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"26","TotalMarks(20)":"-"},{"Name":"Pankaj Kumar Yadav ","Q1b":"6","Q2a":"-","Subject":"Competitive coding ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5436","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"6","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"27.","TotalMarks(20)":"-"},{"Name":"Sai Soumya chittaory","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"3","RegNo":"20PA1A5437","Q3b":"3","Q1a":"6","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"27","TotalMarks(20)":"-"},{"Name":"P.Nitin. J.p.sai","Q1b":"6","Q2a":"5","Subject":"Competitive coding","Q2b":"6","Q3a":"-","RegNo":"20PA1A5438","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"9","Q5Q6best":"6","TotalMarks":"26","TotalMarks(20)":"-"},{"Name":"P. Jaideep","Q1b":"-","Q2a":"5","Subject":"CC","Q2b":"4","Q3a":"4","RegNo":"20PA1A5439","Q3b":"4","Q1a":"-","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"4","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"8","Q5Q6best":"4","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"P. kavya Lakshmi","Q1b":"4","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5440","Q3b":"-","Q1a":"3","Q4a":"3","Q4b":"3","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"7","Q3Q4best":"6","Q5Q6best":"5","TotalMarks":"18","TotalMarks(20)":"-"},{"Name":"P.Easha Madhuri","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5441","Q3b":"-","Q1a":"6","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"9","Q5Q6best":"6","TotalMarks":"26","TotalMarks(20)":"-"},{"Name":"P. Durger Pavan","Q1b":"6","Q2a":"-","Subject":"Competitive","Q2b":"-","Q3a":"3","RegNo":"20PA1A5442","Q3b":"6","Q1a":"6","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"7","Q5Q6best":"5","TotalMarks":"23","TotalMarks(20)":"-"},{"Name":"P.T.Abhiram","Q1b":"6","Q2a":"-","Subject":"C .C","Q2b":"-","Q3a":"4","RegNo":"20PA1A5443","Q3b":"5","Q1a":"6","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"25","TotalMarks(20)":"-"},{"Name":"P Bhanzavi Danna ","Q1b":"4","Q2a":"-","Subject":"Competitive wishing","Q2b":"-","Q3a":"-","RegNo":"R0PA1A5444","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"4","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"8","Q5Q6best":"5","TotalMarks":"22","TotalMarks(20)":"-"},{"Name":"Rushi Pinamaraju ","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"-","RegNo":"20PA1A5445","Q3b":"-","Q1a":"4","Q4a":"2","Q4b":"3","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"5","Q5Q6best":"3","TotalMarks":"17","TotalMarks(20)":"-"},{"Name":"S.V.Triveni ","Q1b":"5","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"5","RegNo":"20PA1A5446","Q3b":"5","Q1a":"6","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"5","TotalMarks":"26","TotalMarks(20)":"-"},{"Name":"A. R.Fardin ","Q1b":"5","Q2a":"-","Subject":"competitive Cooding ","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5447","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"24.","TotalMarks(20)":"-"},{"Name":"S.nagarjuna","Q1b":"5","Q2a":"-","Subject":"Competitive Coding ","Q2b":"-","Q3a":"2","RegNo":"20pa1a5448","Q3b":"-","Q1a":"4","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"7","Q5Q6best":"6","TotalMarks":"22","TotalMarks(20)":"-"},{"Name":"V.Torun","Q1b":"5","Q2a":"-","Subject":"CC","Q2b":"-","Q3a":"3","RegNo":"2OPA1A5450","Q3b":"-","Q1a":"4","Q4a":"-","Q4b":"4","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"7","Q5Q6best":"5","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"V.Durga Mahesh","Q1b":"6","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"5","RegNo":"20PA1A5451","Q3b":"6","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"11","Q5Q6best":"6","TotalMarks":"28","TotalMarks(20)":"-"},{"Name":"V.Saikarthik","Q1b":"5","Q2a":"-","Subject":"Competitive Coding ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5452","Q3b":"-","Q1a":"4","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"9","Q5Q6best":"6","TotalMarks":"24","TotalMarks(20)":"-"},{"Name":"J.Sri Sai Manoj","Q1b":"5","Q2a":"-","Subject":"-","Q2b":"-","Q3a":"-","RegNo":"2OPA1A5453","Q3b":"-","Q1a":"5","Q4a":"-","Q4b":"5","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9+1","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"231","TotalMarks(20)":"-"},{"Name":"V.Aditya","Q1b":"-","Q2a":"6","Subject":"Competitive Cadin ","Q2b":"-","Q3a":"-","RegNo":"20PA1A5454","Q3b":"6","Q1a":"-","Q4a":"","Q4b":"-","Q1total":"-","Q5a":"-","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"6","Q3Q4best":"6","Q5Q6best":"2","TotalMarks":"14","TotalMarks(20)":"-"},{"Name":"Yadala Manikanta","Q1b":"3","Q2a":"-","Subject":"Competitive Coding ","Q2b":"-","Q3a":"4","RegNo":"20PA1A5455","Q3b":"5","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"-","Q5b":"-","Q6b":"-","Q6a":"5","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"22.","TotalMarks(20)":"-"},{"Name":"Y. Siva Kumar","Q1b":"2","Q2a":"2","Subject":"C.C","Q2b":"4","Q3a":"-","RegNo":"20PA1A5456","Q3b":"-","Q1a":"4","Q4a":"4","Q4b":"2","Q1total":"-","Q5a":"2","Q5b":"-","Q6b":"-","Q6a":"","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"6","Q3Q4best":"6","Q5Q6best":"3","TotalMarks":"15","TotalMarks(20)":"-"},{"Name":"Y. Jay Pavan","Q1b":"5","Q2a":"-","Subject":"Competitive Coding","Q2b":"-","Q3a":"4","RegNo":"20PA1A3457","Q3b":"5","Q1a":"5","Q4a":"-","Q4b":"-","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"10","Q3Q4best":"9","Q5Q6best":"5","TotalMarks":"24","TotalMarks(20)":"-"},{"Name":"y. Joel henry","Q1b":"5","Q2a":"-","Subject":"Competitive coiling","Q2b":"-","Q3a":"-","RegNo":"20PA1A5458","Q3b":"-","Q1a":"6","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"27.","TotalMarks(20)":"-"},{"Name":"D.S.B.L Harsha","Q1b":"4","Q2a":"-","Subject":"competitive code","Q2b":"-","Q3a":"-","RegNo":"21pA1A5401","Q3b":"-","Q1a":"3","Q4a":"3","Q4b":"4","Q1total":"-","Q5a":"3","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"7","Q5Q6best":"3","TotalMarks":"19","TotalMarks(20)":"-"},{"Name":"D Siva krishna","Q1b":"-","Q2a":"3+2","Subject":"Competitive Coding","Q2b":"3","Q3a":"-","RegNo":"21PA1A5402","Q3b":"-","Q1a":"4","Q4a":"4","Q4b":"3","Q1total":"-","Q5a":"-","Q5b":"/","Q6b":"-","Q6a":"4","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"6","Q3Q4best":"7","Q5Q6best":"4","TotalMarks":"16","TotalMarks(20)":"-"},{"Name":"Gamini Tarun Surya Ranga","Q1b":"-","Q2a":"5","Subject":"Competitive Coding","Q2b":"4","Q3a":"-","RegNo":"21PA5A5403","Q3b":"-","Q1a":"-","Q4a":"5","Q4b":"2","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"5","Q5Q6best":"7","TotalMarks":"29","TotalMarks(20)":"-"},{"Name":"G.Ravichandra","Q1b":"-","Q2a":"4","Subject":"competitive coding","Q2b":"4","Q3a":"-","RegNo":"21PA5A5404","Q3b":"-","Q1a":"-","Q4a":"3","Q4b":"4","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"8","Q3Q4best":"7","Q5Q6best":"6","TotalMarks":"21","TotalMarks(20)":"-"},{"Name":"p. Praveen","Q1b":"4","Q2a":"-","Subject":"Compe titive Coding","Q2b":"-","Q3a":"-","RegNo":"21PA5A5410","Q3b":"-","Q1a":"5","Q4a":"5","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"10","Q5Q6best":"6","TotalMarks":"25","TotalMarks(20)":"-"},{"Name":"S.sai Siva narasimha raju","Q1b":"4","Q2a":"-","Subject":"CC","Q2b":"-","Q3a":"-","RegNo":"21PA5A5411","Q3b":"-","Q1a":"5","Q4a":"4","Q4b":"5","Q1total":"-","Q5a":"6","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"9","Q3Q4best":"9","Q5Q6best":"6","TotalMarks":"24-","TotalMarks(20)":"-"},{"Name":"V.Leela Bharath","Q1b":"5","Q2a":"-","Subject":"competitive coding","Q2b":"-","Q3a":"5","RegNo":"2IPA5A5412","Q3b":"3","Q1a":"6","Q4a":"4","Q4b":"6","Q1total":"-","Q5a":"5","Q5b":"-","Q6b":"-","Q6a":"-","Q2total":"-","Q3total":"-","Q4total":"-","Q5total":"-","Q6total":"-","Q1Q2best":"11","Q3Q4best":"10","Q5Q6best":"5","TotalMarks":"26","TotalMarks(20)":"-"}]