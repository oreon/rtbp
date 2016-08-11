
	 	 
	 	
	import {AppUserList,AppUserEdit,AppUserView} from './admin/AppUserList';

	import {AppRoleList,AppRoleEdit,AppRoleView} from './admin/AppRoleList';

	import {GroupList,GroupEdit,GroupView} from './admin/GroupList';

	import {ProductList,ProductEdit,ProductView} from './admin/ProductList';

	import {CategoryList,CategoryEdit,CategoryView} from './admin/CategoryList';

	import {CustomerList,CustomerEdit,CustomerView} from './admin/CustomerList';

	import {CustomerOrderList,CustomerOrderEdit,CustomerOrderView} from './admin/CustomerOrderList';

	import {OrderItemList,OrderItemEdit,OrderItemView} from './admin/OrderItemList';

	import {EmployeeList,EmployeeEdit,EmployeeView} from './admin/EmployeeList';

	import {CustomerReviewList,CustomerReviewEdit,CustomerReviewView} from './admin/CustomerReviewList';

	 	
	 	export const lookups = [ 'AppUser' , 'AppRole' , 'Group' , 'Product' , 'Category' , 'Customer' , 'CustomerOrder' , 'OrderItem' , 'Employee' , 'CustomerReview' ]
	 	
	 	
    
 
  
 <Route path="/admin/AppUserList" component={AppUserList} />

<Route path="/admin/AppUserEdit" component={AppUserEdit}>
    <Route path="/admin/AppUserEdit/:id" component={AppUserEdit} >
        <Route path="/admin/AppUserEdit/:id/:parent" component={AppUserEdit} />
    </Route>
</Route>
 
 <Route path="/admin/AppRoleList" component={AppRoleList} />

<Route path="/admin/AppRoleEdit" component={AppRoleEdit}>
    <Route path="/admin/AppRoleEdit/:id" component={AppRoleEdit} >
        <Route path="/admin/AppRoleEdit/:id/:parent" component={AppRoleEdit} />
    </Route>
</Route>
 
 <Route path="/admin/GroupList" component={GroupList} />

<Route path="/admin/GroupEdit" component={GroupEdit}>
    <Route path="/admin/GroupEdit/:id" component={GroupEdit} >
        <Route path="/admin/GroupEdit/:id/:parent" component={GroupEdit} />
    </Route>
</Route>
   
 
  
 <Route path="/admin/ProductList" component={ProductList} />

<Route path="/admin/ProductEdit" component={ProductEdit}>
    <Route path="/admin/ProductEdit/:id" component={ProductEdit} >
        <Route path="/admin/ProductEdit/:id/:parent" component={ProductEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CategoryList" component={CategoryList} />

<Route path="/admin/CategoryEdit" component={CategoryEdit}>
    <Route path="/admin/CategoryEdit/:id" component={CategoryEdit} >
        <Route path="/admin/CategoryEdit/:id/:parent" component={CategoryEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerList" component={CustomerList} />

<Route path="/admin/CustomerEdit" component={CustomerEdit}>
    <Route path="/admin/CustomerEdit/:id" component={CustomerEdit} >
        <Route path="/admin/CustomerEdit/:id/:parent" component={CustomerEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerOrderList" component={CustomerOrderList} />

<Route path="/admin/CustomerOrderEdit" component={CustomerOrderEdit}>
    <Route path="/admin/CustomerOrderEdit/:id" component={CustomerOrderEdit} >
        <Route path="/admin/CustomerOrderEdit/:id/:parent" component={CustomerOrderEdit} />
    </Route>
</Route>
 
 <Route path="/admin/OrderItemList" component={OrderItemList} />

<Route path="/admin/OrderItemEdit" component={OrderItemEdit}>
    <Route path="/admin/OrderItemEdit/:id" component={OrderItemEdit} >
        <Route path="/admin/OrderItemEdit/:id/:parent" component={OrderItemEdit} />
    </Route>
</Route>
 
 <Route path="/admin/EmployeeList" component={EmployeeList} />

<Route path="/admin/EmployeeEdit" component={EmployeeEdit}>
    <Route path="/admin/EmployeeEdit/:id" component={EmployeeEdit} >
        <Route path="/admin/EmployeeEdit/:id/:parent" component={EmployeeEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerReviewList" component={CustomerReviewList} />

<Route path="/admin/CustomerReviewEdit" component={CustomerReviewEdit}>
    <Route path="/admin/CustomerReviewEdit/:id" component={CustomerReviewEdit} >
        <Route path="/admin/CustomerReviewEdit/:id/:parent" component={CustomerReviewEdit} />
    </Route>
</Route>
   
 
	 