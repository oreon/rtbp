import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Router, Route, hashHistory, Link  } from 'react-router'

export class AdminView extends React.Component<{}, {}> {
  render() {
    return (
      <div>
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

      </div>

    );
  }


}
















