# `react-time-series-chart` Documentation

Here you can find examples of common configuration options for `react-time-series-chart`. These are applied using callback functions which
reference LightningChart JS API directly. For more materials, refer to LightningChart JS
[Documentation](https://lightningchart.com/js-charts/docs/) and [API reference](https://lightningchart.com/js-charts/api-documentation).

## Color Themes

Theme can be specified using the `theme` prop.

1. Use preset Theme from `@lightningchart/lcjs`

```bash
npm i @lightningchart/lcjs
```

```tsx
import { Themes } from '@lightningchart/lcjs'
<LightningChartXY
	...
	theme={Themes.light}
/>
```

2. Use flat color theme from `@lightningchart/lcjs-themes`

```bash
npm i @lightningchart/lcjs-themes
```

```tsx
import { flatThemeLight } from '@lightningchart/lcjs-themes'
<LightningChartXY
	...
	theme={flatThemeLight}
/>
```

3. Use self-made color theme made using the [online Color Theme editor](https://arction.github.io/lcjs-themes/)

```bash
npm i @lightningchart/lcjs @lightningchart/lcjs-themes
```

```tsx
import { makeFlatTheme } from '@lightningchart/lcjs-themes'
import { ColorHEX } from '@lightningchart/lcjs'
// Created with LCJS Theme Editor https://github.com/Arction/lcjs-themes
const myLCJSTheme = makeFlatTheme({
	isDark: true,
	fontFamily: "Segoe UI, -apple-system, Verdana, Helvetica",
	backgroundColor: ColorHEX("#181818ff"),
	textColor: ColorHEX("#ffffc8ff"),
	dataColors: [ColorHEX("#ffff5b"), ColorHEX("#ffcd5b"), ColorHEX("#ff9b5b"), ColorHEX("#ffc4bc"), ColorHEX("#ff94b8"), ColorHEX("#db94c6"), ColorHEX("#ebc4e0"), ColorHEX("#a994c6"), ColorHEX("#94e2c6"), ColorHEX("#94ffb0"), ColorHEX("#b4ffa5")],
	axisColor: ColorHEX("#00000000"),
	gridLineColor: ColorHEX("#303030ff"),
	uiBackgroundColor: ColorHEX("#161616ff"),
	uiBorderColor: ColorHEX("#ffffff"),
	dashboardSplitterColor: ColorHEX("#2d2d2dff"),
})
<LightningChartXY
	...
	theme={myLCJSTheme}
/>
```

## Chart and Axis titles

```tsx
<LightningChartXY
	...
	chartConfiguration={chart => {
        chart.setTitle('Chart title')
        chart.getDefaultAxisX().setTitle('X Axis')
        chart.getDefaultAxisY().setTitle('Y Axis')
    }}
/>
```

## Series names

```tsx
<LightningChartXY
	...
	seriesConfiguration={seriesList => {
        seriesList[0].setName('Trend 1')
        seriesList[1].setName('Trend 2')
    }}
/>
```

## Legend

```tsx
<LightningChartXY
	...
	chartConfiguration={chart => {
        const legend = chart.addLegendBox().add(chart)
    }}
/>
```

## Streaming data

`react-time-series-chart` is currently not optimized for handling streaming data. Please see
[LightningChart JS React Documentation](https://lightningchart.com/js-charts/docs/frameworks/react/) for best practices in handling
streaming data. Long story short; new data points should not result in series being cleared - new data points should be simply appended in.
