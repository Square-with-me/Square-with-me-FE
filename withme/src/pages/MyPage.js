import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Image, Text, Input } from '../elements';
import styled from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';

// chart.jd
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';

const Mypage = () => {
  // bar chart
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Member Agreement Tracker',
        backgroundColor: 'red',
        stack: 'Stack 0',
        data: [66, 93, 31, 76, 39, 75, 36],
      },
      {
        label: 'Employee On Boarding',
        backgroundColor: 'blue',
        stack: 'Stack 0',
        data: [76, 203, 41, 86, 49, 85, 46],
      },
      {
        label: 'Vendor Payment',
        backgroundColor: 'yellow',
        stack: 'Stack 0',
        data: [76, 103, 41, 86, 49, 85, 46],
      },
      {
        label: 'Employee On Boarding',
        backgroundColor: 'blue',
        stack: 'Stack 1',
        data: [56, 56, 83, 21, 66, 29, 65],
      },
    ],
  };
  const barOption = {
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
      // onComplete: function () {
      //   var chartInstance = this.chart,
      //     ctx = chartInstance.ctx;
      //   ctx.textAlign = 'center';
      //   ctx.textBaseline = 'bottom';
      //   var stackGroup = [];
      //   var stackIndex = [];
      //   for (let index = 0; index < this.data.datasets.length; index++) {
      //     var stackName = this.data.datasets[index].stack;
      //     var stack = { Name: stackName, stackIndex: index };
      //     var result = stackGroup.filter((obj) => {
      //       return obj.Name === stackName;
      //     });
      //     if (result.length > 0) {
      //       var sliceCount = stackGroup.findIndex((x) => x.Name == stackName);
      //       stackGroup.splice(sliceCount, true);
      //       stackIndex.splice(sliceCount, true);
      //       stackGroup.push(stack);
      //       stackIndex.push(stack.stackIndex);
      //     } else {
      //       stackGroup.push(stack);
      //       stackIndex.push(stack.stackIndex);
      //     }
      //   }
      //   this.data.datasets.forEach(function (dataset, i) {
      //     var meta = chartInstance.controller.getDatasetMeta(i);
      //     meta.data.forEach(function (bar, index) {
      //       var data = dataset.data[index];
      //       var result = stackGroup.filter((obj) => {
      //         return obj.stackIndex === i;
      //       });
      //       if (result.length > 0) {
      //         if (result[0].Name == 'Stack 0') {
      //           ctx.fillText('Completed', bar._model.x, bar._model.y - 5);
      //         }
      //         if (result[0].Name == 'Stack 1') {
      //           ctx.fillText('NotCompleted', bar._model.x, bar._model.y - 5);
      //         }
      //       }
      //       //if($.inArray(i, stackIndex) !== -1){
      //       //ctx.fillText(data, bar._model.x, bar._model.y - 5);
      //       //}
      //     });
      //   });
      // },
    },
    responsive: true,
  };

  // =====================================================
  // pie chart
  const data = {
    labels: ['Do', 'Share', 'Talk'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
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
            let label = context.formattedValue + 's';
            // 초를 HH MM SS로 표현하는 정규식함수 파일을 만들어서 변경하자!
            return label;
          },
        },
      },
    },
  };

  return (
    <React.Fragment>
      <Header />
      <ProfileContainer>
        <div className="imageBox">
          <Image
            shape="rectangle"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADACAMAAACKwPcLAAAANlBMVEVmZmb////u8vpwb3D29vbY2NixsbGLi4vi4uKCgoLr6+vPz8+fn594eHjFxcWop6i7u7uVlZUD7tw7AAAEB0lEQVR4nO2ba5ujIAxG2wHBu+3//7MzjnhpV60kr5vBJ+fjri6cQhIE9nZLnC/pDrBRA3nUQB41kEcN5FEDedRAHjWQRw3kUQN51EAeNZBHDeRRA3nUQB41kEcN5FEDedRAHjXYxjxdld17bFa5pzmrnZMMmi6/v5F3zSlNnWJQZ+/dH8jqExo7weBZrve/p3zCm4MbNBu//zQO6LmENujsvsBPXHfYFrEGplp2tXK+6P+08K5ailXQvAQ1MHMCsm3x+ndFO0vkSAWkQTMJWLfSR+PsGQpAg3kEHhsdNI8TFHAGk0Dptx/yJVwBZzAGcbbbNzMm2wrVLsygCz1rPz3YhgdRSRVl0NiDApOCBZU2lEGYHBn62c+ADJ4hiA/FpwnhjFkjgQxCn3ay0BIffCFNYwzqUAeOPh/qAmSxjTEI32KHc7yxuEiAGDTDT+qOv+GGNxDpCGLQRQ7BNAiImgAxyI+WgpmhKOSAxhEGZpgSxecnZ4rhHcDqCGEwFAMb95JFlQSEgaMs1arY4N8CYVBRopKkvQbCIIupxyMeVREQBjY+kMdQjgyeNRAGQ1r5P2/9ixr0qAEPnEHKkZx+NiWV1z9V0dJfVaS/skt/dZ3+F84FvjLT/9JPf7flAjte6e86XmDnN/3d9wucgKR/CnWBk8ALnMamfyK+VEj0VsIFboZc4HbOLf0bUrcL3FL7UWh3BSK3lT6DNvDVXv97yhp7eRZr4D9MoRAJa7mWDNKgONT/Xwfg1VngquLx2svs0fmwvvC+e7zZ4eIBZuCXN33Lx8rXi3cvd7EB23W/oAzcYoq8l+OZxi089xexh8EYmHmOfArTenawkJmE2S/aX9K9MTtAAhphUEwriepQwTXzlAMoAAwmAXt486HIcQp8g/Eb/55HrHhMC1NgG0zfBG1caqlR4cw2GLNQ1N57z6TATKpcg7EQE+rTqMDc+WIaeOoI9NR0+wU8g3EHlCQwK7BCgWcQ5hD5MKkFzCOWQZhD9B3QMZFxUirLIOQhxi56wc9HHIMwjVk7oI4dzByDkjmHekIuYAwCw8AjcuE4kPRIYBjEHmBuMAwC/UyNbhB/iLxOzawJdAOHGYJxEIhFkWPAbHgm/BTU18kGBWBBMBCmY+QdsQmyQccMwAU5K6DIBkMmOnwPYQ/HWhyRDXhD/0IoLMS3qQYFq9U3WL8G1aDmL4tnMk5Zpho4XBiMnxnEUKYakP7XxBYdZ0CpBqR7vluw7v9SDXK8AbG2UA2QqYj3r6kBBgmDv4MayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogjxrIowbyqIE8aiCPGsijBvKogTxqII8ayKMG8qiBPGogz9c3668W/KAjNpwAAAAASUVORK5CYII="
          />
          <div className="filebox">
            <label htmlFor="ex_file">프로필 사진 수정</label>
            <input type="file" id="ex_file" />
          </div>
        </div>
        <div className="textBox">
          <div className="nameBox">
            <div className="nickname">닉네임임다</div>
            <button>
              <BsFillPencilFill />
            </button>
          </div>
          <div className="statusBox">
            <div className="statusContent">오늘도 열심히!</div>
            <button>저장</button>
            <button>수정</button>
          </div>
        </div>
      </ProfileContainer>
      <BadgeContainer>
        <p>대표 벳지 설정</p>
        <div className="badgeBox">
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
          <div className="badge"></div>
        </div>
      </BadgeContainer>
      <TimeContainer>
        <div className="todayTimeBox">
          <p>오늘 네모와 함께한 시간</p>
          <div className="chart">
            <Pie data={data} options={option} />
          </div>
        </div>
        <div className="weekTime">
          <p>이번 주 네모와 함께한 시간</p>
          <Bar data={barChartData} options={barOption} />
        </div>
        <div className="monthTime">
          <p>이번 달 네모와 함께한 시간</p>
        </div>
      </TimeContainer>
      <Footer />
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #eee;
  justify-content: space-between;
  margin-bottom: 10px;

  .imageBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    background-color: pink;

    .filebox label {
      display: inline-block;
      padding: 0.5em 0.75em;
      color: #999;
      font-size: inherit;
      line-height: normal;
      vertical-align: middle;
      background-color: #fdfdfd;
      cursor: pointer;
      border: 1px solid #ebebeb;
      border-bottom-color: #e2e2e2;
      border-radius: 0.25em;
    }
    .filebox input[type='file'] {
      /* 파일 필드 숨기기 */
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }

  .textBox {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: skyblue;

    .nameBox {
      display: flex;
      flex-direction: row;

      button {
        background-color: transparent;
        border: none;
      }
    }

    .statusBox {
      display: flex;
      flex-direction: row;
    }
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;

  .badgeBox {
    display: grid;
    grid-template-columns: repeat(5, minmax(100px, auto));
    grid-template-rows: repeat(auto-fill, minmax(100px, auto));
    background-color: black;

    place-items: center;
  }

  .badge {
    width: 80px;
    height: 80px;
    background-color: red;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  p {
    width: 50%;
  }

  .chart {
    width: 50%;
  }

  .todayTimeBox {
    display: flex;
  }
`;

export default Mypage;
