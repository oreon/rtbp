
	 import * as React from 'react';
	import * as ReactDOM from 'react-dom';
	import { Router, Route, hashHistory, Link  } from 'react-router'
  import { Layout} from '../index'

export class AdminView extends React.Component<{}, {}> {
  render() {
    return (
     <Layout>
     <div>
	 	
  <h1> domain </h1>
  <ul> 
  
   </ul>
   <hr/>
 
  <h1> users </h1>
  <ul> 
  
  <li><Link to="/admin/AppUserList">AppUser</Link></li>
   
  <li><Link to="/admin/AppRoleList">AppRole</Link></li>
   
  <li><Link to="/admin/GroupList">Group</Link></li>
   
   </ul>
   <hr/>
 
  <h1> mystore </h1>
  <ul> 
  
  <li><Link to="/admin/ProductList">Product</Link></li>
   
  <li><Link to="/admin/CategoryList">Category</Link></li>
   
  <li><Link to="/admin/CustomerList">Customer</Link></li>
   
  <li><Link to="/admin/CustomerOrderList">CustomerOrder</Link></li>
   
  <li><Link to="/admin/OrderItemList">OrderItem</Link></li>
   
  <li><Link to="/admin/EmployeeList">Employee</Link></li>
   
  <li><Link to="/admin/CustomerReviewList">CustomerReview</Link></li>
   
   </ul>
   <hr/>
 
	  </div>
    </Layout>
	 )}
}	 
 