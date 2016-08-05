

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';



 const customerReviewSchema = {
    title: "Customer Review",
    type: "object",
    required: [ 
],
    properties: {
    
  
customer: {
      "type": "number",
    },



review: { type: "string", title: "Review" , },



rating: { type: "integer", title: "Rating" , },


    
        
    }
};

 const customerReviewUISchema = {
 	
  
customer: {
      "ui:widget": "hidden"
    },



review: { 'ui:widget': "textarea" , 'ui:placeholder': "Review" },



rating: { 'ui:widget': "updown" , 'ui:placeholder': "Rating" },


    
 }


const customerReviewHeaders = [
 
 {property:"customer",title:"Customer" }
 ,
 {property:"review",title:"Review" }
 ,
 {property:"rating",title:"Rating" }
      
 ]

/*
export class CustomerReviewStore extends AppState{
   constructor(url:string, headers:any, formSchema:any) {
     super(url, headers, formSchema);
   }
}*/

const data = new AppState('customerReviews', customerReviewHeaders, 
	customerReviewSchema, customerReviewUISchema);

export default class CustomerReviewWrapper extends React.Component<any, any> {
    render() {
        return (
            <BaseCrudComponent data={data} />
        );
    }
}
