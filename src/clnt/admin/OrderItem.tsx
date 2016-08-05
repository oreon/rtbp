

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';



 const orderItemSchema = {
    title: "Order Item",
    type: "object",
    required: [ 
],
    properties: {
    
  
customerOrder: {
      "type": "number",
    },



qty: { type: "integer", title: "Qty" , },



product: { type: "integer", title: "Product" ,   

 'enum': LookupService.getLookup('product').map(x => x.id   ),
 'enumNames': LookupService.getLookup('product').map(x => x.displayName)


},


    
        
    }
};

 const orderItemUISchema = {
 	
  
customerOrder: {
      "ui:widget": "hidden"
    },



qty: { 'ui:widget': "updown" , 'ui:placeholder': "Qty" },



product: {  'ui:placeholder': "Product" },


    
 }


const orderItemHeaders = [
 
 {property:"customerOrder",title:"Customer Order" }
 ,
 {property:"qty",title:"Qty" }
 ,
 {property:"product",title:"Product" }
      
 ]

/*
export class OrderItemStore extends AppState{
   constructor(url:string, headers:any, formSchema:any) {
     super(url, headers, formSchema);
   }
}*/

const data = new AppState('orderItems', orderItemHeaders, 
	orderItemSchema, orderItemUISchema);

export default class OrderItemWrapper extends React.Component<any, any> {
    render() {
        return (
            <BaseCrudComponent data={data} />
        );
    }
}
