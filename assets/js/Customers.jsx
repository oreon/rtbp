import React from 'react';
import client from 'rest';
import CustomerList from './CustomerList';


export default class Customers extends React.Component {

	constructor(props) {
		super(props);
		this.state = {customers: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/v1/customers'}).then(response => {
			console.log(response.results)
			this.setState({customers: JSON.parse(response.entity).results});
		});
	}

	render() {
		return (
			<CustomerList customers={this.state.customers}/>
		)
	}
}
