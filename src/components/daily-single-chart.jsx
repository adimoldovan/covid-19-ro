import React, {Component} from "react";
import ReactEcharts from "echarts-for-react";
import data from '../ro-data.json'
import {ChartOptions} from "../config/constants";

export default class DailySingleBarChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { timeline, color, name } = this.props;

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
                    name: name,
                    type: 'bar',
                    stack: '1',
                    emphasis: {
                        focus: 'series'
                    },
                    color: color,
                    data: timeline
                }
            ]
        };

        return (
            <ReactEcharts option={chartOptions}/>
        )
    }
}
