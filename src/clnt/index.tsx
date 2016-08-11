import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

import { Router, Route, hashHistory, Link  } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import {AppUserList, AppUserEdit, AppUserView} from './admin/AppUserList';

import {AppRoleList, AppRoleEdit, AppRoleView} from './admin/AppRoleList';

import {GroupList, GroupEdit, GroupView} from './admin/GroupList';

import {ProductList, ProductEdit, ProductView} from './admin/ProductList';

import {CategoryList, CategoryEdit, CategoryView} from './admin/CategoryList';

import {CustomerList, CustomerEdit, CustomerView} from './admin/CustomerList';

import {CustomerOrderList, CustomerOrderEdit, CustomerOrderView} from './admin/CustomerOrderList';

import {OrderItemList, OrderItemEdit, OrderItemView} from './admin/OrderItemList';

import {EmployeeList, EmployeeEdit, EmployeeView} from './admin/EmployeeList';

import {CustomerReviewList, CustomerReviewEdit, CustomerReviewView} from './admin/CustomerReviewList';


export const lookups = ['AppUser', 'AppRole', 'Group', 'Product', 'Category', 'Customer', 'CustomerOrder', 'OrderItem', 'Employee', 'CustomerReview']





import LookupService  from './commons/LookupService'

//import CustomerWrapper from './admin/Customers';



import { AdminView }  from './admin/AdminView'


class Repos extends React.Component<any, {}>{
    render() {
        return <div>repo is this {this.props.params.id}  {this.props.params.parent}</div>
    }
}

class About extends React.Component<{}, {}>{
    render() {
        return <div>About</div>
    }
}


//@observer
class TimerView extends React.Component<{}, {}> {
    id = 35
    render() {

        let repoLink = '/repos/' + this.id + "/";
        return (
            <MuiThemeProvider>
                <div>
                    
                    <ul role="nav">
                        <li><Link to={repoLink} >About Me</Link></li>
                        <li><Link to="/admin">Admin</Link></li>

                        <li><Link to="/admin/CustomerList">Customer</Link></li>

                        <li><Link to="/admin/employees">Employee</Link></li>
                    </ul>
                    <DevTools />
                    {/* 
                    <Form schema={schema} formData={formData} />  */}
                </div>
            </MuiThemeProvider>
        );
    }

    onReset = () => {
        //this.props.appState.resetTimer();
    }
};


const urls = ['products', 'categorys']

function init() {
    console.log("initialized")

    LookupService.loadLookups(urls).then(x =>
        ReactDOM.render((
           <Router history={hashHistory}>
            <Route path="/" component={TimerView}/>
            <Route path="/admin" component={AdminView}/>

            <Route path="/repos" component={Repos}>
                <Route path="/repos/:id/" component={Repos} >
                    <Route path="/repos/:id/:parent" component={Repos} />
                </Route>
            </Route>

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

        </Router>
        
        ), document.getElementById('root'))
    )
}

init();

export class AppRoutes extends React.Component<{}, {}> {

    render() {
        return (<p> routers </p>)
    }
}
