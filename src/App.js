import React, { Component } from 'react';
import './App.css';
import Chart from './Component/Chart'

class App extends Component {
  constructor() {
      super()
      this.data = [{ x: 0, y: 0 },
      { x: 1, y: 7 },
      { x: 2, y: 3 },
      { x: 3, y: 10 }]
  }
  render() {
    return (
      <div >
        <Chart data={this.data}/>
      </div>
    );
  }
}
export default App;
