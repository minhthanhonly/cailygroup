import { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink } from 'react-router-dom';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import * as XLSX from 'xlsx';
import {
  SelectCustom,
  SelectCustomName,
} from '../../components/Table/SelectCustom';
import { Excel } from '../../components/ExportExcel/Excel';

//sever link

import { urlControl } from '../../routes/server';
import axios from 'axios';

interface FieldUsers {
  id: number;
  realname: string;
  userid: string;
  authority_name: string;
  group_name: string;
  user_group: string;
}

export const Timecard = () => {

  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);
  const [currentUser, setCurrentUser] = useState<FieldUsers | null>(null);


  type DatabaseTimeCardDetails = {
    id: string;
    id_groupwaretimecard: string;
    timecard_open: string;
    timecard_close: string;
    timecard_originalopen: string;
    timecard_originalclose: string;
    timecard_interval: string;
    timecard_originalinterval: string;
    timecard_time: string;
    timecard_timeover: string;
    timecard_timeinterval: string;
    timecard_comment: string;
  };
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [tableData, setTableData] = useState<string[][]>([]); // Thêm state để lưu trữ dữ liệu bảng

  const handleDateChange = (
    month: string,
    year: string,
    daysInMonth: Date[],
  ) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);
    updateMonthAndYear(month, year);
  };



  const updateMonthAndYear = (newMonth: string, newYear: string) => {
    const month = newMonth;
    const year = newYear;
    console.log("Updated month and year:", month, year);
  };

  //------------------------------phần lấy user-------------------------------------------------------
  useEffect(() => {
    const loggedInUserId = JSON.parse(localStorage.getItem('users') || '{}');
    console.log("loggedInUserId", loggedInUserId.id);

    if (loggedInUserId) {
      axios.get('http://cailygroup.com/timecards/list')
        .then((response) => {
          setListOfUsers(response.data);
          const loggedInUser = response.data.find((users: { id: number; }) => users.id === loggedInUserId.id);
          console.log("loggedInUser", loggedInUser);
          setCurrentUser(loggedInUser);
        })
        .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
    } else {
      console.error('Không tìm thấy giá trị loggedInUserId trong localStorage');
    }
  }, []); // Thêm dependency để đảm bảo hook chỉ chạy một lần
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = String(currentDate.getFullYear());

    // Cập nhật state
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    updateMonthAndYear(currentMonth, currentYear);
  }, []);

  const exportToExcel = () => {
    // Lấy đối tượng bảng HTML
    const table = document.getElementById('timecards_table');

    // Tạo workbook
    const wb = XLSX.utils.book_new();

    // Lấy tên tháng và năm từ state
    const month = selectedMonth;
    const year = selectedYear;

    // Tạo sheet cho dữ liệu người dùng, tháng và năm
    const wsCombined = XLSX.utils.aoa_to_sheet([
      ['Người Dùng', currentUser?.realname || ''],
      ['Tháng', month, 'Năm', year],
    ]);

    // Thêm dữ liệu từ bảng timecards_table vào sheet
    const wsData = XLSX.utils.table_to_sheet(table);
    XLSX.utils.sheet_add_json(wsCombined, XLSX.utils.sheet_to_json(wsData), {
      skipHeader: true,
      origin: 'A5', // Nơi bắt đầu thêm dữ liệu từ bảng
    });

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, wsCombined, `Timecards_${currentUser?.realname}_${month}_${year}`);

    // Xuất workbook ra file Excel
    XLSX.writeFile(wb, `Timecards_${currentUser?.realname}_${month}_${year}.xlsx`);
  };

  return (
    <>
      <NavTimcard role="admin" />
      {/* <div className="left">
        <SelectCustom
          onGroupChange={function (groupId: string): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div> */}
      <MonthYearSelector onChange={handleDateChange} />
      <div className="table-container table--01">
        <table id="timecards_table" className="table table__custom">
          <thead>
            <CTableTimeCardHead />
          </thead>
          <tbody>
            <CTableTimeCardBody
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              daysInMonth={daysInMonth}
            />
          </tbody>
        </table>
      </div>
      <p className="txt-note">Giờ nghỉ trưa từ 11:30 - 13:00.</p>
      <ButtonCenter>
        <button onClick={exportToExcel} className="btn btn--medium btn--green">
          Xuất Thẻ Giờ
        </button>
        <NavLink className="btn" to="/dayoffs/register">
          Đăng ký nghỉ phép
        </NavLink>
      </ButtonCenter>
    </>
  );
};
