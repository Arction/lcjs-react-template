import { lightningChart } from '@arction/lcjs'
import React, { Component } from 'react'

class Chart extends Component {
    constructor(props) {
        super(props)
        // Generate random ID to use as the containerId for the chart and the target div id.
        this.chartId = Math.trunc(Math.random() * 100000)
    }

    // Define a function which creates a chart.
    createChart() {
        // Create a chartXY, the containerId determines which div the chart will be rendered to.
        this.chart = lightningChart().ChartXY({ containerId: this.chartId })
        // Set the Title of the chart.
        this.chart.setTitle('Getting Started')
        // Add LineSeries to the chart.
        this.lineSeries = this.chart.addLineSeries()
        // Set the strokeStyle of the lineSeries.
        this.lineSeries.setStrokeStyle((style) => style.setThickness(5))
        // Add data points from props to the lineSeries.
        this.lineSeries.add(this.props.data)
    }

    componentDidMount() {
        // Chart can only be created when the component has mounted the DOM as 
        // the chart needs the element with specified containerId to exist in the DOM
        this.createChart()
    }

    componentWillUnmount() {
        // "dispose" should be called when the component will unmount to free all the resources used by the chart.
        this.chart.dispose()
    }

    render() {
        // render a component, which includes a div element. The chart will be created inside the div element.
        return (
            <div id={this.chartId} className='fill'></div>
        )
    }
}

export default Chart
