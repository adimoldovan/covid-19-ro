import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {ChartOptions, Colors} from '../config/constants';
import data from '../data/data.json';

export default class DailyTestsChart extends Component {
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
          name: 'total tests',
          type: 'bar',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.tests,
          data: data.map(function (e) {
            return e.noNewTestsTotal;
          })
        },
        {
          name: 'tests on case definition',
          type: 'bar',
          stack: '2',
          emphasis: {
            focus: 'series'
          },
          color: Colors.closed,
          data: data.map(function (e) {
            return e.noNewTestsCaseDef;
          })
        },
        {
          name: 'tests on request',
          type: 'bar',
          stack: '2',
          emphasis: {
            focus: 'series'
          },
          color: Colors.active,
          data: data.map(function (e) {
            return e.noNewTestsOnRequest;
          })
        },
        {
          name: 'older tests reported today',
          type: 'bar',
          stack: '2',
          emphasis: {
            focus: 'series'
          },
          color: Colors.brush,
          data: data.map(function (e) {
            return e.noNewTestsOldResults;
          })
        }
      ]
    };

    return (
      <ReactEcharts option={chartOptions} />
    );
  }
}
