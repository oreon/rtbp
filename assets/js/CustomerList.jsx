import React from 'react';
import Customer from './Customer'

export default class CustomerList extends React.Component{
    render() {
   
        let customers = this.props.customers.map(customer =>{
           return <Customer key={customer.id} customer={customer} />
           }
		);
		
		
		console.log(customers);
		       
      
        return (
                    <table>
                    <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                        
                 {customers}
                 </tbody>
                </table>
		)
	}
}