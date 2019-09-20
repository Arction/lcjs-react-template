import { lightningChart } from '@arction/lcjs'
import React, { Component } from 'react'

class Chart extends Component {
    constructor(props) {
        super(props)
        // Cache the ChartID.
        this.chartId = Math.trunc(Math.random() * 100000)
    }

    // Define the function which creates a chart.
    createChart() {
        // create a chartXY inside a html Div element, the containerID indicated the chartXY will be created to which div.
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

    // After rendering a virtual Dom, which includes a div element. We call the function to creates the chart inside it.
    componentDidMount() {
        this.createChart()
    }

    componentWillUnmount() {
        // We suggest to dispose the chart for saving the computer memory.
        // Since the chart was built inside the html iframe, it will affect the performance when user add multiple charts.
        this.chart.dispose()
    }

    // 
    render() {
        // rending a virtual Dom, which includes a div element. The LightningchartXY will be created inside it.
        return (
            <div id={this.chartId} className='fill'></div>
        )
    }
}

export default Chart
