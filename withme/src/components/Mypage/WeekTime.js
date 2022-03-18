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
    console.log('이번 주 데이터', week);

    const sun100 =
      beautyRecord.sun +
      counselingRecord.sun +
      cultureRecord.sun +
      etcRecord.sun +
      sportsRecord.sun +
      studyRecord.sun;

    const mon100 =
      beautyRecord.mon +
      counselingRecord.mon +
      cultureRecord.mon +
      etcRecord.mon +
      sportsRecord.mon +
      studyRecord.mon;

    const tue100 =
      beautyRecord.tue +
      counselingRecord.tue +
      cultureRecord.tue +
      etcRecord.tue +
      sportsRecord.tue +
      studyRecord.tue;

    const wed100 =
      beautyRecord.wed +
      counselingRecord.wed +
      cultureRecord.wed +
      etcRecord.wed +
      sportsRecord.wed +
      studyRecord.wed;

    const thur100 =
      beautyRecord.thur +
      counselingRecord.thur +
      cultureRecord.thur +
      etcRecord.thur +
      sportsRecord.thur +
      studyRecord.thur;

    const fri100 =
      beautyRecord.fri +
      counselingRecord.fri +
      cultureRecord.fri +
      etcRecord.fri +
      sportsRecord.fri +
      studyRecord.fri;

    const sat100 =
      beautyRecord.sat +
      counselingRecord.sat +
      cultureRecord.sat +
      etcRecord.sat +
      sportsRecord.sat +
      studyRecord.sat;

    setBeauty([
      (beautyRecord.sun / sun100) * 100,
      (beautyRecord.mon / mon100) * 100,
      (beautyRecord.tue / tue100) * 100,
      (beautyRecord.wed / wed100) * 100,
      (beautyRecord.thur / thur100) * 100,
      (beautyRecord.fri / fri100) * 100,
      (beautyRecord.sat / sat100) * 100,
    ]);
    setCounseling([
      (counselingRecord.sun / sun100) * 100,
      (counselingRecord.mon / mon100) * 100,
      (counselingRecord.tue / tue100) * 100,
      (counselingRecord.wed / wed100) * 100,
      (counselingRecord.thur / thur100) * 100,
      (counselingRecord.fri / fri100) * 100,
      (counselingRecord.sat / sat100) * 100,
    ]);
    setCulture([
      (cultureRecord.sun / sun100) * 100,
      (cultureRecord.mon / mon100) * 100,
      (cultureRecord.tue / tue100) * 100,
      (cultureRecord.wed / wed100) * 100,
      (cultureRecord.thur / thur100) * 100,
      (cultureRecord.fri / fri100) * 100,
      (cultureRecord.sat / sat100) * 100,
    ]);
    setEtc([
      (etcRecord.sun / sun100) * 100,
      (etcRecord.mon / mon100) * 100,
      (etcRecord.tue / tue100) * 100,
      (etcRecord.wed / wed100) * 100,
      (etcRecord.thur / thur100) * 100,
      (etcRecord.fri / fri100) * 100,
      (etcRecord.sat / sat100) * 100,
    ]);
    setSports([
      (sportsRecord.sun / sun100) * 100,
      (sportsRecord.mon / mon100) * 100,
      (sportsRecord.tue / tue100) * 100,
      (sportsRecord.wed / wed100) * 100,
      (sportsRecord.thur / thur100) * 100,
      (sportsRecord.fri / fri100) * 100,
      (sportsRecord.sat / sat100) * 100,
    ]);
    setStudy([
      (studyRecord.sun / sun100) * 100,
      (studyRecord.mon / mon100) * 100,
      (studyRecord.tue / tue100) * 100,
      (studyRecord.wed / wed100) * 100,
      (studyRecord.thur / thur100) * 100,
      (studyRecord.fri / fri100) * 100,
      (studyRecord.sat / sat100) * 100,
    ]);
  }, [week]);
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: '상담',
        backgroundColor: '#FFD9B6',
        stack: 'Stack 0',
        data: counseling,
      },
      {
        label: '문화',
        backgroundColor: '#B5E3F8',
        stack: 'Stack 0',
        data: culture,
      },
      {
        label: '기타',
        backgroundColor: '#B7CEFC',
        stack: 'Stack 0',
        data: etc,
      },
      {
        label: '스터디',
        backgroundColor: '#B9E8B5',
        stack: 'Stack 0',
        data: study,
      },
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
    ],
  };
  const option = {
    responsive: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        scaleLabel: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        // enabled: true,
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
