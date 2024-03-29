import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Colors } from '../config/constants';

export default class VaccinesGaugeChart extends Component {
	render() {
		const { name, prc } = this.props;

		const chartOptions = {
			title: {
				text: name,
				left: 'center',
				textStyle: {
					color: '#666',
				},
			},
			series: [
				{
					name: name,
					type: 'gauge',
					startAngle: 90,
					endAngle: -270,
					axisLine: {
						lineStyle: {
							width: 70,
						},
					},
					splitLine: {
						show: false,
						distance: 0,
						length: 10,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						show: false,
						distance: 50,
					},
					detail: {
						fontSize: 22,
						color: '#666',
						formatter: '{value}%',
						offsetCenter: ['0%', '0%'],
					},
					progress: {
						show: true,
						overlap: false,
						roundCap: false,
						clip: false,
						itemStyle: {
							color: Colors.recovered,
						},
					},
					pointer: {
						show: false,
					},
					data: [
						{
							value: prc,
							name: '',
						},
					],
				},
			],
		};

		return <ReactEcharts option={chartOptions} />;
	}
}
