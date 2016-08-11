import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

import { Router, Route, hashHistory, Link, browserHistory } from 'react-router'

import * as _  from 'lodash';

import {customerOrderHeaders} from '../admin/CustomerOrder'
import {orderItemHeaders} from '../admin/OrderItem'

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
    return <th> {this.props.name} </th>
  }
}

@observer
export class CustomerList extends React.Component<any, any>{

  constructor(props) { super(props); }

  renderRow(record: any) {
    let cells = this.props.data.headers.map(x =>
    { return <td  key={x.property}> {record[x.property]} </td> });

    return (
      <tr>
        {cells}
        <td> <button onClick={() => this.props.data.selectPost(record) }
          >Edit Me</button></td>
        <td> <button onClick={() => this.props.data.selectPostView(record) }
          >View</button></td>
      </tr>
    )
  }

  renderExtra(record: any) {
    return (<tr key={record.id + "C"}>
      <td> hi there </td>  <td> {record.displayName} </td>
    </tr>)
  }

  render() {

    let headers = this.props.data.headers.map(x => { return <th key={x.property}>{x.title} </th> });

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

        <table  className="table-striped" >
          <tbody>
            <tr>
              {headers}
            </tr>
            {rows}
          </tbody>
        </table>

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

    console.log(headers);

    let cells = headers.map(x =>
    { return <td  key={x.property}> {record[x.property]} </td> });

    let editLink = this.editLink + "/" + record.id + "/" + this.props.parent;

    return (
      <tr  key={record.id}>
        {cells}
         {(!this.props.nested) && 
        <td key='edit'> <Link to={editLink}>Edit</Link> </td>
         }
      </tr>
    )
  }

  renderExtra(record: any) {
    return this.props.renderExtra(record)
  } 

  render() {

     let headers = this.props.headers
    .filter( x => { return x.property != this.props.container } )
    
     let ths = headers.map(x => { return <th key={x.property}>{x.title} </th> });

    let mainrows = this.props.records.map(customer => this.renderRow(customer, headers));

    let extras = this.props.records.map(customer => this.renderExtra(customer));

    let rows = _.zip(mainrows, extras)
    return (

      <div>

        {this.props.renderExtra({}) }

        {(!this.props.nested) && 
        <Link to={this.editLink}>Add</Link>
        }

        <table  className="table-striped" >
          <tbody>
            <tr key="this.props.headers">
              {ths}
            </tr>
            {rows}
          </tbody>
        </table>
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