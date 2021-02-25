const fs = require("fs");
const fetch = require('node-fetch');
const dateLaZiData = require('../latestData.json')

function processData(dateLaZiData, graphsRoData) {
    const population = 19414458;
    const data = [];

    const timelineData = Object.entries(dateLaZiData.historicalData).reverse()
    const current = dateLaZiData.currentDayStats;

    // last day
    const noActive = current.numberInfected - current.numberCured - current.numberDeceased
    const noClosedCases = current.numberCured + current.numberDeceased
    const totalConfirmedYesterday = timelineData[timelineData.length-1][1].numberInfected;
    const totalRecoveredYesterday = timelineData[timelineData.length-1][1].numberCured;
    const totalDeceasedYesterday = timelineData[timelineData.length-1][1].numberDeceased;

    const lastDay = {
        date: current.parsedOnString,
        noConfirmed: current.numberInfected,
        noActive: noActive,
        prcActive: (noActive/current.numberInfected*100).toFixed(1),
        noRecovered: current.numberCured,
        prcRecoveredOfTotal: (current.numberCured/current.numberInfected*100).toFixed(1),
        prcRecoveredOfClosed: (current.numberCured/noClosedCases*100).toFixed(1),
        noDeceased: current.numberDeceased,
        prcDeceasedOfTotal: (current.numberDeceased/current.numberInfected*100).toFixed(1),
        prcDeceasedOfClosed: (current.numberDeceased/noClosedCases*100).toFixed(1),
        noClosedCases: noClosedCases,
        noNewConfirmed: current.numberInfected - totalConfirmedYesterday,
        noNewRecovered: current.numberCured - totalRecoveredYesterday,
        noNewDeceased: current.numberDeceased - totalDeceasedYesterday
    }

    // calculate vaccines totals
    lastDay.noVaccineDosesAdministered = 0;
    lastDay.noImmunized = 0;

    // vaccines from historical data
    for (const dayEntry in dateLaZiData.historicalData) {
        for (const vaccine in dateLaZiData.historicalData[dayEntry].vaccines) {
            lastDay.noVaccineDosesAdministered += dateLaZiData.historicalData[dayEntry].vaccines[vaccine].total_administered;
            lastDay.noImmunized += dateLaZiData.historicalData[dayEntry].vaccines[vaccine].immunized;
        }
    }

    lastDay.prcImmunized = (lastDay.noImmunized / population * 100).toFixed(1);

    // each day
    for (let i = 0; i <= timelineData.length - 1; i++) {
        const totalConfirmedToday = timelineData[i][1].numberInfected;
        const totalRecoveredToday = timelineData[i][1].numberCured;
        const totalDeceasedToday = timelineData[i][1].numberDeceased;
        let totalConfirmedYesterday = 0;
        let totalRecoveredYesterday = 0;
        let totalDeceasedYesterday = 0;

        if (i > 0)
        {
            totalConfirmedYesterday = timelineData[i-1][1].numberInfected;
            totalRecoveredYesterday = timelineData[i-1][1].numberCured;
            totalDeceasedYesterday = timelineData[i-1][1].numberDeceased;
        }

        const noActive = timelineData[i][1].numberInfected - timelineData[i][1].numberCured - timelineData[i][1].numberDeceased
        const noClosedCases = timelineData[i][1].numberCured + timelineData[i][1].numberDeceased

        const day = {
            date: timelineData[i][0],
            noConfirmed: totalConfirmedToday,
            noActive: noActive,
            prcActive: (noActive/totalConfirmedToday*100).toFixed(1),
            noRecovered: timelineData[i][1].numberCured,
            prcRecoveredOfTotal: (timelineData[i][1].numberCured/totalConfirmedToday*100).toFixed(1),
            prcRecoveredOfClosed: (timelineData[i][1].numberCured/noClosedCases*100).toFixed(1),
            noDeceased: timelineData[i][1].numberDeceased,
            prcDeceasedOfTotal: (timelineData[i][1].numberDeceased/totalConfirmedToday*100).toFixed(1),
            prcDeceasedOfClosed: (timelineData[i][1].numberDeceased/noClosedCases*100).toFixed(1),
            noClosedCases: noClosedCases,
            noVaccineDosesAdministered: timelineData[i][1].numberTotalDosesAdministered,
            noNewConfirmed: totalConfirmedToday - totalConfirmedYesterday,
            noNewRecovered: totalRecoveredToday - totalRecoveredYesterday,
            noNewDeceased: totalDeceasedToday - totalDeceasedYesterday
        }

        data.push(day);
    }

    data.push(lastDay);

    return data;
}

// fetch('https://d35p9e4fm9h3wo.cloudfront.net/latestData.json')
//     .then((res) => res.json())
//     .then((result) => {
//         // write to file
//         fs.writeFileSync('src/ro-data.json', JSON.stringify(cleanData(result)))
//     });

fs.writeFileSync('src/ro-data.json', JSON.stringify(processData(dateLaZiData, {}),undefined, 2))
