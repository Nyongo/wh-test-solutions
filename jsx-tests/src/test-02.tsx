/**
 * In the following React template, modify the component so that the counter correctly displays and it increments by one whenever the button is pressed. 
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

type CounterProps = {}

type CounterState = {
  counter: number; 
};

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props) {
    super(props);
  }

  state:CounterState={
    counter:0
  }

  onPressMainBtn = ()=>{
    this.setState((state:CounterState) => ({
      counter: state.counter + 1 
    }))
  }

  render() {
    const {counter} = this.state
    return (
      <div id="mainArea">
        <p>button count: <span>{counter}</span></p>
        <button id="mainButton" onClick={this.onPressMainBtn}>Increase</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('test-02')
);