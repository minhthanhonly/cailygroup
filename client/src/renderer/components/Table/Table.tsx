


import { SetStateAction, useState } from 'react';
import CTableTimeCardHead from './Table_01/CTableTimeCardHead';
import CTableTimeCardBody from './Table_01/CTableTimeCardBody';


import MonthYearSelector from './SelectMonthYears';
// import  TestOne  from "./TestOne";
import './Table.scss';
import '../GlobalStyles/GlobalStyles.scss';
import { SelectCustom, SelectCustomName } from './SelectCustom';



let Col_count_rows = 9;
const Col_title = { col_1: 'Họ Và Tên', col_2: 'Nhóm', col_3: 'Email', col_4: 'Skype ID', col_5: 'Tháng Năm', col_6: 'Phone', col_7: 'Phone', col_8: 'Ghi Chú', };


const TablePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const handleDateChange = (month: string, year: string, daysInMonth: Date[]) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);

    console.log('setSelectedMonth(month);', month);
    console.log('setSelectedYear(year)', year);
  };



  return (
    <div>
      <h2>Table Page</h2>

      <SelectCustom />
      <SelectCustomName />
      <MonthYearSelector onChange={handleDateChange} />
      <h2 className='hdg-lv2'>Thẻ giờ</h2>
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
    </div>
  );
};

export default TablePage;