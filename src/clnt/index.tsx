import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import { Router, Route, hashHistory, Link  } from 'react-router'

import ProductWrapper from './admin/Product';

import CategoryWrapper from './admin/Category';

import  LookupService  from './commons/LookupService'

//import CustomerWrapper from './admin/Customers';



import { AdminView }  from './admin/AdminView'










// const schema = {
//     title: "Todos",
//     type: "object",
//     required: ["title"],


//     properties: {
//         title: { type: "string", title: "Title", default: "A new task" },
//         done: { type: "boolean", title: "Done?", default: "false" },
//         subs: {
//             type: "array",
//             title: "A list of strings",
//             items: {
//                 type: "object",
//                 properties: {
//                     fn: { type: "string", },
//                     ln: { type: "string" }
//                 }
//             }
//         },
//         customerReview: {
//             type: "array",
//             title: "Reviews",
//             items: {
//                 type: "object",
//                 properties: {
//                     review: { type: "string" },
//                     id: { type: "integer" }
//                 }
//             }
//         }
//     }
// };

// const formData =
//     {
//         title: "My current tasks",
//         done: true,
//         subs: [
//             {
//                 "fn": "My first task",
//                 "ln": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             },
//             {
//                 "fn": "My second task",
//                 "ln": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             },
//         ],
//         "customerReview": [
//             {
//                 "id": 2,
//                 "displayName": "good customer , pays on time",
//                 "review": "good customer , pays on time",
//                 "rating": 2
//             }
//         ],

//     }

const log = (type) => console.log.bind(console, type);


class Repos extends React.Component<{}, {}>{
    render() {
        return <div>repo is this </div>
    }
}

class About extends React.Component<{}, {}>{
    render() {
        return <div>About</div>
    }
}


//@observer
class TimerView extends React.Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider>

                <div>
                    <ul role="nav">
                        <li><Link to="/repos">About Me</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
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


function init() {
    console.log("initialized")

    LookupService.loadLookups().then(x =>
            ReactDOM.render((
                <Router history={hashHistory}>
                    <Route path="/" component={TimerView}/>
                    <Route path="/admin" component={AdminView}/>
                    {/* add the routes here  <Route path="/admin/Customers" component={CustomerWrapper}/>*/}
                    <Route path="/repos" component={Repos}/>
                    <Route path="/admin/Products" component={ProductWrapper}/>
                    <Route path="/admin/Categorys" component={CategoryWrapper}/>
                </Router>

            ), document.getElementById('root'))
     )
}

init();