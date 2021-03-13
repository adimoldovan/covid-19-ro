import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {ChartOptions, Colors} from '../config/constants';
import {Col, Row} from 'react-bootstrap';
import counties from '../data/counties.json';
import formattedNumber from '../utils';

export default class County extends Component {
  render() {
    const { countyKey } = this.props;
    const county = counties[countyKey];

    const totalConfirmed = county.timeline[0].noConfirmed;
    const incidenceRate = county.timeline[0].incidence;
    const newCases = county.timeline[0].noConfirmed - county.timeline[1].noConfirmed;

    county.timeline.reverse();

    const chartOptions = {
      tooltip: ChartOptions.tooltip,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: county.timeline.map(function (e) {
            return e.date;
          })
        }
      ],
      yAxis: [
        {
          type: 'value',
          max: 10,
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
          name: 'incidence',
          type: 'bar',
          stack: '1',
          emphasis: {
            focus: 'series'
          },
          color: Colors.confirmed,
          data: county.timeline.map(function (e) {
            return e.incidence;
          }),
          markLine: {
            symbol: ['none','none'],
            lineStyle: {
              color: 'red',
            },
            label: {
              color: 'red'
            },
            data: [
              {
                yAxis: 1.5
              },
              {
                yAxis: 3
              }
            ]
          }
        }
      ]
    };

    return (
      <Col sm={6}>
        <h1>{county.name}</h1>
        <Row className='justify-content-between'>
          <Col lg={4}>
            <div className='summary-box center'>
              <span className='description'>{formattedNumber(totalConfirmed)}</span>
              <br />
              <span className='fine'>total cases</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box center'>
              <span className='description'>{formattedNumber(newCases)}</span>
              <br />
              <span className='fine'>new cases</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box center'>
              <span className='description'>{incidenceRate}%</span>
              <br />
              <span className='fine'>incidence</span>
            </div>
          </Col>
        </Row>
        <ReactEcharts option={chartOptions} />
        <hr />
      </Col>
    );
  }
}
