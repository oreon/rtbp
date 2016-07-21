import React from "react";
import {observable, computed, observer} from 'mobx-react'
//import GuestModel from '../models/GuestModel'


var timerData = {
    secondsPassed: 0
}

setInterval(() => {
    timerData.secondsPassed++
}, 1000)


//@observer
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Hi Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
        <div>
          <span>Seconds passed </span>
          <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />

        </div>
      );
  }
}


export  class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <div>
        <Title title={this.props.title} />
        <input value={this.props.title} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}


export  class Title extends React.Component {
  render() {
    return (
      <h1> {this.props.title}</h1>
    );
  }
}
