import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {ChartOptions, Colors} from '../config/constants';

export default class VaccinesPieChart extends Component {
  render() {

    const {name, prc} = this.props;

    const chartOptions = {
      tooltip: ChartOptions.tooltip,
      series: [
        {
          name: name,
          type: 'pie',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            {value: 100, name: 'total', label: {show: false}, itemStyle: {color: Colors.brush}},
            {value: prc, name: `${prc}% ${name}`, itemStyle: {color: Colors.recovered}}
          ]
        },
      ]
    };

    return (
      <ReactEcharts option={chartOptions} />
    );
  }
}
