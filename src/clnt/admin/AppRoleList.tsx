

import {SimpleForm, SimpleList, Nested } from '../commons/BaseComponent'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppState from '../commons/AppState';
import LookupService  from '../commons/LookupService';
import DataService from '../commons/httpService';
import { browserHistory, hashHistory } from 'react-router'

import {appRoleHeaders, createSchema, appRoleUISchema} from './AppRole'




export class AppRoleList extends React.Component<any, any> {

  response: any

  constructor(props) {
    super(props);
    this.state = { response: {} };
    this.renderExtra = this.renderExtra.bind(this)
  }

  async load() {
    this.response = await DataService.load('appRoles');
    this.setState({ records: this.response.data.results })
  }

  componentDidMount() {
    console.log("waiting for appRoles")
    try {
      if(!this.props.records)
      	this.load();
    } catch (err) {
      this.response.data = []
      console.log(err);
    }
  }

  renderExtra(record: any) {
    return (<tr key={record.id + "E"}>
      <td colSpan={3} key='DET'> 
      	 
      
      </td>
    </tr>)
    //return null
  }

 render() {
    
    let records = this.props.nested ? this.props.records : this.state.records

    if(!records )
      return (<p>Loading...</p>)

    return (
      <div>
        <SimpleList headers= {appRoleHeaders} editLink={'AppRoleEdit'}
          renderExtra = {this.renderExtra}
          records = { records } nested={this.props.nested} 
           container={this.props.container}
        />
      </div>
    )
  }
}

export class AppRoleView extends React.Component<any, any> {

  renderExtra(record: any) { <p> IN render </p> }
  render() {
    return (
      <p> IN render </p>
    )

    // <SimpleView  headers={this.props.params.parent} renderExtra={this.renderExtra}
    //   record={this.props.AppRoleOrders}/>
  }
}

export class AppRoleEdit extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { record: {}, error: {}, message: {} };
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(formData) {
    //formData[owner] = 1 
    try {
      await DataService.onSubmit('appRoles', formData)
      hashHistory.push('/admin/AppRoleList?msg=success')
      this.setState({ message: 'Record successfully created' })
    } catch (error) {
      console.log(error);
      this.setState({ error: error.response.data, record: formData })
    }
  }


  async componentDidMount() {
    if (this.props.params.id) {
      try {
        this.setState({
          record: await DataService.loadById('appRoles',
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
      <div>
        {JSON.stringify(this.state.error) }
        <SimpleForm formData={this.state.record} currentError={this.state.error}
          formSchema={createSchema() }  uiSchema={appRoleUISchema}
          onSubmit={this.onSubmit}  />
      </div>
    );
  }
}

