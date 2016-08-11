

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Product",
    type: "object",
    required: [  'name' 
],
    properties: {
    

name:{ type: "string", title: "Name",  	
},



price:{ type: "number", title: "Price",  	
},



image:{ type: "string", title: "Image",   "format": "data-url"	
},



categorys:{ type: "array", title: "Categorys",   

    "items":{
 'enum': LookupService.getLookup('categorys').map(x => x.id .toString()  ),
 'enumNames': LookupService.getLookup('categorys').map(x => x.displayName)
    },
    "uniqueItems": true

	
},



displayTill:{ type: "string", title: "Display Till",   "format": "date"	
},


    
    }
 };

}

export const productUISchema = {
 	

name: {  'ui:placeholder': "Name" },



price: {  'ui:placeholder': "Price" },



image: {  'ui:placeholder': "Image" },



categorys: {  'ui:placeholder': "Categorys" },



displayTill: {  'ui:placeholder': "Display Till" },


    
 }







export const productHeaders = [
 
 
 {property:"name",title:"Name" }
 ,
 
 {property:"price",title:"Price" }
 ,
 
 {property:"image",title:"Image" }
 ,
 
 {property:"displayTill",title:"Display Till" }
      
 ]

export class ProductStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class ProductWrapper extends React.Component<any, any> {

    data = new ProductStore('products', productHeaders,
    createSchema(), productUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

