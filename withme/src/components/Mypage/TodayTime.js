// chart.js
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const TodayTime = () => {
  const data = {
    labels: ['뷰티', '운동', '스터디', '문화', '상담', '기타'],
    datasets: [
      {
        data: [300, 50, 100, 60, 150, 10],
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
            let label = context.label + ': ' + context.formattedValue + 's';
            // 초를 HH MM SS로 표현하는 정규식함수 파일을 만들어서 변경하자!
            return label;
          },
        },
      },
    },
  };

  return <Pie data={data} options={option} />;
};

export default TodayTime;
