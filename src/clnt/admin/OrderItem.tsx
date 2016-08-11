

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Order Item",
    type: "object",
    required: [ 
],
    properties: {
    
  
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
 };

}

export const orderItemUISchema = {
 	
  
customerOrder: {
      "ui:widget": "hidden"
    },



qty: { 'ui:widget': "updown" , 'ui:placeholder': "Qty" },



product: {  'ui:placeholder': "Product" },


    
 }







export const orderItemHeaders = [
 
 
 {property:"customerOrder_displayName",title:"Customer Order" }
 ,
 
 {property:"qty",title:"Qty" }
 ,
 
 {property:"product_displayName",title:"Product" }
      
 ]

export class OrderItemStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class OrderItemWrapper extends React.Component<any, any> {

    data = new OrderItemStore('orderItems', orderItemHeaders,
    createSchema(), orderItemUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

