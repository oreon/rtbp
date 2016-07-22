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

    @observable next = null;
    @observable prev = null;
    @observable count = 0;

    @observable searchString = "";
    

    load(url: string) {
        if (!url) url = '/api/v1/customers';
        axios
            .get(url)
            .then(response => {
                //console.log(response);
                let data: any = response.data
                this.posts = data.results
                this.is_loading = false
                this. next  = data.next, 
                this.prev  = data.previous, 
                this.count =  data.count;
            });
    }

    constructor() {
        this.load(null);
        //this.bind(initAdd);
    }

    onSubmit(formData) {
        console.log("submitting " + formData);
        this.selectedPost = formData;
        console.log('selected entity is ' + this.selectedPost)
        let id = (this.selectedPost as any).id
        if (!id )
            axios.post('/api/v1/customers', this.selectedPost)
                .then(response => this.saveSuccess(response, null))
                .catch(error => console.log(error));
        else {
            axios.patch('/api/v1/customers/' + id, this.selectedPost)
                .then(response => this.saveSuccess(response, id))
                .catch(error => console.log(error));
        }
    }

    saveSuccess(response,id){
        this.is_saving = false
        let entity = response.data;
        console.log("saved " + entity.firstName + entity.id)
        if(id)
        this.posts.forEach((item, i) => { if (item.id == id)  this.posts[i] = entity });
       
        this.selectedPost = {}
    }


   public addPost = () => {

        this.is_saving = true;
         this.selectedPost = {}
        //this.onSubmit();
    }

    initAdd(){
        console.log("here " )
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
