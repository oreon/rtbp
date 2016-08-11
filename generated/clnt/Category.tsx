

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Category",
    type: "object",
    required: [  'name' 
],
    properties: {
    

products:{ type: "string", title: "Products",   


	
},



name:{ type: "string", title: "Name",  	
},


    
    }
 };

}

export const categoryUISchema = {
 	

products: {  'ui:placeholder': "Products" },



name: {  'ui:placeholder': "Name" },


    
 }







export const categoryHeaders = [
 
 
 {property:"name",title:"Name" }
      
 ]

export class CategoryStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class CategoryWrapper extends React.Component<any, any> {

    data = new CategoryStore('categorys', categoryHeaders,
    createSchema(), categoryUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

