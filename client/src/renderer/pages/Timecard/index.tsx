import { useState } from 'react';
import { Button } from '../../components/Button';
import { Heading2 } from '../../components/Heading';
import DatabaseTable_Columns from '../../components/Table/Table_01/DatabaseTable_Columns';
import DatabaseTable_Rows from '../../components/Table/Table_01/DatabaseTable_Rows';
import MonthYearSelector from '../../components/Table/SelectMonthYears';

export const Timecard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const handleDateChange = (month: string, year: string, daysInMonth: Date[]) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);
  };
  return (
    <>
      <Heading2 text="Thẻ Giờ" />
      <MonthYearSelector onChange={handleDateChange} />
      <div className='table-container table--01'>
        <table className="table table__custom">
          <thead>
            <DatabaseTable_Columns />
          </thead>
          <tbody>
            {/* RowCounts = {RowCounts} */}
            <DatabaseTable_Rows selectedMonth={selectedMonth} selectedYear={selectedYear} daysInMonth={daysInMonth} />
          </tbody>
        </table>
      </div>
      <p className="txt-note">Giờ nghỉ trưa từ 11:30 - 13:00.</p>
      <div className="wrp-button">
        <Button size="medium" color="green">
          Xuất Thẻ Giờ
        </Button>
        <Button>Đăng ký nghỉ phép</Button>
      </div>
    </>
  );
};
