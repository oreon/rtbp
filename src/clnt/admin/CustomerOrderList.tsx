

import {SimpleForm, SimpleList, Nested } from '../commons/BaseComponent'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';
import DataService from '../commons/httpService';
import { browserHistory, hashHistory } from 'react-router'
import {Layout} from '../index' 

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';



import {customerOrderHeaders, createSchema, customerOrderUISchema} from './CustomerOrder'


	import { OrderItemList} from './OrderItemList';




export class CustomerOrderListWrapper extends React.Component<any, any> {

  render() {
    return (
      <Layout>
       <CustomerOrderList/>
      </Layout>
    )
  }
}

export class CustomerOrderList extends React.Component<any, any> {

  response: any

  constructor(props) {
    super(props);
    this.state = { response: {} };
    this.renderExtra = this.renderExtra.bind(this)
  }

  async load() {
    this.response = await DataService.load('customerOrders');
    this.setState({ records: this.response.data.results })
  }

  componentDidMount() {
    console.log("waiting for customerOrders")
    try {
      if(!this.props.records)
      	this.load();
    } catch (err) {
      this.response.data = []
      console.log(err);
    }
  }

  renderExtra(record: any) {
  	
  		
    if ( !( record.orderItems ) )
      return null;
      
     if ( !( record.orderItems.length ) )
      return null;

 
    return (<TableRow key={record.id + "E"}>
      <TableRowColumn colSpan={3} key='DET'> 
		 {(record.orderItems) &&
          <OrderItemList records={record.orderItems} 
          nested={true}  
          container={'customerOrder_displayName'}
          containerId={record.id}
           prev={this.props.location?this.props.location.pathName:null }
           uneditable={true} 
           />
         }
		  
      
      </TableRowColumn>
    </TableRow>)
    
  }

 render() {
    
    let records = this.props.nested ? this.props.records : this.state.records

    if(!records )
      return (<p>Loading...</p>)

    return (
     
      <div>
         {  (records.length > 0 ) &&
        <SimpleList headers= {customerOrderHeaders} editLink={'CustomerOrderEdit'}
          renderExtra = {this.renderExtra}
          records = { records } nested={this.props.nested}
          container={this.props.container} uneditable={this.props.uneditable}
          containerId={this.props.containerId}
          prev={this.props.prev}
          />
      }
      </div>
      
    )
  }
}

export class CustomerOrderView extends React.Component<any, any> {

  renderExtra(record: any) { <p> IN render </p> }
  render() {
    return (
     <Layout>
      <p> IN render </p>
      </Layout>
    )	

    // <SimpleView  headers={this.props.params.parent} renderExtra={this.renderExtra}
    //   record={this.props.CustomerOrderOrders}/>
  }
}


export const container = 'customer'



export class CustomerOrderEdit extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { record: {}, error: {}, message: {} };
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(formData) {
  	if(container &&  this.props.params.parent)
    	formData[container] = this.props.params.parent 
    try {
      await DataService.onSubmit('customerOrders', formData)
      
      //if(!this.props.prev)
     hashHistory.push('/admin/CustomerOrderList?msg=success')
      //else 
      // hashHistory.push(this.props.prev)
      
      //this.setState({ message: 'Record successfully created' })
    } catch (error) {
      console.log(error);
      this.setState({ error: error.response.data, record: formData })
    }
  }


  async componentDidMount() {
    if (this.props.params.id) {
      try {
        this.setState({
          record: await DataService.loadById('customerOrders',
            this.props.params.id)
        })
      } catch (error) {
        console.log(error);
        this.setState({ error: error })
      }
    }
  }

  render() {
    return (
     <Layout>
      <div>
        {JSON.stringify(this.state.error) }
        <SimpleForm formData={this.state.record} currentError={this.state.error}
          formSchema={createSchema() }  uiSchema={customerOrderUISchema}
          onSubmit={this.onSubmit}  />
      </div>
     </Layout>
    );
  }
}

