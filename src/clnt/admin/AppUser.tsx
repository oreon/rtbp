

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService from '../commons/LookupService'



 const appUserSchema = {
    title: "App User",
    type: "object",
    required: [  'userName' , 'password' 
],
    properties: {
    

userName: { type: "string", title: "User Name" , },



password: { type: "string", title: "Password" , },



enabled: { type: "boolean", title: "Enabled" , },



groups: { type: "array", title: "Groups" ,   

    "items":{
 'enum': LookupService.getLookup('groups').map(x => x.id .toString()  ),
 'enumNames': LookupService.getLookup('groups').map(x => x.displayName)
    },
    "uniqueItems": true

},


    
        
    }
};

 const appUserUISchema = {
 	

userName: {  'ui:placeholder': "User Name" },



password: {  'ui:placeholder': "Password" },



enabled: {  'ui:placeholder': "Enabled" },



groups: {  'ui:placeholder': "Groups" },


    
 }


const appUserHeaders = [
 
 {property:"userName",title:"User Name" }
 ,
 {property:"password",title:"Password" }
 ,
 {property:"enabled",title:"Enabled" }
      
 ]

/*
export class AppUserStore extends AppState{
   constructor(url:string, headers:any, formSchema:any) {
     super(url, headers, formSchema);
   }
}*/

const data = new AppState('appUsers', appUserHeaders, 
	appUserSchema, appUserUISchema);

export default class AppUserWrapper extends React.Component<any, any> {
    render() {
        return (
            <BaseCrudComponent data={data} />
        );
    }
}
