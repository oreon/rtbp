

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import BaseCrudComponent from '../commons/BaseComponent';
import AppState from '../commons/AppState';



 const categorySchema = {
    title: "Category",
    type: "object",
    required: [  'name' 
],
    properties: {
    

products: { type: "string", title: "Products" ,   


},



name: { type: "string", title: "Name" , },


    
        
    }
};

 const categoryUISchema = {
 	

products: {  'ui:placeholder': "Products" },



name: {  'ui:placeholder': "Name" },


    
 }


const categoryHeaders = [
 
 {property:"name",title:"Name" }
      
 ]

/*
export class CategoryStore extends AppState{
   constructor(url:string, headers:any, formSchema:any) {
     super(url, headers, formSchema);
   }
}*/

const data = new AppState('categorys', categoryHeaders, 
	categorySchema, categoryUISchema);

export default class CategoryWrapper extends React.Component<any, any> {
    render() {
        return (
            <BaseCrudComponent data={data} />
        );
    }
}
