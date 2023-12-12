import { useState } from 'react';

import { Button } from '../../components/Button';
import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink } from 'react-router-dom';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import { SelectCustom, SelectCustomName } from '../../components/Table/SelectCustom';
// import { Excel } from '../../components/ExportExcel/Excel';



export const Timecard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const [tableData, setTableData] = useState<string[][]>([]); // Thêm state để lưu trữ dữ liệu bảng



  const handleDateChange = (month: string, year: string, daysInMonth: Date[]) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);
  };



  // <Excel />
  return (
    <>
      <NavTimcard role="admin" />
      <div className="left">
        <SelectCustom />
      </div>
      <MonthYearSelector onChange={handleDateChange} />
      <div className='table-container table--01'>
        <table className="table table__custom">
          <thead>
            <CTableTimeCardHead />
          </thead>
          <tbody>
            {/* RowCounts = {RowCounts} */}
            <CTableTimeCardBody selectedMonth={selectedMonth} selectedYear={selectedYear} daysInMonth={daysInMonth} />

          </tbody>
        </table>
      </div>
      <p className="txt-note">Giờ nghỉ trưa từ 11:30 - 13:00.</p>
      <ButtonCenter>
        {/* <Excel tableData={tableData} /> */}
        <NavLink className="btn" to="/day-off/register">
          Đăng ký nghỉ phép
        </NavLink>
      </ButtonCenter>
    </>
  );
};
