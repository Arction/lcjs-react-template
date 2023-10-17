import React, { useEffect, useState } from 'react'
import { ChartXY, LineSeries, lightningChart, Point, AppDeploymentLicenseInformation, Theme, AxisTickStrategies } from '@arction/lcjs'

export interface LightningChartXYProps {
	/**
	 * ID of the Chart's HTML div.
	 * This DIV is automatically created.
	 */
	id: string
	/**
	 * Class of the Chart's HTML div.
	 */
	className?: string
	/**
	 * License key.
	 */
	license?: string
	/**
	 * License information.
	 */
	licenseInformation?: AppDeploymentLicenseInformation
	/**
	 * ***LCJS*** theme for the Chart.
	 */
	theme?: Theme
	/**
	 * Data points array for each series in the Chart.
	 */
	data: Point[][]
	/**
	 * Callback function for Chart configuration.
	 */
	chartConfiguration?: (chart: ChartXY) => void
	/**
	 * Callback function for series configuration.
	 */
	seriesConfiguration?: (seriesList: LineSeries[]) => void
}

/**
 * React component for interactive, high performance Time series Line chart.
 *
 * @example
 * ```ts
 * 	<LightningChartXY
 * 		id='chart'
 * 		data={[
 * 			[
 * 				{ x: Date.UTC(2023, 0, 1), y: 1 },
 * 				{ x: Date.UTC(2023, 0, 2), y: 2 },
 * 				{ x: Date.UTC(2023, 0, 3), y: 3 },
 * 				{ x: Date.UTC(2023, 0, 4), y: 4 },
 * 				{ x: Date.UTC(2023, 0, 5), y: 4.5 },
 * 			]
 * 		]}
 * 	/>
 * ```
 *
 * For documentation and more information, please see [react-time-series-chart GitHub repository](https://github.com/Arction/lcjs-react-template/react-time-series-chart)
 */
export function LightningChartXY(props: LightningChartXYProps) {
	const { license, licenseInformation, id, className, theme, data, chartConfiguration, seriesConfiguration } = props
	const [chart, setChart] = useState<undefined | ChartXY>(undefined)
	const [seriesState, setSeriesState] = useState<LineSeries[]>([])

	useEffect(() => {
		const container = document.getElementById(id) as HTMLDivElement
		if (!container) return
		const lc = lightningChart({
			license,
			licenseInformation,
		})
		const newChart = lc
			.ChartXY({
				container,
				theme,
				defaultAxisX: {
					type: 'linear-highPrecision',
				},
			})
			.setTitle('')
		newChart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime)
		setChart(newChart)
		return () => {
			newChart.dispose()
		}
	}, [license, licenseInformation, id, theme])

	useEffect(() => {
		if (!chart) return
		const seriesList = new Array(data.length).fill(0).map(() => {
			return chart.addLineSeries({
				dataPattern: {
					pattern: 'ProgressiveX',
				},
			})
		})
		setSeriesState(seriesList)
		return () => {
			seriesList.forEach((series) => series.dispose())
		}
	}, [data?.length, chart])

	useEffect(() => {
		seriesState.forEach((series, i) => series.clear().add(data[i]))
		chart?.getDefaultAxisX().fit(false)
	}, [seriesState, data, chart])

	useEffect(() => {
		if (!chartConfiguration || !chart) return
		chartConfiguration(chart)
	}, [chart, chartConfiguration])

	useEffect(() => {
		if (!seriesConfiguration || !seriesState.length) return
		seriesConfiguration(seriesState)
	}, [seriesState, seriesConfiguration])

	return <div id={id} className={className}></div>
}
