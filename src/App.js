import React, { Component } from 'react'
import './App.css'
import Chart from './Component/Chart'

class App extends Component {
  constructor() {
    super()
    // Define data points that will be provided to the chart
    this.data = [
      { x: 0, y: 0 },
      { x: 1, y: 7 },
      { x: 2, y: 3 },
      { x: 3, y: 10 }
    ]
  }

  render() {
    return (
      // Render a div which includes a "Chart" component and pass the data to the component.
      <div >
        <Chart data={this.data} />
      </div>
    )
  }
}

export default App
