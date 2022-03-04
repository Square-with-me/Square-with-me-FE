// chart.js
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const TodayTime = () => {
  const data = {
    labels: ['뷰타', '운동', '스터디', '상담', '문화', '기타'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100, 60, 10, 90],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'red',
          'blue',
          'yellow',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const option = {
    plugins: {
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
