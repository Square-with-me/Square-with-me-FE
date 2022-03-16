import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const WeekTime = ({ week }) => {
  const {
    beautyRecord,
    counselingRecord,
    cultureRecord,
    etcRecord,
    sportsRecord,
    studyRecord,
  } = week;

  const [beauty, setBeauty] = useState([]);
  const [counseling, setCounseling] = useState([]);
  const [culture, setCulture] = useState([]);
  const [etc, setEtc] = useState([]);
  const [sports, setSports] = useState([]);
  const [study, setStudy] = useState([]);

  useEffect(() => {
    console.log('이거이거', beautyRecord);

    setBeauty([
      beautyRecord.sun / 1000,
      beautyRecord.mon / 1000,
      beautyRecord.tue / 1000,
      beautyRecord.wed / 1000,
      beautyRecord.thur / 1000,
      beautyRecord.fri / 1000,
      beautyRecord.sat / 1000,
    ]);
    setCounseling([
      counselingRecord.sun / 1000,
      counselingRecord.mon / 1000,
      counselingRecord.tue / 1000,
      counselingRecord.wed / 1000,
      counselingRecord.thur / 1000,
      counselingRecord.fri / 1000,
      counselingRecord.sat / 1000,
    ]);
    setCulture([
      cultureRecord.sun / 1000,
      cultureRecord.mon / 1000,
      cultureRecord.tue / 1000,
      cultureRecord.wed / 1000,
      cultureRecord.thur / 1000,
      cultureRecord.fri / 1000,
      cultureRecord.sat / 1000,
    ]);
    setEtc([
      etcRecord.sun / 1000,
      etcRecord.mon / 1000,
      etcRecord.tue / 1000,
      etcRecord.wed / 1000,
      etcRecord.thur / 1000,
      etcRecord.fri / 1000,
      etcRecord.sat / 1000,
    ]);
    setSports([
      sportsRecord.sun / 1000,
      sportsRecord.mon / 1000,
      sportsRecord.tue / 1000,
      sportsRecord.wed / 1000,
      sportsRecord.thur / 1000,
      sportsRecord.fri / 1000,
      sportsRecord.sat / 1000,
    ]);
    setStudy([
      studyRecord.sun / 1000,
      studyRecord.mon / 1000,
      studyRecord.tue / 1000,
      studyRecord.wed / 1000,
      studyRecord.thur / 1000,
      studyRecord.fri / 1000,
      studyRecord.sat / 1000,
    ]);
  }, [week]);
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: '뷰티',
        backgroundColor: '#FCEDB7',
        stack: 'Stack 0',
        data: beauty,
      },
      {
        label: '운동',
        backgroundColor: '#FFC9C9',
        stack: 'Stack 0',
        data: sports,
      },
      {
        label: '스터디',
        backgroundColor: '#B9E8B5',
        stack: 'Stack 0',
        data: study,
      },
      {
        label: '문화',
        backgroundColor: '#B5E3F8',
        stack: 'Stack 0',
        data: culture,
      },
      {
        label: '상담',
        backgroundColor: '#FFD9B6',
        stack: 'Stack 0',
        data: counseling,
      },
      {
        label: '기타',
        backgroundColor: '#B7CEFC',
        stack: 'Stack 0',
        data: etc,
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
  return (
    <>
      {week ? (
        <Bar data={data} options={option} style={{ height: '100%' }} />
      ) : (
        ''
      )}
    </>
  );
};
export default WeekTime;
