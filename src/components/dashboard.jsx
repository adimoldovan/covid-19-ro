import React, {Component} from 'react';
import data from '../data/data.json';
import counties from '../data/counties.json';
import {Col, Container, Row} from 'react-bootstrap';
import formattedNumber from '../utils';
import TotalCasesChart from './chart-totals-infected-active';
import DailySummaryChart from './daily-summary-chart';
import DailySingleBarChart from './daily-single-chart';
import {Colors} from '../config/constants';
import DailyTestsChart from './daily-tests-chart';
import County from './county';
import DailyVaccinesChart from './daily-vaccines-chart';
import DailyCountiesIncidenceBarChart from './daily-counties-incidence-chart';

export default class Dashboard extends Component {
  render() {
    const today = data[data.length - 1];

    let newlyVaccinated = today.noNewVaccineDosesAdministered;

    // if the vaccine data is not available for today, we use yesterday data
    if(newlyVaccinated == null) {
      newlyVaccinated = data[data.length - 2].noNewVaccineDosesAdministered;
    }

    // get counties current incidence rate
    const countiesIncidence = [];
    Object.entries(counties).map(([key, val]) =>
      countiesIncidence.push({key: key, name: val.name, incidence: val.timeline[0].incidence}));
    // sort them desc by incidence rate
    countiesIncidence.sort((a,b) => b.incidence - a.incidence);

    return (
      <Container fluid>
        <hr />
        <Row className='justify-content-between header'>
          <Col className='text-left'><h1>Covid 19 in Romania</h1></Col>
        </Row>
        <hr />
        <Row>
          <Col className='text-right'>Last update: {today.date}</Col>
        </Row>
        {/* Top charts */}
        <Row className='spaced-row'>
          <Col sm={6}>
            <TotalCasesChart timeline={data} />
          </Col>
          <Col sm={6}>
            <DailySummaryChart timeline={data} />
          </Col>
        </Row>
        {/* Summary boxes */}
        <Row className='justify-content-between header'>
          <Col lg={4}>
            <div className='summary-box'>
              <span className='number'>{formattedNumber(today.noConfirmed)}</span>
              <br />
              <span className='description'>confirmed cases</span>
              <br />
              <span className='fine'>&nbsp;</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box'>
              <span className='number'>{formattedNumber(today.noActive)}</span>
              <br />
              <span className='description'>active cases</span>
              <br />
              <span className='fine'>{formattedNumber(today.prcActive)} %</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box '>
              <span className='number'>{formattedNumber(today.noDeceased)}</span>
              <br />
              <span className='description'>deceased</span>
              <br />
              <span className='fine'>
                {formattedNumber(today.prcDeceasedOfClosed)} % out of closed,&nbsp;
                {formattedNumber(today.prcDeceasedOfTotal)} % out of total
              </span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box '>
              <span className='number'>{formattedNumber(today.noRecovered)}</span>
              <br />
              <span className='description'>recovered</span>
              <br />
              <span className='fine'>
                {formattedNumber(today.prcRecoveredOfClosed)} % out of closed,&nbsp;
                {formattedNumber(today.prcRecoveredOfTotal)} % out of total
              </span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box '>
              <span
                className='number'
              >{formattedNumber(today.noVaccineDosesAdministered)}
              </span>
              <br />
              <span className='description'>vaccine doses administered</span>
              <br />
              <span className='fine'>&nbsp;</span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='summary-box '>
              <span
                className='number'
              >{formattedNumber(today.noImmunized)}
              </span>
              <br />
              <span className='description'>immunized</span>
              <br />
              <span className='fine'>{formattedNumber(today.prcImmunized)} %</span>
            </div>
          </Col>
        </Row>
        <hr />
        {/* Main charts */}
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(newlyVaccinated)}</span>
              <br />
              <span className='description'>newly vaccinated</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailyVaccinesChart />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(today.noNewConfirmed)}</span>
              <br />
              <span className='description'>newly confirmed</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailySingleBarChart
              xSeries={data.map(function (e) {
                return e.date;
              })}
              ySeries={data.map(function (e) {
                return e.noNewConfirmed;
              })}
              color={Colors.confirmed} name='confirmed'
            />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(today.noIC)}</span>
              <br />
              <span className='description'>critical cases</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailySingleBarChart
              xSeries={data.map(function (e) {
                return e.date;
              })}
              ySeries={data.map(function (e) {
                return e.noIC;
              })} color={Colors.active} name='patients in intensive care'
            />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(today.noNewDeceased)}</span>
              <br />
              <span className='description'>newly deceased</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailySingleBarChart
              xSeries={data.map(function (e) {
                return e.date;
              })}
              ySeries={data.map(function (e) {
                return e.noNewDeceased;
              })} color={Colors.deceased} name='deceased'
            />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(today.noNewTestsTotal)}</span>
              <br />
              <span className='description'>newly tested</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailyTestsChart />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{formattedNumber(today.noNewRecovered)}</span>
              <br />
              <span className='description'>newly recovered</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailySingleBarChart
              xSeries={data.map(function (e) {
                return e.date;
              })}
              ySeries={data.map(function (e) {
                return e.noNewRecovered;
              })}
              color={Colors.recovered} name='recovered'
            />
          </Col>
        </Row>
        <Row className='spaced-row align-items-center'>
          <Col sm={2}>
            <div className='summary-box left'>
              <span className='number'>{countiesIncidence[0].incidence}</span>
              <br />
              <span className='description'>highest county incidence</span>
            </div>
          </Col>
          <Col sm={10}>
            <DailyCountiesIncidenceBarChart
              data={countiesIncidence}
            />
          </Col>
        </Row>
        <hr />
        {/* Counties */}
        <Row className='spaced-row'>
          {
            countiesIncidence.map((county, index) =>
              <County countyKey={county.key} key={index} />
            )
          }
        </Row>
        <hr />
        {/* Footer */}
        <Row className='spaced-row'>
          <Col className='text-right'><p>Data sources:</p>
            <a href='https://graphs.ro'>graphs.ro</a><br />
            <a href='https://datelazi.ro'>datelazi.ro</a><br />
            <a href='https://stirioficiale.ro'>stirioficiale.ro</a>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }
}
