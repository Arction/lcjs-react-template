import { lightningChart } from '@arction/lcjs'
import React, { Component } from 'react'

class Chart extends Component {
    constructor(props) {
        super(props)
        // Create the chartId for the container.
        this.chartId = Math.trunc(Math.random() * 100000)
    }

    // Define the function which creates a chart.
    createChart() {
        // create a chartXY.
        this.chart = lightningChart().ChartXY({ containerId: this.chartId })
        // Set the Title to the chart.
        this.chart.setTitle('Getting Started')
        // Add the LineSeries to the chart.
        this.lineSeries = this.chart.addLineSeries()
        // Set the strokeStyle for the LineSeries.
        this.lineSeries.setStrokeStyle((style) => style.setThickness(5))
        // Add the data point to the chart.
        this.lineSeries.add(this.props.data)
    }

    // Call the function to create the chart after rendering the DOM.
    componentDidMount() {
        this.createChart()
    }

    componentWillUnmount() {
        // Dispose the chart before the component is removed from the DOM
        this.chart.dispose()
    }

    // 
    render() {
        // return a div includes chart.
        return (
            <div id={this.chartId} className='fill'></div>
        )
    }
}

export default Chart
