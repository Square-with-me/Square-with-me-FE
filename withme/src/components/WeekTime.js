// chart.js
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const WeekTime = () => {
  //

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: '뷰티',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        stack: 'Stack 0',
        data: [66, 93, 31, 76, 39, 75, 36],
      },
      {
        label: '운동',
        backgroundColor: 'blue',
        stack: 'Stack 0',
        data: [76, 203, 41, 86, 49, 85, 46],
      },
      {
        label: '스터디',
        backgroundColor: 'yellow',
        stack: 'Stack 0',
        data: [76, 103, 41, 86, 49, 85, 46],
      },
      {
        label: '상담',
        backgroundColor: 'skyblue',
        stack: 'Stack 0',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
      {
        label: '문화',
        backgroundColor: 'gold',
        stack: 'Stack 0',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
      {
        label: '기타',
        backgroundColor: 'red',
        stack: 'Stack 0',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
    ],
  };
  const option = {
    title: {
      display: true,
      text: 'Wisdom Application My To Do',
    },
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
  };
  return <Bar data={data} options={option} />;
};
export default WeekTime;
