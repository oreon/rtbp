

import {SimpleForm, SimpleList, Nested } from '../commons/BaseComponent'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';
import DataService from '../commons/httpService';
import { browserHistory, hashHistory } from 'react-router'

import {customerOrderHeaders, createSchema, customerOrderUISchema} from './CustomerOrder'


import { OrderItemList} from './OrderItemList';



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
      if (!this.props.records)
        this.load();
    } catch (err) {
      this.response.data = []
      console.log(err);
    }
  }

  renderExtra(record: any) {
    return (<tr key={record.id + "E"}>
      <td colSpan={3} key='DET'>
        {(record.orderItems) &&
          <OrderItemList records={record.orderItems} nested={true}  uneditable={true}
            container={'customerOrder_displayName'} />
        }


      </td>
    </tr>)
    //return null
  }

  render() {

    let records = this.props.nested ? this.props.records : this.state.records

    if (!records)
      return (<p>Loading...</p>)

    return (
      <div>
      {this.props.prev}
        <SimpleList headers= {customerOrderHeaders} editLink={'CustomerOrderEdit'}
          renderExtra = {this.renderExtra}
          records = { records } nested={this.props.nested}
          container={this.props.container} uneditable={this.props.uneditable}
          containerId={this.props.containerId}
          prev={this.props.prev}
          />
      </div>
    )
  }
}

export class CustomerOrderView extends React.Component<any, any> {

  renderExtra(record: any) { <p> IN render </p> }
  render() {
    return (
      <p> IN render </p>
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
    if(this.props.params.parent)
      formData[container] = this.props.params.parent
    try {
      await DataService.onSubmit('customerOrders', formData)
      //if(this.props.params.)
      hashHistory.push('/admin/CustomerOrderList?msg=success')
      //else 
      // hashHistory.push(location.)

      //this.props.location.pathname
      this.setState({ message: 'Record successfully created' })
    } catch (error) {
      console.log(error);
      this.setState({ error: error.response.data, record: formData })
    }
  }

  async load() {
    let id = this.props.params.id;
    if (id && id > 0) {
      try {
        let record = await DataService.loadById('customerOrders', id)
        this.setState({ record: record })
      } catch (error) {
        console.log(error);
        this.setState({ error: error })
      }
    }
  }

  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.error) }
        <SimpleForm formData={this.state.record} currentError={this.state.error}
          formSchema={createSchema() }  uiSchema={customerOrderUISchema}
          onSubmit={this.onSubmit}  />
      </div>
    );
  }
}

