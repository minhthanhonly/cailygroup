import { useEffect, useState } from 'react';

import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink, useLocation } from 'react-router-dom';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import * as XLSX from 'xlsx';
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
  const location = useLocation();
  const {
    id,
    month,
    year,
    daysInMonth: stateDaysInMonth,
  } = (location.state as {
    id: number;
    month: string;
    year: string;
    daysInMonth?: Date[];
  }) || {};

  useEffect(() => {
    if (id !== undefined && month !== undefined && year !== undefined) {
      // Log to check the values
      console.log('IDssss:', id);
      console.log('Monthssss:', month);
      console.log('Yearssssss:', year);
      console.log('stateDaysInMonth', stateDaysInMonth);
    } else {
      console.error('Invalid or missing parameters in location.state');
    }
  }, [id, month, year, stateDaysInMonth]);

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

  console.log(daysInMonth);

  useEffect(() => {
    if (id !== undefined && month !== undefined && year !== undefined) {
      console.log('IDssss:', id);
      console.log('Monthssss:', month);
      console.log('Yearssssss:', year);
    } else {
      console.error('Invalid or missing parameters in location.state');
    }
  }, [id, month, year]);

  const updateMonthAndYear = (newMonth: string, newYear: string) => {
    const month = newMonth;
    const year = newYear;
  };

  //------------------------------phần lấy user-------------------------------------------------------
  useEffect(() => {
    const loggedInUserId = JSON.parse(localStorage.getItem('users') || '{}');

    if (loggedInUserId) {
      axios
        .get('http://cailygroup.com/timecards/list')
        .then((response) => {
          setListOfUsers(response.data);
          const loggedInUser = response.data.find(
            (users: { id: number }) => users.id === loggedInUserId.id,
          );
          setCurrentUser(loggedInUser);
        })
        .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
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
    const startRow = 5; // Dòng bắt đầu

    // Lấy toàn bộ nội dung của bảng (bao gồm cả head và body)
    const wsData = XLSX.utils.table_to_sheet(table);

    // Lặp qua từng ô trong bảng và đặt kiểu dữ liệu là 's' (string)
    if (wsData['!range'] && wsData['!range'].e) {
      for (let r = 0; r < wsData['!range'].e.r + 1; r++) {
        for (let c = 0; c < wsData['!range'].e.c + 1; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = wsData[cellAddress];
          if (cell && cell.t === 'd') {
            // Sử dụng hàm `XLSX.utils.format_cell` để định dạng ngày
            cell.v = XLSX.utils.format_cell(cell);
          }
        }
      }
    }

    // Thêm tên người dùng và ngày tháng vào hàng đầu tiên của bảng
    XLSX.utils.sheet_add_aoa(
      wsData,
      [
        [
          ` ${currentUser?.realname || ''} \n ${month}/${year}`,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ],
      ],
      { origin: `A${startRow - 2}` },
    );
    wsData['!merges'] = [{ s: { r: 2, c: 0 }, e: { r: 3, c: 7 } }];
    const mergedCellAddress = XLSX.utils.encode_cell({ r: 2, c: 0 });
    wsData[mergedCellAddress].s = { alignment: { horizontal: 'center', vertical: 'center' } };

    // Đẩy bảng xuống 3 ô
    XLSX.utils.sheet_add_aoa(wsData, [[]], { origin: `A${startRow - 2}` });

    // Lấy dữ liệu từ dòng 10 trở đi và tạo sheet mới
    if (!table) {
      console.error('Không tìm thấy bảng.');
      return;
    }
    const tableRows = table.getElementsByTagName('tr');
    const tableWithRows = table as HTMLTableElement & {
      rows: HTMLCollectionOf<HTMLTableRowElement>;
    };

    // Lấy dữ liệu từ dòng 10 trở đi và tạo sheet mới
    const filteredData = [];
    for (let i = startRow - 1; i < tableWithRows.rows.length; i++) {
      const rowData = [];
      for (let j = 0; j < tableWithRows.rows[i].cells.length; j++) {
        const cellContent = tableWithRows.rows[i].cells[j].textContent;
        rowData.push(cellContent ? cellContent.trim() : ''); // Kiểm tra nếu `textContent` không tồn tại
      }
      filteredData.push(rowData);
    }

    // Thêm dữ liệu vào sheet mới
    XLSX.utils.sheet_add_aoa(wsData, filteredData, {
      origin: `A${startRow - 1}`,
    });

    // Lấy tên sheet từ bảng
    const sheetName = `Timecards_${currentUser?.realname}_${month}_${year}`;

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, wsData, sheetName);

    // Xuất workbook ra file Excel
    XLSX.writeFile(
      wb,
      `Timecards_${currentUser?.realname}_${month}_${year}.xlsx`,
    );
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
          <thead id="timecards_table_head">
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
