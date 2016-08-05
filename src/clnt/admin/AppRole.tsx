

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';



 const appRoleSchema = {
    title: "App Role",
    type: "object",
    required: [  'name' 
],
    properties: {
    

name: { type: "string", title: "Name" , },



groups: { type: "string", title: "Groups" ,   


},


    
        
    }
};

 const appRoleUISchema = {
 	

name: {  'ui:placeholder': "Name" },



groups: {  'ui:placeholder': "Groups" },


    
 }


const appRoleHeaders = [
 
 {property:"name",title:"Name" }
      
 ]

/*
export class AppRoleStore extends AppState{
   constructor(url:string, headers:any, formSchema:any) {
     super(url, headers, formSchema);
   }
}*/

const data = new AppState('appRoles', appRoleHeaders, 
	appRoleSchema, appRoleUISchema);

export default class AppRoleWrapper extends React.Component<any, any> {
    render() {
        return (
            <BaseCrudComponent data={data} />
        );
    }
}
