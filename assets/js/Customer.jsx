import React from 'react';

export default class Customer extends React.Component{
    render() {
        return (
			<tr>
				<td> {this.props.customer.firstName}</td>
				<td> {this.props.customer.lastName}</td>
			</tr>
		)
    }
}