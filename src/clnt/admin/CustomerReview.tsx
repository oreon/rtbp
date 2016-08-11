

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';


export function createSchema(){ 
 
 return {
    title: "Customer Review",
    type: "object",
    required: [ 
],
    properties: {
    
  
customer: {
      "type": "number",
    },



review:{ type: "string", title: "Review",  	
},



rating:{ type: "integer", title: "Rating",  	
},


    
    }
 };

}

export const customerReviewUISchema = {
 	
  
customer: {
      "ui:widget": "hidden"
    },



review: { 'ui:widget': "textarea" , 'ui:placeholder': "Review" },



rating: { 'ui:widget': "updown" , 'ui:placeholder': "Rating" },


    
 }







export const customerReviewHeaders = [
 
 
 {property:"customer_displayName",title:"Customer" }
 ,
 
 {property:"review",title:"Review" }
 ,
 
 {property:"rating",title:"Rating" }
      
 ]

export class CustomerReviewStore extends AppState {
    constructor(url: string, headers: any, formSchema: any, uiSchema: any) {
        super(url, headers, formSchema, uiSchema);
    }
}

export default class CustomerReviewWrapper extends React.Component<any, any> {

    data = new CustomerReviewStore('customerReviews', customerReviewHeaders,
    createSchema(), customerReviewUISchema);

    render() {
        return (
            <BaseCrudComponent data={this.data} />
        );
    }
}

