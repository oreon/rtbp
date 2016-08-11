

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Group",
    type: "object",
    required: [ 
],
    properties: {
    

appUsers:{ type: "string", title: "App Users",   


	
},



appRoles:{ type: "array", title: "App Roles",   

    "items":{
 'enum': LookupService.getLookup('appRoles').map(x => x.id .toString()  ),
 'enumNames': LookupService.getLookup('appRoles').map(x => x.displayName)
    },
    "uniqueItems": true

	
},


    
    }
 };

}

export const groupUISchema = {
 	

appUsers: {  'ui:placeholder': "App Users" },



appRoles: {  'ui:placeholder': "App Roles" },


    
 }







export const groupHeaders = [
      
 ]

export class GroupStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class GroupWrapper extends React.Component<any, any> {

    data = new GroupStore('groups', groupHeaders,
    createSchema(), groupUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

