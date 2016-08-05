

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


 function createSchema(){ 
 
 return {
    title: "Customer",
    type: "object",
    required: [  'firstName' , 'lastName' 
],
    properties: {
    

firstName: { type: "string", title: "First Name" , },



lastName: { type: "string", title: "Last Name" , },



customerType: { type: "string", title: "Customer Type" ,   
'enum' : [
'','0' ,'1' ,'2'   
],
'enumNames' : [
'Select','BRONZE' ,'SILVER' ,'GOLD'   
]
},


    
customerOrders: {
            title: "Customer Orders",
            type: "array",
            required: [
],
            items: {
                "type": "object",
                "properties": {
                 
  
customer: {
      "type": "number",
    },



notes: { type: "string", title: "Notes" , },

 
                 
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



qty: { type: "integer", title: "Qty" , },



product: { type: "integer", title: "Product" ,   

 'enum': LookupService.getLookup('product').map(x => x.id   ),
 'enumNames': LookupService.getLookup('product').map(x => x.displayName)


},

 
                 
                }
            }
        },

                }
            }
        },

customerReviews: {
            title: "Customer Reviews",
            type: "array",
            required: [
],
            items: {
                "type": "object",
                "properties": {
                 
  
customer: {
      "type": "number",
    },



review: { type: "string", title: "Review" , },



rating: { type: "integer", title: "Rating" , },

 
                 
                }
            }
        },

        
    }
 };

}

 const customerUISchema = {
 	

firstName: {  'ui:placeholder': "First Name" },



lastName: {  'ui:placeholder': "Last Name" },



customerType: {  'ui:placeholder': "Customer Type" },


    
customerOrders: {
 	items:{
         
  
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
 },

customerReviews: {
 	items:{
         
  
customer: {
      "ui:widget": "hidden"
    },



review: { 'ui:widget': "textarea" , 'ui:placeholder': "Review" },



rating: { 'ui:widget': "updown" , 'ui:placeholder': "Rating" },

 
         
     }
 },

 }


const customerHeaders = [
 
 {property:"firstName",title:"First Name" }
 ,
 {property:"lastName",title:"Last Name" }
 ,
 {property:"customerType",title:"Customer Type" }
      
 ]

export class CustomerStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class CustomerWrapper extends React.Component<any, any> {

    data = new CustomerStore('customers', customerHeaders,
    createSchema(), customerUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

