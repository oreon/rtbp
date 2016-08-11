

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Employee",
    type: "object",
    required: [  'firstName' , 'lastName' 
],
    properties: {
    

firstName:{ type: "string", title: "First Name",  	
},



lastName:{ type: "string", title: "Last Name",  	
},



active:{ type: "boolean", title: "Active",  	
},



appUser:{ type: "integer", title: "App User",   

 'enum': LookupService.getLookup('appUsers').map(x => x.id   ),
 'enumNames': LookupService.getLookup('appUsers').map(x => x.displayName)


	
},


    
    }
 };

}

export const employeeUISchema = {
 	

firstName: {  'ui:placeholder': "First Name" },



lastName: {  'ui:placeholder': "Last Name" },



active: {  'ui:placeholder': "Active" },



appUser: {  'ui:placeholder': "App User" },


    
 }







export const employeeHeaders = [
 
 
 {property:"firstName",title:"First Name" }
 ,
 
 {property:"lastName",title:"Last Name" }
 ,
 
 {property:"active",title:"Active" }
 ,
 
 {property:"appUser_displayName",title:"App User" }
      
 ]

export class EmployeeStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class EmployeeWrapper extends React.Component<any, any> {

    data = new EmployeeStore('employees', employeeHeaders,
    createSchema(), employeeUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

