

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Customer Order",
    type: "object",
    required: [ 
],
    properties: {
    
  
customer: {
      "type": "number",
    },



notes:{ type: "string", title: "Notes",  	
},


    
orderItems: {
            title: "Order Items",
            type: "array",
            required: [
],
            items: {
                "type": "object",
                "properties": {
                 
  
customerOrder: {
      "type": "number",
    },



qty:{ type: "integer", title: "Qty",  	
},



product:{ type: "integer", title: "Product",   

 'enum': LookupService.getLookup('products').map(x => x.id   ),
 'enumNames': LookupService.getLookup('products').map(x => x.displayName)


	
},

 
                 
                }
            }
        },

    }
 };

}

export const customerOrderUISchema = {
 	
  
customer: {
      "ui:widget": "hidden"
    },



notes: { 'ui:widget': "textarea" , 'ui:placeholder': "Notes" },


    
orderItems: {
 	items:{
         
  
customerOrder: {
      "ui:widget": "hidden"
    },



qty: { 'ui:widget': "updown" , 'ui:placeholder': "Qty" },



product: {  'ui:placeholder': "Product" },

 
         
     }
 },

 }







export const customerOrderHeaders = [
 
 
 {property:"customer_displayName",title:"Customer" }
 ,
 
 {property:"notes",title:"Notes" }
      
 ]

export class CustomerOrderStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class CustomerOrderWrapper extends React.Component<any, any> {

    data = new CustomerOrderStore('customerOrders', customerOrderHeaders,
    createSchema(), customerOrderUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

