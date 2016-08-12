import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

import { Router, Route, hashHistory, Link, browserHistory } from 'react-router'
import IconButton from 'material-ui/IconButton';

import * as _  from 'lodash';

import {customerOrderHeaders} from '../admin/CustomerOrder'
import {orderItemHeaders} from '../admin/OrderItem'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


@observer
export default class BaseCrudComponent extends React.Component<any, any> {

  //customerStore: AppState

  constructor(props) {
    console.log("rcvd schema " + props.data.formSchema)
    super(props);
  }

  componentDidMount() { }

  render() {
    return (
      <div className="panel">
        <DevTools />
        {this.props.data.mode}

        { (this.props.data.mode == 'L') &&
          <CustomerList data={this.props.data} nestedRecords={this.props.nestedRecords}/>
        }

        {(this.props.data.mode == 'V') &&
          <CustomerView data={this.props.data}/>
        }

        {(this.props.data.mode == 'E') &&
          <CustomerForm  data={this.props.data}/>
        }
      </div>
    )
  }
}

export class TableHeader extends React.Component<any, any>{
  render() {
    return <TableHeaderColumn> {this.props.name} </TableHeaderColumn>
  }
}

@observer
export class CustomerList extends React.Component<any, any>{

  constructor(props) { super(props); }

  renderRow(record: any) {
    let cells = this.props.data.headers.map(x =>
    { return <TableRowColumn  key={x.property}> {record[x.property]} </TableRowColumn> });

    return (
      <TableRow>
        {cells}
        <TableRowColumn> <button onClick={() => this.props.data.selectPost(record) }
          >Edit Me</button></TableRowColumn>
        <TableRowColumn> <button onClick={() => this.props.data.selectPostView(record) }
          >View</button></TableRowColumn>
      </TableRow>
    )
  }

  renderExtra(record: any) {
    return (<TableRow key={record.id + "C"}>
      <TableRowColumn> hi there </TableRowColumn>  <TableRowColumn> {record.displayName} </TableRowColumn>
    </TableRow>)
  }

  render() {

    let headers = this.props.data.headers.map(x => { return <TableHeaderColumn key={x.property}>{x.title} </TableHeaderColumn> });

    let arr = this.props.nestedRecords ? this.props.nestedRecords : this.props.data.posts
    let rows = arr.map(customer => {
      return this.renderRow(customer)
    });

    let extras = arr.map(customer => {
      return this.renderExtra(customer)
    });

    let rowsWithDet = _.zip(rows, extras)

    return (
      <div>
        <button onClick={() => this.props.data.selectPost({}) } >
          Add
        </button>

        <Table  className="table-striped" >
          <TableBody>
            <TableRow>
              {headers}
            </TableRow>
            {rows}
          </TableBody>
        </Table>

        {  (this.props.data.next != null) &&
          <a  onClick={this.props.data.goNext }> Next </a>  }
        { (this.props.data.prev != null) &&
          <a onClick={this.props.data.goPrev}> Prev </a> }
      </div>
    )
  }
}


export const oi = [

  { property: "customerOrder", title: "Customer Order" }
  ,
  { property: "qty", title: "Qty" }
  ,
  { property: "product", title: "Product" }

]


@observer
export class CustomerView extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {

    let current = this.props.data.selectedPost;

    let vals = this.props.data.headers.map
      (x => { return <div key={x.property}> <b> {x.property} </b>: {current[x.property]}</div> });

    if (!current) {
      return <p> No Record Selected </p>
    }

    if (current.customerOrders) {
      //this.orders.posts = this.props.data.selectedPost.customerOrders
      return (
        <div>
          {vals}

          <SimpleList headers={customerOrderHeaders}  parent={this.props.data.selectedPost.id}
            records={this.props.data.selectedPost.customerOrders}/>

          <button onClick={() => this.props.data.gotoEdit() }>Edit</button>
          <button onClick={() => this.props.data.gotoList() }>Cancel</button>

        </div>

      );
    }
    return null;
  }

}

//var History = Router.History;

@observer
export class CustomerForm extends React.Component<any, any>{

  constructor(props) { super(props); }


  render() {

    return (

      <div className="panel panel-default">

        <p> {this.props.data.currentError}  </p>
        <Form schema={this.props.data.formSchema}
          formData={this.props.data.selectedPostJS() }
          uiSchema  = {this.props.data.uiSchemaJS() }
          onSubmit={({formData}) => this.props.data.onSubmit(formData) }
          >
          <div>
            <button type="submit" className="button">Submit</button>
            <button className="button" onClick={() => { hashHistory.goBack } }> Cancel</button>
          </div>
        </Form>

      </div>
    );
  }
}

export class SimpleView extends React.Component<any, any>{
  render() {

    let current = this.props.record;

    let vals = this.props.headers.map
      (x => { return <div key={x.property}> <b> {x.property} </b>: {current[x.property]}</div> });

    if (!current) {
      return <p> No Record Selected </p>
    } else {

      return (<div>
        {vals}
        { this.props.renderExtra(current) }
      </div>
      )
    }
    //return null;
  }
}


export class SimpleList extends React.Component<any, any>{

  editLink: string;

  constructor(props) {
    super(props);
    
    this.editLink = '/admin/' + this.props.editLink
  }

  renderRow(record: any, headers) {

   let cells = headers.map(x =>
    { return <TableRowColumn  key={x.property}> {record[x.property]} </TableRowColumn> });
    let prnt = (this.props.parent) ?   "/" + this.props.parent :  ""
    let editLink = this.editLink + "/" + record.id + prnt;
    

    return (
      <TableRow  key={record.id}>
        {cells}
         {(!this.props.uneditable) && 
        <TableRowColumn key='edit'> 
       
        <Link to={{pathname: editLink, query: { prev: this.props.prev }}}>Edit</Link>
       
        
         </TableRowColumn>
         }
      </TableRow>
    )
  }

  renderExtra(record: any) {
    return this.props.renderExtra(record)
  } 

  render() {

     let headers = this.props.headers
    .filter( x => { return x.property != this.props.container } )
    
     let ths = headers.map(x => { return <TableHeaderColumn key={x.property}>{x.title} </TableHeaderColumn> });

    let mainrows = this.props.records.map(customer => this.renderRow(customer, headers));

    let extras = this.props.records.map(customer => this.renderExtra(customer));

    let rows = _.zip(mainrows, extras)

    let addLink = this.editLink;

    if(this.props.containerId){
      addLink = this.editLink + "/0/" + this.props.containerId
    }

    return (

      <div>
        {this.props.renderExtra({}) }

        {(!this.props.uneditable) && 
        <Link to={addLink}>Add</Link>
        }
      
        <br/>
        <Table  className="table-striped" >
          <TableBody>
            <TableRow key="this.props.headers">
              {ths}
            </TableRow>
            {rows}
          </TableBody>
        </Table>
      </div>
    )
  }
}


//@observer
export class SimpleForm extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {

    return (

      <div className="panel panel-default">

        <p>   </p>
        <Form schema={this.props.formSchema}
          formData={this.props.formData }
          uiSchema  = {this.props.uiSchema }
          onSubmit={({formData}) => this.props.onSubmit(formData) }
          >
          <div>
            <button type="submit" className="button">Submit</button>
            <button className="button" onClick={() => console.log('cancel') }>Cancel</button>
          </div>
        </Form>

      </div>
    );
  }
}

export class Nested extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {

    return (
      <p> {this.props.name}  </p>
    )
  }
}