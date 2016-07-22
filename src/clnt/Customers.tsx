import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as axios from 'axios';

import Form from 'react-jsonschema-form';

export class CustomerStore{

//@observable  customers:any = [];

}


@observer
export default class Customers extends React.Component<any, any> {

  customerStore:CustomerStore 

  constructor(props) {
    console.log("rcvd " + props.data.posts)
    super(props);
   this.state = { customers: [] , next : '', prev : '', count: ''};
    //this.customerStore = new CustomerStore();
  }

  componentDidMount() {
   //this.load(null);
  }


  load(url:string){
    /*

     if(!url) url = '/api/v1/customers';
     axios
      .get(url)
      .then(response => {
        console.log(response);
        let data:any = response.data 
        console.log(data.results);
        //this.customerStore.customers = results
        this.setState({ customers: data.results,   
           next : data.next, prev : data.previous, count: data.count});
      });*/
  }




  render() {
    return (
      <div className="panel">
       
        <CustomerList customers={this.props.data.posts}/>
    
        { (this.state.next != null) && 
         <a  onClick={this.load.bind(this, this.state.next) }> Next </a> }
       { (this.state.prev != null) && 
         <a onClick={this.load.bind(this, this.state.prev) }> Prev </a> }
         
      </div>
    )
  }
}

//@observer
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

        <table  className="table-striped" >
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

@observer
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
      .then(response =>    formData = {} )
      .catch(error => console.log(error));
  else {
    axios.patch('/api/v1/customers/' + formData.id, formData)
      .then(response => {  formData = {}; console.log(response); })
      .catch(error => console.log(error));
  }

};


export class CustomerForm extends React.Component<any, any>{

  render() {
    return (
      <div className="panel panel-default">
        <Form schema={customerSchema}  formData={this.props.customer}
          onSubmit={onSubmit}
          />
      </div>
    );
  }
}