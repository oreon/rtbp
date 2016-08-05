
	 	
	import AppUserWrapper from './AppUser';

	import AppRoleWrapper from './AppRole';

	import GroupWrapper from './Group';

	import ProductWrapper from './Product';

	import CategoryWrapper from './Category';

	import CustomerWrapper from './Customer';

	import CustomerOrderWrapper from './CustomerOrder';

	import OrderItemWrapper from './OrderItem';

	import EmployeeWrapper from './Employee';

	import CustomerReviewWrapper from './CustomerReview';

	 	
  <h1> domain </h1>
  <ul> 
  
   </ul>
   <hr/>
 
  <h1> users </h1>
  <ul> 
  
  <li><Link to="/admin/AppUsers">AppUser</Link></li>
   
  <li><Link to="/admin/AppRoles">AppRole</Link></li>
   
  <li><Link to="/admin/Groups">Group</Link></li>
   
   </ul>
   <hr/>
 
  <h1> mystore </h1>
  <ul> 
  
  <li><Link to="/admin/Products">Product</Link></li>
   
  <li><Link to="/admin/Categorys">Category</Link></li>
   
  <li><Link to="/admin/Customers">Customer</Link></li>
   
  <li><Link to="/admin/CustomerOrders">CustomerOrder</Link></li>
   
  <li><Link to="/admin/OrderItems">OrderItem</Link></li>
   
  <li><Link to="/admin/Employees">Employee</Link></li>
   
  <li><Link to="/admin/CustomerReviews">CustomerReview</Link></li>
   
   </ul>
   <hr/>
 
	 	

  
  
  

  
  <Route path="/admin/AppUsers" component={AppUserWrapper}/>
  
  <Route path="/admin/AppRoles" component={AppRoleWrapper}/>
  
  <Route path="/admin/Groups" component={GroupWrapper}/>
  
  
  

  
  <Route path="/admin/Products" component={ProductWrapper}/>
  
  <Route path="/admin/Categorys" component={CategoryWrapper}/>
  
  <Route path="/admin/Customers" component={CustomerWrapper}/>
  
  <Route path="/admin/CustomerOrders" component={CustomerOrderWrapper}/>
  
  <Route path="/admin/OrderItems" component={OrderItemWrapper}/>
  
  <Route path="/admin/Employees" component={EmployeeWrapper}/>
  
  <Route path="/admin/CustomerReviews" component={CustomerReviewWrapper}/>
  
  
  
	 