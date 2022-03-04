import React from 'react';
import dateFns from 'date-fns';

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
    const { currentMonth } = this.state;
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

        const filterDate = dateValue.filter((d) =>
          dateFns.isEqual(d.date, day)
        );

        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart) ? 'disabled' : ''
            } tooltip`}
            key={day}
            style={
              dateFns.isSameMonth(day, monthStart) &&
              filterDate.length &&
              filterDate[0].count > 5
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

export default MonthTime;
