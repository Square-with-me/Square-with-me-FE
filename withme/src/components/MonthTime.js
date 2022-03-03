import React from 'react';
import dateFns from 'date-fns';
import styled from 'styled-components';

import '../styles/monthTime.css';

class MonthTime extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    const dateFormat = 'MMMM YYYY';

    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    const dateValue = this.props.values;
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const reFormattedDate = dateFns.format(day, 'YYYY-MM-DD');

        const filterDate = dateValue.filter((s) =>
          dateFns.isEqual(s.date, day)
        );
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart) ? 'disabled' : ''
            } tooltip`}
            key={day}
            style={
              // dateFns.isSameMonth(day, monthStart) &&
              filterDate.length && filterDate[0].count > 5
                ? { background: 'pink' }
                : filterDate.length && filterDate[0].count > 0
                ? { background: 'blue' }
                : null
            }
            onClick={
              dateFns.isSameMonth(day, monthStart)
                ? () => this.onDateClick(dateFns.parse(cloneDay))
                : null
            }
          >
            {!dateFns.isSameMonth(day, monthStart) ? null : (
              <span>
                <span className="number">{formattedDate}</span>
                {this.props.toolTip ? (
                  <span className="tooltiptext">{reFormattedDate}</span>
                ) : null}
              </span>
            )}
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    if (this.props.onClick) {
      this.props.onClick(day);
    }
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

const Contatiner = styled.div`
  --main-color: #1a8fff;
  --text-color: #777;
  --text-color-light: #ccc;
  --border-color: #eee;
  --bg-color: #f9f9f9;
  --neutral-color: #fff;

  box-sizing: border-box;

  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  font-size: 1em;
  font-weight: 300;
  line-height: 1.5;
  color: var(--text-color);
  background: var(--bg-color);

  .row {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .row-middle {
    align-items: center;
  }

  .col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-start {
    justify-content: flex-start;
    text-align: left;
  }

  .col-center {
    justify-content: center;
    text-align: center;
  }

  .col-end {
    justify-content: flex-end;
    text-align: right;
  }

  /* Calendar */

  .calendar {
    display: block;
    position: relative;
    width: 100%;
    background: var(--neutral-color);
    border: 1px solid var(--border-color);
  }

  .calendar .header {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 115%;
    padding: 1.5em 0;
    border-bottom: 1px solid var(--border-color);
  }

  .calendar .days {
    text-transform: uppercase;
    font-weight: 400;
    color: var(--text-color-light);
    font-size: 70%;
    padding: 0.75em 0;
    border-bottom: 1px solid var(--border-color);
  }

  .calendar .body .cell {
    position: relative;
    height: 5em;
    border-right: 1px solid var(--border-color);
    overflow: hidden;
    cursor: pointer;
    background: var(--neutral-color);
    transition: 0.25s ease-out;
  }

  .calendar .body .cell:hover {
    background: var(--bg-color);
    transition: 0.5s ease-out;
  }

  .calendar .body .selected {
    border-left: 10px solid transparent;
    border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
    border-image-slice: 1;
  }

  .calendar .body .row {
    border-bottom: 1px solid var(--border-color);
  }

  .calendar .body .row:last-child {
    border-bottom: none;
  }

  .calendar .body .cell:last-child {
    border-right: none;
  }

  .calendar .body .cell .number {
    position: absolute;
    font-size: 82.5%;
    line-height: 1;
    top: 0.75em;
    right: 0.75em;
    font-weight: 700;
  }

  .calendar .body .disabled {
    color: var(--text-color-light);
    pointer-events: none;
  }

  .calendar .body .cell .bg {
    font-weight: 700;
    line-height: 1;
    color: var(--main-color);
    opacity: 0;
    font-size: 8em;
    position: absolute;
    top: -0.2em;
    right: -0.05em;
    transition: 0.25s ease-out;
    letter-spacing: -0.07em;
  }

  .calendar .body .cell:hover .bg,
  .calendar .body .selected .bg {
    opacity: 0.05;
    transition: 0.5s ease-in;
  }

  .calendar .body .col {
    flex-grow: 0;
    flex-basis: calc(100% / 7);
    width: calc(100% / 7);
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`;

export default MonthTime;
