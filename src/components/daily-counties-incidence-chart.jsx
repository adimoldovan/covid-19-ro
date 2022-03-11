import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { ChartOptions, Colors } from '../config/constants';

export default class DailyCountiesIncidenceBarChart extends Component {
	render() {
		const { data } = this.props;

		// sort by name
		data.sort((a, b) => {
			let fa = a.name.toLowerCase(),
				fb = b.name.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});

		const chartOptions = {
			tooltip: ChartOptions.tooltip,
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: data.map(function (e) {
						return e.name;
					}),
					axisLabel: { interval: 0, rotate: 90 },
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],

			series: [
				{
					name: 'incidence',
					type: 'bar',
					stack: '1',
					emphasis: {
						focus: 'series',
					},
					color: Colors.active,
					data: data.map(function (e) {
						return e.incidence;
					}),
					markLine: {
						symbol: ['none', 'none'],
						lineStyle: {
							color: 'red',
						},
						label: {
							color: 'red',
						},
						data: [
							{
								yAxis: 1.5,
							},
							{
								yAxis: 3,
							},
							{
								yAxis: 6,
							},
							{
								yAxis: 7.5,
							},
						],
					},
				},
			],
		};

		return <ReactEcharts option={chartOptions} />;
	}
}
