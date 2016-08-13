
	 	 
	 	
	import {AppUserListWrapper,AppUserEdit,AppUserView} from './admin/AppUserList';

	import {AppRoleListWrapper,AppRoleEdit,AppRoleView} from './admin/AppRoleList';

	import {GroupListWrapper,GroupEdit,GroupView} from './admin/GroupList';

	import {ProductListWrapper,ProductEdit,ProductView} from './admin/ProductList';

	import {CategoryListWrapper,CategoryEdit,CategoryView} from './admin/CategoryList';

	import {CustomerListWrapper,CustomerEdit,CustomerView} from './admin/CustomerList';

	import {CustomerOrderListWrapper,CustomerOrderEdit,CustomerOrderView} from './admin/CustomerOrderList';

	import {OrderItemListWrapper,OrderItemEdit,OrderItemView} from './admin/OrderItemList';

	import {EmployeeListWrapper,EmployeeEdit,EmployeeView} from './admin/EmployeeList';

	import {CustomerReviewListWrapper,CustomerReviewEdit,CustomerReviewView} from './admin/CustomerReviewList';

	 	
	 	export const lookups = [ 'AppUser' , 'AppRole' , 'Group' , 'Product' , 'Category' , 'Customer' , 'CustomerOrder' , 'OrderItem' , 'Employee' , 'CustomerReview' ]
	 	
	 	
    
 
  
 <Route path="/admin/AppUserList" component={AppUserListWrapper} />

<Route path="/admin/AppUserEdit" component={AppUserEdit}>
    <Route path="/admin/AppUserEdit/:id" component={AppUserEdit} >
        <Route path="/admin/AppUserEdit/:id/:parent" component={AppUserEdit} />
    </Route>
</Route>
 
 <Route path="/admin/AppRoleList" component={AppRoleListWrapper} />

<Route path="/admin/AppRoleEdit" component={AppRoleEdit}>
    <Route path="/admin/AppRoleEdit/:id" component={AppRoleEdit} >
        <Route path="/admin/AppRoleEdit/:id/:parent" component={AppRoleEdit} />
    </Route>
</Route>
 
 <Route path="/admin/GroupList" component={GroupListWrapper} />

<Route path="/admin/GroupEdit" component={GroupEdit}>
    <Route path="/admin/GroupEdit/:id" component={GroupEdit} >
        <Route path="/admin/GroupEdit/:id/:parent" component={GroupEdit} />
    </Route>
</Route>
   
 
  
 <Route path="/admin/ProductList" component={ProductListWrapper} />

<Route path="/admin/ProductEdit" component={ProductEdit}>
    <Route path="/admin/ProductEdit/:id" component={ProductEdit} >
        <Route path="/admin/ProductEdit/:id/:parent" component={ProductEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CategoryList" component={CategoryListWrapper} />

<Route path="/admin/CategoryEdit" component={CategoryEdit}>
    <Route path="/admin/CategoryEdit/:id" component={CategoryEdit} >
        <Route path="/admin/CategoryEdit/:id/:parent" component={CategoryEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerList" component={CustomerListWrapper} />

<Route path="/admin/CustomerEdit" component={CustomerEdit}>
    <Route path="/admin/CustomerEdit/:id" component={CustomerEdit} >
        <Route path="/admin/CustomerEdit/:id/:parent" component={CustomerEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerOrderList" component={CustomerOrderListWrapper} />

<Route path="/admin/CustomerOrderEdit" component={CustomerOrderEdit}>
    <Route path="/admin/CustomerOrderEdit/:id" component={CustomerOrderEdit} >
        <Route path="/admin/CustomerOrderEdit/:id/:parent" component={CustomerOrderEdit} />
    </Route>
</Route>
 
 <Route path="/admin/OrderItemList" component={OrderItemListWrapper} />

<Route path="/admin/OrderItemEdit" component={OrderItemEdit}>
    <Route path="/admin/OrderItemEdit/:id" component={OrderItemEdit} >
        <Route path="/admin/OrderItemEdit/:id/:parent" component={OrderItemEdit} />
    </Route>
</Route>
 
 <Route path="/admin/EmployeeList" component={EmployeeListWrapper} />

<Route path="/admin/EmployeeEdit" component={EmployeeEdit}>
    <Route path="/admin/EmployeeEdit/:id" component={EmployeeEdit} >
        <Route path="/admin/EmployeeEdit/:id/:parent" component={EmployeeEdit} />
    </Route>
</Route>
 
 <Route path="/admin/CustomerReviewList" component={CustomerReviewListWrapper} />

<Route path="/admin/CustomerReviewEdit" component={CustomerReviewEdit}>
    <Route path="/admin/CustomerReviewEdit/:id" component={CustomerReviewEdit} >
        <Route path="/admin/CustomerReviewEdit/:id/:parent" component={CustomerReviewEdit} />
    </Route>
</Route>
   
 
	 