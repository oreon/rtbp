

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "App Role",
    type: "object",
    required: [  'name' 
],
    properties: {
    

name:{ type: "string", title: "Name",  	
},



groups:{ type: "string", title: "Groups",   


	
},


    
    }
 };

}

export const appRoleUISchema = {
 	

name: {  'ui:placeholder': "Name" },



groups: {  'ui:placeholder': "Groups" },


    
 }







export const appRoleHeaders = [
 
 
 {property:"name",title:"Name" }
      
 ]

export class AppRoleStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class AppRoleWrapper extends React.Component<any, any> {

    data = new AppRoleStore('appRoles', appRoleHeaders,
    createSchema(), appRoleUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

