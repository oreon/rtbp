

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "App User",
    type: "object",
    required: [  'userName' , 'password' 
],
    properties: {
    

userName:{ type: "string", title: "User Name",  	
},



password:{ type: "string", title: "Password",  	
},



enabled:{ type: "boolean", title: "Enabled",  	
},



groups:{ type: "array", title: "Groups",   

    "items":{
 'enum': LookupService.getLookup('groups').map(x => x.id .toString()  ),
 'enumNames': LookupService.getLookup('groups').map(x => x.displayName)
    },
    "uniqueItems": true

	
},


    
    }
 };

}

export const appUserUISchema = {
 	

userName: {  'ui:placeholder': "User Name" },



password: {  'ui:placeholder': "Password" },



enabled: {  'ui:placeholder': "Enabled" },



groups: {  'ui:placeholder': "Groups" },


    
 }







export const appUserHeaders = [
 
 
 {property:"userName",title:"User Name" }
 ,
 
 {property:"password",title:"Password" }
 ,
 
 {property:"enabled",title:"Enabled" }
      
 ]

export class AppUserStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class AppUserWrapper extends React.Component<any, any> {

    data = new AppUserStore('appUsers', appUserHeaders,
    createSchema(), appUserUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

