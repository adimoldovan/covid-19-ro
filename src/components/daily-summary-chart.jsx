import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import data from '../data/data.json'
import {ChartOptions, Colors} from '../config/constants'

export default class DailySummaryChart extends Component {
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
          type: 'value',
          max: 15000
        }
      ],
      dataZoom: [{
        type: 'inside',
        start: 60,
        end: 100
      }, {
        start: 60,
        end: 100
      }],
      series: [
        {
          name: 'new confirmed cases',
          type: 'line',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.confirmed,
          data: data.map(function (e) {
            return e.noNewConfirmed;
          })
        },
        {
          name: 'new recovered cases',
          type: 'line',
          stack: '2',
          emphasis: {
            focus: 'series'
          },
          color: Colors.recovered,
          data: data.map(function (e) {
            return e.noNewRecovered;
          })
        },
      ]
    };

    return (
      <ReactEcharts option={chartOptions} />
    )
  }
}
