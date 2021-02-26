const fs = require('fs');
const fetch = require('node-fetch');
const dateLaZiData = require('./tmp/dateLaZiData.json')
const graphsRoMainData = require('./tmp/graphsRoData.json')
const graphsRoVaccineData = require('./tmp/graphsRoVaccineData.json')
const dateLaZiURL = 'https://d35p9e4fm9h3wo.cloudfront.net/latestData.json'
const graphsRoMainURL = 'https://www.graphs.ro/json.php'
const graphsRoVaccineURL = 'https://www.graphs.ro/vaccinare_json.php'
const population = 19414458;

function processData(dateLaZiData, graphsRoMainData, graphsRoVaccineData) {

  const mainSeries = graphsRoMainData.covid_romania
  const vaccineSeries = graphsRoVaccineData.covid_romania_vaccination
  const data = [];

  for (const d of mainSeries) {
    const noActive = d.total_cases - d.total_recovered - d.total_deaths
    const noClosed = d.total_recovered + d.total_deaths

    const vaccineData = vaccineSeries.filter(function(element) {return element.data_date ===  d.reporting_date})[0];
    const noImmunized = (vaccineData === undefined) ? 0 : vaccineData.total_2

    const day = {
      date: d.reporting_date,
      noConfirmed: d.total_cases,
      noActive,
      prcActive: (noActive/d.total_cases*100).toFixed(1),
      noIC: d.intensive_care_right_now,
      noRecovered: d.total_recovered,
      prcRecoveredOfTotal: (d.total_recovered/d.total_cases*100).toFixed(1),
      prcRecoveredOfClosed: (d.total_recovered/noClosed*100).toFixed(1),
      noDeceased: d.total_deaths,
      prcDeceasedOfTotal: (d.total_deaths/d.total_cases*100).toFixed(1),
      prcDeceasedOfClosed: (d.total_deaths/noClosed*100).toFixed(1),
      noClosed,
      noNewConfirmed: d.new_cases_today,
      noNewRecovered: d.new_recovered_today,
      noNewDeceased: d.new_deaths_today,
      noVaccineDosesAdministered: (vaccineData === undefined) ? 0 : vaccineData.total_doze,
      noImmunized,
      prcImmunized: (noImmunized/population*100).toFixed(1)
    }

    data.push(day);
  }

  data.reverse();

  return data;
}

fetch(dateLaZiURL)
  .then((res) => res.json())
  .then((result) => {
    // write to file
    fs.writeFileSync('bin/tmp/dateLaZiData.json', JSON.stringify(result,undefined,2))
  });

fetch(graphsRoMainURL)
  .then((res) => res.json())
  .then((result) => {
    // write to file
    fs.writeFileSync('bin/tmp/graphsRoData.json', JSON.stringify(result,undefined,2))
  });
fetch(graphsRoVaccineURL)
  .then((res) => res.json())
  .then((result) => {
    // write to file
    fs.writeFileSync('bin/tmp/graphsRoVaccineData.json', JSON.stringify(result,undefined,2))
  });

fs.writeFileSync(
  'src/data/data.json',
  JSON.stringify(processData(dateLaZiData, graphsRoMainData,graphsRoVaccineData),undefined, 2))
