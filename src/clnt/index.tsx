import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Customers from './Customers';

import Form from 'react-jsonschema-form';
import { Router, Route, hashHistory, Link  } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class AppState {
    @observable timer = 0;

    @observable
    formData = {
        title: "First task",
        done: true
    };

    constructor() {
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}


const schema = {
    title: "Todos",
    type: "object",
    required: ["title"],
    properties: {
        title: { type: "string", title: "Title", default: "A new task" },
        done: { type: "boolean", title: "Done?", default: false },
        listOfStrings: {
            type: "array",
            title: "A list of strings",
            items: {
                "type": "object",
                "properties": {
                    fn: { type: "string", "default": "bazinga" },
                    ln: { type: "string" }
                }


            }
        },
    }


};

const log = (type) => console.log.bind(console, type);

@observer
class Todo extends React.Component<{ todo: any }, {}> {

    handleClick() { this.props.todo.done = !this.props.todo.done }

    render() {
        return (<div> title: {this.props.todo.title}  done: {this.props.todo.done ? 'ok' : 'Not'}
            <div onClick={this.handleClick.bind(this) }>Click to toggle.
            </div>
        </div>
        );
    }
}


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


@observer
class TimerView extends React.Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider>

                <div>
   <ul role="nav">
                    <li><Link to="/repos">About</Link></li>
                    <li><Link to="/admin/customers">Customer</Link></li>
                </ul>
                    <DevTools />
                    <RaisedButton
                        label="Super Secret Password"
                        secondary={true}

                        />
                </div>
            </MuiThemeProvider>
        );
    }

    onReset = () => {
        //this.props.appState.resetTimer();
    }
};

const appState = new AppState();
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={TimerView}/>
        {/* add the routes here */}
        <Route path="/repos" component={Repos}/>
        <Route path="/admin/customers" component={Customers}/>
    </Router>

), document.getElementById('root'));
