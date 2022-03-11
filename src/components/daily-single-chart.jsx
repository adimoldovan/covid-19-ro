import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartOptions } from '../config/constants';

export default class DailySingleBarChart extends Component {
	render() {
		const { xSeries, ySeries, color, name } = this.props;

		const chartOptions = {
			tooltip: ChartOptions.tooltip,
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: xSeries,
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			dataZoom: [
				{
					type: 'inside',
					start: 0,
					end: 100,
				},
				{
					start: 0,
					end: 100,
				},
			],
			series: [
				{
					name: name,
					type: 'bar',
					stack: '1',
					emphasis: {
						focus: 'series',
					},
					color: color,
					data: ySeries,
				},
			],
		};

		return <ReactEcharts option={chartOptions} />;
	}
}
