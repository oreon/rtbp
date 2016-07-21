import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as axios from 'axios';

import Form from 'react-jsonschema-form';

export default class Customers extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }

  componentDidMount() {
    axios
      .get('/api/v1/customers')
      .then(response => {
        let results = (response.data as any).results;
        console.log(results);
        this.setState({ customers: results });
      });
  }


  render() {
    return (
      <CustomerList customers={this.state.customers}/>
    )
  }
}


export class CustomerList extends React.Component<any, any>{

  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: {},
    };
  }

  handleEdit(customer) {
    console.log('You clicked: ' + customer.firstName);
    this.setState({
      selectedCustomer: customer,
    });
  }

  handleAdd() {
    this.setState({ selectedCustomer: {} });
  }

  render() {

    let customers = this.props.customers.map(customer => {
      return <Customer key={customer.id} customer={customer}
        onSelect={this.handleEdit.bind(this, customer) } />
    }
    );


    return (
      <div>
        <button onClick={this.handleAdd.bind(this) }>Add</button>

        <table >
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
            {customers}
          </tbody>
        </table>

        <CustomerForm  customer={this.state.selectedCustomer}/>
      </div>
    )
  }
}

export class Customer extends React.Component<any, any>{


  render() {
    return (
      <tr>
        <td> {this.props.customer.firstName}</td>
        <td> {this.props.customer.lastName}</td>
        <td> <button onClick={this.props.onSelect}
          >Edit</button></td>
      </tr>
    )
  }
}

const customerSchema = {
  title: "Todos",
  type: "object",
  required: ["firstName"],
  properties: {
    firstName: { type: "string", title: "First Name", },
    lastName: { type: "string", title: "Last Name", placeholder: "lastname" },
  }
}

const onSubmit = ({formData}) => {
  if (!formData.id)
    axios.post('/api/v1/customers', formData)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  else {
    axios.patch('/api/v1/customers/' + formData.id, formData)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

};


export class CustomerForm extends React.Component<any, any>{

  render() {
    return (
      <Form schema={customerSchema}  formData={this.props.customer}
        onSubmit={onSubmit}
        />
    );
  }
}