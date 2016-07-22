import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Customers from './Customers';
import * as axios from 'axios';

import Form from 'react-jsonschema-form';
import { Router, Route, hashHistory, Link  } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class AppState {
    @observable timer = 0;
    //@observable  customers:any = [];

    @observable posts = []
    @observable selectedPost = {}
    //@observable form_data = {}
    @observable is_loading = true
    @observable is_saving = false

    load(url: string) {
        if (!url) url = '/api/v1/customers';
        axios
            .get(url)
            .then(response => {
                //console.log(response);
                let data: any = response.data
                //console.log(data.results);
                //this.customerStore.customers = results

                this.posts = data.results
                this.is_loading = false
                //this.setState({ customers: data.results,   
                //    next : data.next, prev : data.previous, count: data.count});
            });
    }

    constructor() {
        this.load(null);
    }

    onSubmit(formData) {
        console.log("submitting " + formData);
        this.selectedPost = formData;
        console.log('selected entity is ' + this.selectedPost)
        if (! (this.selectedPost as any).id)
            axios.post('/api/v1/customers', this.selectedPost)
                .then(response => this.saveSuccess(response))
                .catch(error => console.log(error));
        else {
            axios.patch('/api/v1/customers/' + (this.selectedPost as any).id, this.selectedPost)
                .then(response => this.saveSuccess(response))
                .catch(error => console.log(error));
        }
    }

    saveSuccess(response){
        this.is_saving = false
        console.log(response.data)
        //this.posts.unshift(response.data)
        this.selectedPost = {}
    }


    addPost(object) {
        this.is_saving = true;
        //this.onSubmit();
    }

    initAdd(){
        this.selectedPost = {}
    }

    onSelect(post){
        this.selectedPost = post;
    }
    /*
    removePost(post) {
      deleteObject({ bucket: config.cosmicjs.bucket }, { slug: post.slug }, (err, res) => {
        this.posts = this.posts.filter(apost => {
          return apost._id !== post._id
        })
      })
    }*/


    /*
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
    */
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

const data = new AppState()

class CustomerWrapper extends React.Component<any, any> {
    render() {
        return (
            <Customers data={data} />
        );
    }
}

//const appState = new AppState();
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={TimerView}/>
        {/* add the routes here */}
        <Route path="/repos" component={Repos}/>
        <Route path="/admin/customers" component={CustomerWrapper}/>
    </Router>

), document.getElementById('root'));
