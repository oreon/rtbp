

import {SimpleForm, SimpleList, Nested } from '../commons/BaseComponent'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';
import DataService from '../commons/httpService';
import { browserHistory, hashHistory } from 'react-router'
import {Layout} from '../index' 

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';



import {customerHeaders, createSchema, customerUISchema} from './Customer'


	import { CustomerOrderList} from './CustomerOrderList';

	import { CustomerReviewList} from './CustomerReviewList';




export class CustomerListWrapper extends React.Component<any, any> {

  render() {
    return (
      <Layout>
       <CustomerList/>
      </Layout>
    )
  }
}

export class CustomerList extends React.Component<any, any> {

  response: any

  constructor(props) {
    super(props);
    this.state = { response: {} };
    this.renderExtra = this.renderExtra.bind(this)
  }

  async load() {
    this.response = await DataService.load('customers');
    this.setState({ records: this.response.data.results })
  }

  componentDidMount() {
    console.log("waiting for customers")
    try {
      if(!this.props.records)
      	this.load();
    } catch (err) {
      this.response.data = []
      console.log(err);
    }
  }

  renderExtra(record: any) {
  	
  		
    if ( !( record.customerOrders || record.customerReviews ) )
      return null;
      
     if ( !( record.customerOrders.length || record.customerReviews.length ) )
      return null;

 
    return (<TableRow key={record.id + "E"}>
      <TableRowColumn colSpan={3} key='DET'> 
		 {(record.customerOrders) &&
          <CustomerOrderList records={record.customerOrders} 
          nested={true}  
          container={'customer_displayName'}
          containerId={record.id}
           prev={this.props.location?this.props.location.pathName:null }
          
           />
         }
		 {(record.customerReviews) &&
          <CustomerReviewList records={record.customerReviews} 
          nested={true}  
          container={'customer_displayName'}
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
        <SimpleList headers= {customerHeaders} editLink={'CustomerEdit'}
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

export class CustomerView extends React.Component<any, any> {

  renderExtra(record: any) { <p> IN render </p> }
  render() {
    return (
     <Layout>
      <p> IN render </p>
      </Layout>
    )	

    // <SimpleView  headers={this.props.params.parent} renderExtra={this.renderExtra}
    //   record={this.props.CustomerOrders}/>
  }
}


export const container = null



export class CustomerEdit extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { record: {}, error: {}, message: {} };
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(formData) {
  	if(container &&  this.props.params.parent)
    	formData[container] = this.props.params.parent 
    try {
      await DataService.onSubmit('customers', formData)
      
      //if(!this.props.prev)
     hashHistory.push('/admin/CustomerList?msg=success')
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
          record: await DataService.loadById('customers',
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
          formSchema={createSchema() }  uiSchema={customerUISchema}
          onSubmit={this.onSubmit}  />
      </div>
     </Layout>
    );
  }
}

