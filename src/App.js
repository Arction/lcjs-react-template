import React, { Component } from 'react';
import './App.css';
import Chart from './Component/Chart'

class App extends Component {
  constructor() {
      super()
  // Define the data point to the chart in the props
      this.data = [{ x: 0, y: 0 },
      { x: 1, y: 7 },
      { x: 2, y: 3 },
      { x: 3, y: 10 }]
  }
  render() {
    return (
      // Render a div includes a "Chart" component and passing the data to the componet.
      <div >
        <Chart data={this.data}/>
      </div>
    );
  }
}
export default App;
