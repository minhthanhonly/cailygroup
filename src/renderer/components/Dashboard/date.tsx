import React, { useState } from 'react';

interface CalendarDataItem {
  date: Date;
  dayOfWeek: string;
  startTime?: string;
  endTime?: string;
}

const generateDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const generateCalendarData = (
  year: number,
  month: number,
): CalendarDataItem[] => {
  const daysInMonth = generateDaysInMonth(year, month);
  const calendarData: CalendarDataItem[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    calendarData.push({
      date: currentDate,
      dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      startTime: '',
      endTime: '',
    });
  }

  return calendarData;
};

const TableCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [startTimes, setStartTimes] = useState<string[]>(Array(31).fill(''));
  const [endTimes, setEndTimes] = useState<string[]>(Array(31).fill(''));

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedMonth(parseInt(e.target.value, 10));
    setStartTimes(Array(31).fill('')); // Reset start times
    setEndTimes(Array(31).fill('')); // Reset end times
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedYear(parseInt(e.target.value, 10));
    setStartTimes(Array(31).fill('')); // Reset start times
    setEndTimes(Array(31).fill('')); // Reset end times
  };

  const handleStartButtonClick = (index: number): void => {
    const newStartTimes = [...startTimes];
    newStartTimes[index] = new Date().toLocaleTimeString();
    setStartTimes(newStartTimes);

    const newEndTimes = [...endTimes];
    newEndTimes[index] = ''; // Reset end time when starting
    setEndTimes(newEndTimes);
  };

  const handleEndButtonClick = (index: number): void => {
    const newEndTimes = [...endTimes];
    newEndTimes[index] = new Date().toLocaleTimeString();
    setEndTimes(newEndTimes);
  };

  const calendarData = generateCalendarData(selectedYear, selectedMonth);

  return (
    <div>
      <label>
        Chọn tháng:
        <select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              Tháng {i + 1}
            </option>
          ))}
        </select>
      </label>
      <label>
        Chọn năm:
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Ngày/Tháng</th>
            <th>Thứ</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((dayData, index) => (
            <tr key={index}>
              <td>
                {dayData.date.getDate()}/{dayData.date.getMonth() + 1}
              </td>
              <td>{dayData.dayOfWeek}</td>
              <td>
                {dayData.date.getDate() === new Date().getDate() &&
                  (startTimes[index] ? (
                    <span>{startTimes[index]}</span>
                  ) : (
                    <button onClick={() => handleStartButtonClick(index)}>
                      Bắt đầu
                    </button>
                  ))}
              </td>
              <td>
                {endTimes[index] ? (
                  <span>{endTimes[index]}</span>
                ) : (
                  startTimes[index] && (
                    <button onClick={() => handleEndButtonClick(index)}>
                      Kết thúc
                    </button>
                  )
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCalendar;
