const Colors =
{
  confirmed: '#ffc658',
  recovered: '#82ca9d',
  deceased: '#1c1c1c',
  active: '#fca085',
  closed: '#8884d8',
  positivity: '#C889A3',
  brush: '#919191',
  tests: '#719df3'
};

const ChartOptions = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    }
  },
};

const population = 19414458;

module.exports = {
  Colors,
  ChartOptions,
  population
};
