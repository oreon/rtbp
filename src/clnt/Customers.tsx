import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as axios from 'axios';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

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
        <DevTools />
        <CustomerList data={this.props.data}/>
    
        { (this.state.next != null) && 
         <a  onClick={this.load.bind(this, this.state.next) }> Next </a> }
       { (this.state.prev != null) && 
         <a onClick={this.load.bind(this, this.state.prev) }> Prev </a> }
         
      </div>
    )
  }
}

@observer
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

    let customers = this.props.data.posts.map(customer => {
      return <Customer key={customer.id} customer={customer}  data={this.props.data}
         />
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

        <CustomerForm  data={this.props.data}/>
      </div>
    )
  }
}

@observer
export class Customer extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {
    return (
      <tr>
        <td> {this.props.customer.firstName}</td>
        <td> {this.props.customer.lastName}</td>
        <td> <button onClick={() => this.props.data.onSelect(this.props.customer)}
          >Edit</button></td>
      </tr>
    )
  }
}

@observer
export class CustomerForm extends React.Component<any, any>{

   constructor(props) { super(props); }

  render() {
    console.log(this.props.data);

    return (
      <div className="panel panel-default">
        <Form schema={customerSchema}  formData={this.props.data.selectedPost}
          onSubmit={({formData}) => this.props.data.onSubmit(formData)}
          />
      </div>
    );
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

