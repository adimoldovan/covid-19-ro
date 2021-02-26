import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {ChartOptions, Colors} from '../config/constants';
import {Col, Row} from 'react-bootstrap';

export default class County extends Component {
  render() {
    const { county } = this.props;

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
          })
        }
      ]
    };

    return (
      <Col sm={6}>
        <h1>{county.name}</h1>
        <Row className='justify-content-between'>
          <Col lg={4}>
            <div className='summary-box center'>
              <span className='description'>{county.timeline[0].noConfirmed}</span>
              <br />
              <span className='fine'>total cases</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box center'>
              <span className='description'>{county.timeline[0].incidence}%</span>
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
