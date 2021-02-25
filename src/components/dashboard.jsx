import React, {Component} from 'react';
import data from '../ro-data.json'
import {Col, Container, Row} from "react-bootstrap";
import formattedNumber from "../utils";
import TotalCasesChart from "./chart-totals-infected-active";
import DailySummaryChart from "./daily-summary-chart";
import DailySingleBarChart from "./daily-single-chart";
import {Colors} from "../config/constants";

export default class Countries extends Component {
    componentDidMount() {
    }

    render() {
        const today = data[data.length-1];

        return (
            <Container fluid>
                <Row className="justify-content-between header">
                    <Col className="text-left"><h1>Covid 19 in Romania</h1></Col>
                </Row>
                <hr/>
                <Row>
                    <Col className="text-right">Last update: {today.date}</Col>
                </Row>
                {/* Top charts */}
                <Row className="spaced-row">
                    <Col sm={6}>
                        <TotalCasesChart timeline={data}/>
                    </Col>
                    <Col sm={6}>
                        <DailySummaryChart timeline={data}/>
                    </Col>
                </Row>
                {/* Summary boxes */}
                <Row className="justify-content-between header">
                    <Col lg={4}>
                        <div className="summary-box">
                            <span className="number">{formattedNumber(today.noConfirmed)}</span>
                            <br/>
                            <span className="description">confirmed cases</span>
                            <br/>
                            <span className="fine">&nbsp;</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="summary-box">
                            <span className="number">{formattedNumber(today.noActive)}</span>
                            <br/>
                            <span className="description">active cases</span>
                            <br/>
                            <span className="fine">{formattedNumber(today.prcActive)} %</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="summary-box ">
                            <span className="number">{formattedNumber(today.noDeceased)}</span>
                            <br/>
                            <span className="description">deceased</span>
                            <br/>
                            <span className="fine">{formattedNumber(today.prcDeceasedOfClosed)} % out of closed, {formattedNumber(today.prcDeceasedOfTotal)} % out of total</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="summary-box ">
                            <span className="number">{formattedNumber(today.noRecovered)}</span>
                            <br/>
                            <span className="description">recovered</span>
                            <br/>
                            <span className="fine">{formattedNumber(today.prcRecoveredOfClosed)} % out of closed, {formattedNumber(today.prcRecoveredOfTotal)} % out of total</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="summary-box ">
                            <span
                                className="number">{formattedNumber(today.noVaccineDosesAdministered)}</span>
                            <br/>
                            <span className="description">vaccine doses administered</span>
                            <br/>
                            <span className="fine">&nbsp;</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="summary-box ">
                            <span
                                className="number">{formattedNumber(today.noImmunized)}</span>
                            <br/>
                            <span className="description">immunized</span>
                            <br/>
                            <span className="fine">{formattedNumber(today.prcImmunized)} %</span>
                        </div>
                    </Col>
                </Row>
                <hr/>
                {/* Main charts */}
                <Row className="spaced-row">
                    <Col sm={2}>
                        <div className="summary-box left">
                            <span className="number">{formattedNumber(today.noNewConfirmed)}</span>
                            <br/>
                            <span className="description">confirmed new</span>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <DailySingleBarChart timeline={data.map(function (e) {
                            return e.noNewConfirmed;
                        })} color={Colors.confirmed} name="confirmed new"/>
                    </Col>
                </Row>
                <Row className="spaced-row">
                    <Col sm={2}>
                        <div className="summary-box left">
                            <span className="number">{formattedNumber(today.noNewDeceased)}</span>
                            <br/>
                            <span className="description">deceased new</span>
                        </div>
                    </Col>
                    <Col sm={10}>
                            <DailySingleBarChart timeline={data.map(function (e) {
                                return e.noNewDeceased;
                            })} color={Colors.deceased} name="deceased new"/>
                    </Col>
                </Row>
                <Row className="spaced-row">
                    <Col sm={2}>
                        <div className="summary-box left">
                            <span className="number">{formattedNumber(today.noNewRecovered)}</span>
                            <br/>
                            <span className="description">deceased new</span>
                        </div>
                    </Col>
                    <Col sm={10}>
                            <DailySingleBarChart timeline={data.map(function (e) {
                                return e.noNewRecovered;
                            })} color={Colors.recovered} name="recovered new"/>
                    </Col>
                </Row>

                <hr/>
                {/* Counties */}
                {/*{lastCasesDay.county_data.map((county, index) => (*/}
                {/*    <Row className="spaced-row" key={index}>*/}
                {/*        <Col>*/}
                {/*            <div className="summary-box county-box left">*/}
                {/*                <span className="description county-name ">{county.county_name}</span>*/}
                {/*                <br/>*/}
                {/*                <span className="number">{county.total_cases} ({county.cases_1_k_pop} &#8240;)</span>*/}
                {/*                <br/>*/}
                {/*                <span className="description">total cases</span>*/}
                {/*            </div>*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <ResponsiveContainer height={250}>*/}
                {/*                <BarChart data={counties.find(c => c.county_name === county.county_name).timeline}*/}
                {/*                          style={{margin: "0 auto"}}>*/}
                {/*                    <XAxis dataKey="reporting_date"/>*/}
                {/*                    <YAxis orientation="right" domain={["0", 'dataMax+10']}/>*/}
                {/*                    <Tooltip/>*/}
                {/*                    <Brush dataKey="reporting_date" travellerWidth={1} stroke={Utils.BRUSH_COLOR}*/}
                {/*                           fill="none" height={20}/>*/}
                {/*                    <Bar name="confirmed" type="monotone"*/}
                {/*                         dataKey="new_cases"*/}
                {/*                         stroke="none"*/}
                {/*                         fillOpacity={0.5} fill={Utils.CONFIRMED_COLOR}/>*/}
                {/*                </BarChart>*/}
                {/*            </ResponsiveContainer>*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <ResponsiveContainer height={250}>*/}
                {/*                <AreaChart data={counties.find(c => c.county_name === county.county_name).timeline}*/}
                {/*                           style={{margin: "0 auto"}}>*/}
                {/*                    <XAxis dataKey="reporting_date"/>*/}
                {/*                    <YAxis orientation="right" domain={["0", 'dataMax+10']}/>*/}
                {/*                    <Tooltip/>*/}
                {/*                    <Brush dataKey="reporting_date" travellerWidth={1} stroke={Utils.BRUSH_COLOR}*/}
                {/*                           fill="none" height={20}/>*/}
                {/*                    <Area name="confirmed" type="monotone"*/}
                {/*                          dataKey="total_cases"*/}
                {/*                          stroke="none"*/}
                {/*                          fillOpacity={0.5} fill={Utils.CONFIRMED_COLOR}/>*/}
                {/*                </AreaChart>*/}
                {/*            </ResponsiveContainer>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*))}*/}
                <hr/>
                {/* Footer */}
                <Row className="spaced-row">
                    <Col className="text-right"><p>Data sources:</p>
                        <a href="https://datelazi.ro">datelazi.ro</a><br/>
                        <a href="https://stirioficiale.ro">stirioficiale.ro</a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
