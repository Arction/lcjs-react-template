import { lightningChart } from '@arction/lcjs';
import React, { Component } from 'react';

class Chart extends Component {
    constructor(props) {
        super(props)
        this.chartId = Math.trunc(Math.random() * 100)
    }
    
    createChart() {
        this.chart = lightningChart().ChartXY({ containerId: this.chartId })
        this.chart.setTitle('Getting Started')
        const lineSeries = this.chart.addLineSeries()
        lineSeries.setStrokeStyle((style) => style.setThickness(5))
        lineSeries.add(this.props.data)
    }

    componentDidMount() {
        this.createChart()
    }

    render() {
        return (
            <div id={this.chartId} className='fill'></div>
        )
    }
}


export default Chart