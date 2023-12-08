import { useState } from 'react';
import { Button } from '../../components/Button';
import DatabaseTable_Columns from '../../components/Table/Table_01/DatabaseTable_Columns';
import DatabaseTable_Rows from '../../components/Table/Table_01/DatabaseTable_Rows';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink } from 'react-router-dom';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import { SelectCustom, SelectCustomName } from '../../components/Table/SelectCustom';

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
      <NavTimcard role="admin"/>
      <div className="left select-ml0">
        <SelectCustom />
      </div>
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
      <ButtonCenter>
        <Button size="medium" color="green">
          Xuất Thẻ Giờ
        </Button>
        <NavLink className="btn" to="/day-off/ApplyForLeave">
          Đăng ký nghỉ phép
        </NavLink>
      </ButtonCenter>
    </>
  );
};
