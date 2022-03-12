// chart.js
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const WeekTime = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: '뷰티',
        backgroundColor: '#FCEDB7',
        stack: 'Stack 0',
        data: [66, 93, 31, 76, 39, 75, 36],
      },
      {
        label: '운동',
        backgroundColor: '#FFC9C9',
        stack: 'Stack 0',
        data: [76, 203, 41, 86, 49, 85, 46],
      },
      {
        label: '스터디',
        backgroundColor: '#B9E8B5',
        stack: 'Stack 0',
        data: [76, 103, 41, 86, 49, 85, 46],
      },
      {
        label: '문화',
        backgroundColor: '#B5E3F8',
        stack: 'Stack 0',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
      {
        label: '기타',
        backgroundColor: '#B7CEFC',
        stack: 'Stack 0',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
    ],
  };
  const option = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        scaleLabel: {
          display: true,
          labelString: 'Task Count',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true,
        custom: function (tooltipModel) {},
      },
      animation: {
        duration: 1000,
        currentStep: 1,
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
    },
  };
  return <Bar data={data} options={option} style={{ height: '100%' }} />;
};
export default WeekTime;
