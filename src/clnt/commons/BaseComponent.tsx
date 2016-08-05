import {observable} from 'mobx';
import {observer} from 'mobx-react';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Form from 'react-jsonschema-form';

import DevTools from 'mobx-react-devtools';

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
        <CustomerList data={this.props.data}/>

        { (this.props.data.next != null) &&
          <a  onClick={this.props.data.goNext }> Next </a> }
        { (this.props.data.prev != null) &&
          <a onClick={this.props.data.goPrev}> Prev </a> }

      </div>
    )
  }
}

export class TableHeader extends React.Component<any, any>{
 render(){
   return <th> {this.props.name} </th>
 }
}

@observer
export class CustomerList extends React.Component<any, any>{

  constructor(props) {
    super(props);
  }

  render() {

    let headers = this.props.data.headers.map(x => { return <th key={x.property}>{x.title} </th> });

    let rows = this.props.data.posts.map(customer => {
      return <CustomerRow key={customer.id} record={customer}  data={this.props.data}
        />
    });
   
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

        <CustomerForm  data={this.props.data}/>
      </div>
    )
  }
}

@observer
export class CustomerRow extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {
     let cells = this.props.data.headers.map(x =>
     { return <td  key={x.property}> {this.props.record[x.property]} </td> });

    return (
      <tr>
       {cells}
        <td> <button onClick={() => this.props.data.selectPost(this.props.record) }
          >Edit</button></td>
      </tr>
    )
  }
}


@observer
export class CustomerForm extends React.Component<any, any>{

  constructor(props) { super(props); }

  render() {

    return (

      <div className="panel panel-default">

      <p> {this.props.data.currentError}  </p>
            <Form schema={this.props.data.formSchema}  
         formData={this.props.data.selectedPostJS()}
         uiSchema  = {this.props.data.uiSchemaJS()} 
          onSubmit={({formData}) => this.props.data.onSubmit(formData) }
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
