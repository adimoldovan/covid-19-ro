import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {ChartOptions, Colors} from '../config/constants';
import data from '../data/data.json';

export default class DailyVaccinesChart extends Component {
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
      dataZoom: [
        {
          type: 'inside',
          start: 80,
          end: 100
        }, {
          start: 80,
          end: 100
        }],
      series: [
        {
          name: 'total vaccine shots',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          color: Colors.closed,
          data: data.map(function (e) {
            return e.noNewVaccineDosesAdministered;
          })
        },
        {
          name: 'Pfizer-BioNtech',
          type: 'bar',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.active,
          data: data.map(function (e) {
            return e.noNewPfizer;
          })
        },
        {
          name: 'Moderna',
          type: 'bar',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.brush,
          data: data.map(function (e) {
            return e.noNewModerna;
          })
        },
        {
          name: 'Astra Zeneca',
          type: 'bar',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.confirmed,
          data: data.map(function (e) {
            return e.noNewAstraZeneca;
          })
        }
      ]
    };

    return (
      <ReactEcharts option={chartOptions} />
    );
  }
}
