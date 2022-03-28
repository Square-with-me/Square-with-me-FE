// chart.js
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const TodayTime = () => {
  const [dayList, setDayList] = useState(null);
  const today = new Date()
  const date = today.getDate();

  useEffect(() => {
    const day = JSON.parse(localStorage.getItem('time'));
    if (day.date === date) {setDayList([day[1], day[2], day[3], day[4], day[5], day[6]])};
  }, []);

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
            let label =
              context.label + ': ' + Math.floor(context.formattedValue) + '분';
            return label;
          },
        },
      },
    },
  };

  const emptyData = {
    labels: ['오늘 함께한 시간이 없어요.'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#808080'],
        hoverOffset: 4,
      },
    ],
  };
  const emptyOption = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label;
            return label;
          },
        },
      },
    },
  };

  if (
    dayList === null ||
    dayList === [0, 0, 0, 0, 0, 0] ||
    dayList === [0, 0, 0, 0, 0]
  )
    return <Pie data={emptyData} options={emptyOption} />;
  return <Pie data={data} options={option} />;
};

export default TodayTime;
