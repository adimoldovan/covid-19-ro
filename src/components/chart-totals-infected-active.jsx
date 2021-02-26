import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import data from '../data/data.json'
import {ChartOptions, Colors} from '../config/constants'

export default class TotalCasesChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const chartOptions = {
      tooltip: ChartOptions.tooltip,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data.map(function (e) {
            return e.date;
          })
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 100
      }],
      series: [
        {
          name: 'confirmed cases',
          type: 'line',
          stack: '1',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          color: Colors.confirmed,
          data: data.map(function (e) {
            return e.noConfirmed;
          })
        },
        {
          name: 'active cases',
          type: 'line',
          stack: '2',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          color: Colors.active,
          data: data.map(function (e) {
            return e.noActive;
          })
        },
      ]
    };

    return (
      <ReactEcharts option={chartOptions} />
    )
  }
}
