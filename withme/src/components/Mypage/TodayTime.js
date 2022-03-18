// chart.js
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const TodayTime = () => {
  const [dayList, setDayList] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const day = JSON.parse(localStorage.getItem('time'));
    if (day) setDayList([day[1], day[2], day[3], day[4], day[5], day[6]]);
    else return;
  }, [setDayList]);
  const data = {
    labels: ['뷰티', '운동', '스터디', '문화', '상담', '기타'],
    datasets: [
      {
        data: dayList,
        backgroundColor: [
          '#FCEDB7',
          '#FFC9C9',
          '#B9E8B5',
          '#B5E3F8',
          '#FFD9B6',
          '#B7CEFC',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const option = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label + ': ' + context.formattedValue + '분';
            return label;
          },
        },
      },
    },
  };

  return <Pie data={data} options={option} />;
};

export default TodayTime;
