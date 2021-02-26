const fs = require('fs');
const fetch = require('sync-fetch');
const dateLaZiURL = 'https://d35p9e4fm9h3wo.cloudfront.net/latestData.json';
const graphsRoMainURL = 'https://www.graphs.ro/json.php';
const graphsRoVaccineURL = 'https://www.graphs.ro/vaccinare_json.php';
const population = 19414458;
const countiesData = {
  'AB': {'name':'Alba', 'timeline': []},
  'AR': {'name':'Arad', 'timeline': []},
  'AG': {'name':'Arges', 'timeline': []},
  'BC': {'name':'Bacau', 'timeline': []},
  'BH': {'name':'Bihor', 'timeline': []},
  'BN': {'name':'Bistrita Nasaud', 'timeline': []},
  'BT': {'name':'Botosani', 'timeline': []},
  'BV': {'name':'Brasov', 'timeline': []},
  'BR': {'name':'Braila', 'timeline': []},
  'BZ': {'name':'Buzau', 'timeline': []},
  'CS': {'name':'Caras-Severin', 'timeline': []},
  'CL': {'name':'Calarasi', 'timeline': []},
  'CJ': {'name':'Cluj', 'timeline': []},
  'CT': {'name':'Constanta', 'timeline': []},
  'CV': {'name':'Covasna', 'timeline': []},
  'DB': {'name':'Dambovita', 'timeline': []},
  'DJ': {'name':'Dolj', 'timeline': []},
  'GL': {'name':'Galati', 'timeline': []},
  'GR': {'name':'Giurgiu', 'timeline': []},
  'GJ': {'name':'Gorj', 'timeline': []},
  'HR': {'name':'Harghita', 'timeline': []},
  'HD': {'name':'Hunedoara', 'timeline': []},
  'IL': {'name':'Ialomita', 'timeline': []},
  'IS': {'name':'Iasi', 'timeline': []},
  'IF': {'name':'Ilfov', 'timeline': []},
  'MM': {'name':'Maramures', 'timeline': []},
  'MH': {'name':'Mehedinti', 'timeline': []},
  'MS': {'name':'Mures', 'timeline': []},
  'NT': {'name':'Neamt', 'timeline': []},
  'OT': {'name':'Olt', 'timeline': []},
  'PH': {'name':'Prahova', 'timeline': []},
  'SM': {'name':'Satu Mare', 'timeline': []},
  'SJ': {'name':'Salaj', 'timeline': []},
  'SB': {'name':'Sibiu', 'timeline': []},
  'SV': {'name':'Suceava', 'timeline': []},
  'TR': {'name':'Teleorman', 'timeline': []},
  'TM': {'name':'Timisoara', 'timeline': []},
  'TL': {'name':'Tulcea', 'timeline': []},
  'VS': {'name':'Vaslui', 'timeline': []},
  'VL': {'name':'Valcea', 'timeline': []},
  'VN': {'name':'Vrancea', 'timeline': []},
  'B': {'name':'Bucuresti', 'timeline': []},
};

processData();

function fetchData(url, name) {
  const fetchedData = fetch(url).json();
  if (!process.env.CI) {
    fs.writeFileSync(`./bin/tmp/${name}.json`, JSON.stringify(fetchedData, undefined, 2));
  }
  return fetchedData;
}

function processData() {
  let rawData;
  if (process.env.CI) {
    rawData = {
      graphsRoMainData: fetchData(graphsRoMainURL, 'graphsRoMainData'),
      graphsRoVaccineData: fetchData(graphsRoVaccineURL, 'graphsRoVaccineData'),
      dateLaZiData: fetchData(dateLaZiURL, 'dateLaZiData'),
    };
  }
  else {
    rawData = {
      graphsRoMainData: require('./tmp/graphsRoMainData.json'),
      graphsRoVaccineData: require('./tmp/graphsRoVaccineData.json'),
      dateLaZiData: require('./tmp/dateLaZiData.json'),
    };
  }

  const mainSeries = rawData.graphsRoMainData.covid_romania;
  const vaccineSeries = rawData.graphsRoVaccineData.covid_romania_vaccination;
  const secondarySeries = rawData.dateLaZiData.historicalData;
  // push currentDayStats into series as a normal day
  secondarySeries[rawData.dateLaZiData.currentDayStats.parsedOnString] = rawData.dateLaZiData.currentDayStats;

  const roData = [];

  for (const d of mainSeries) {
    const noActive = d.total_cases - d.total_recovered - d.total_deaths;
    const noClosed = d.total_recovered + d.total_deaths;

    let vaccineData = vaccineSeries.filter(function (element) {return element.data_date ===  d.reporting_date;})[0];

    // when there is no vaccine data for today, use the last data available
    if (!vaccineData) {
      vaccineData = vaccineSeries[0];
    }

    const noImmunized = (vaccineData === undefined) ? 0 : vaccineData.total_2;

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
      prcImmunized: (noImmunized/population*100).toFixed(1),
      noNewTestsTotal: d.new_tests_today,
      noNewTestsCaseDef: d.tests_for_case_definition,
      noNewTestsOnRequest: d.tests_upon_request,
      noNewTestsOldResults: d.tests_done_before_today_and_reported_today
    };

    // prepare counties data
    Object.keys(countiesData).forEach(function(key) {

      if (!secondarySeries[d.reporting_date]) {
        return;
      }

      if (!secondarySeries[d.reporting_date].countyInfectionsNumbers) {
        return;
      }

      if (!secondarySeries[d.reporting_date].incidence) {
        return;
      }

      const dayForCounty = {
        date: d.reporting_date,
        noConfirmed: secondarySeries[d.reporting_date].countyInfectionsNumbers[key],
        incidence: secondarySeries[d.reporting_date].incidence[key]
      };
      countiesData[key].timeline.push(dayForCounty);
    });

    roData.push(day);
  }

  roData.reverse();

  fs.writeFileSync('src/data/data.json', JSON.stringify(roData,undefined, 2));
  fs.writeFileSync('src/data/counties.json', JSON.stringify(countiesData,undefined, 2));
}


