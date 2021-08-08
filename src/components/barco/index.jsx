import React from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    }, title: {
      display: true,
      text: 'Top 5 countries with the most population'
    },
  }
};

const HorizontalBarChart = (props) => (
  <div style={{ height: "300", display: "flex" }}>
    <Bar
      width='1200'
      height='300'
      data={{
        labels: props.olabels.slice(0, 5),
        datasets: [
          {
            label: 'population',
            data: props.ovalues.slice(0, 5),
            backgroundColor: [
              '#ff6384',
              '#36a2eb',
              '#cc65fe',
              '#ffce56'
            ]
          },
        ],
      }}
      options={options} />
  </div>
);

export default HorizontalBarChart;