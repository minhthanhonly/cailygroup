import { useEffect, useState } from 'react';

import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, month, year, datacheck, daysInMonth: stateDaysInMonth = [] } = (location.state as {
    id: number;
    month: string;
    year: string;
    datacheck: number;
    daysInMonth?: Date[];
  }) || {};
  const [user_id, setUser_id] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);



  console.log("exportData", datacheck);


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
          setDataFetched(true);
        })
        .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
    } else {
      console.error('Không tìm thấy giá trị loggedInUserId trong localStorage');
    }
  }, []); // Thêm dependency để đảm bảo hook chỉ chạy một lần
  //-------------------------------------------------------------------------------------

  useEffect(() => {
    const matchedUser = listOfUsers.find((user) => user.id === id);

    if (matchedUser) {
      console.log('Tên người dùng tương ứng:', matchedUser.realname);
      setCurrentUser(matchedUser);
      if (datacheck === 1) {
        exportToExcel();
        navigate(`/timecards/list`);
      }
      // You can add additional logic here if needed

    } else {
      console.log('Không tìm thấy người dùng tương ứng');
    }
  }, [listOfUsers]);

  console.log("currentUser", currentUser);


  const exportToExcel = () => {
    const table = document.getElementById('timecards_table');
    const wb = XLSX.utils.book_new();
    const month = selectedMonth;
    const year = selectedYear;
    const startRow = 5;
    const wsData = XLSX.utils.table_to_sheet(table);

    // Đoạn code để định dạng ngày tháng trong bảng Excel
    if (wsData['!range'] && wsData['!range'].e) {
      for (let r = 0; r < wsData['!range'].e.r + 1; r++) {
        for (let c = 0; c < wsData['!range'].e.c + 1; c++) {
          const cellAddress = XLSX.utils.encode_cell({ r, c });
          const cell = wsData[cellAddress];
          if (cell && cell.t === 'd') {
            cell.v = XLSX.utils.format_cell(cell);
          }
        }
      }
    }

    // Sử dụng matchedUser để lấy tên người dùng

    const matchedUser = listOfUsers.find((user) => user.id === id);
    const realname = matchedUser ? matchedUser.realname : currentUser?.realname;
    XLSX.utils.sheet_add_aoa(
      wsData,
      [
        [
          ` ${realname || ''} \n ${month}/${year}`,
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
    wsData[mergedCellAddress].s = {
      alignment: { horizontal: 'center', vertical: 'center' },
    };

    // Đẩy bảng xuống 3 ô
    XLSX.utils.sheet_add_aoa(wsData, [[]], { origin: `A${startRow - 2}` });
    if (!table) {
      console.error('Không tìm thấy bảng.');
      return;
    }
    const tableRows = table.getElementsByTagName('tr');
    const tableWithRows = table as HTMLTableElement & {
      rows: HTMLCollectionOf<HTMLTableRowElement>;
    };
    const filteredData = [];
    for (let i = startRow - 1; i < tableWithRows.rows.length; i++) {
      const rowData = [];
      for (let j = 0; j < tableWithRows.rows[i].cells.length; j++) {
        const cellContent = tableWithRows.rows[i].cells[j].textContent;
        rowData.push(cellContent ? cellContent.trim() : ''); // Kiểm tra nếu `textContent` không tồn tại
      }
      filteredData.push(rowData);
    }
    XLSX.utils.sheet_add_aoa(wsData, filteredData, {
      origin: `A${startRow - 1}`,
    });
    const sheetName = `Timecards_${realname}_${month}_${year}`;
    XLSX.utils.book_append_sheet(wb, wsData, sheetName);
    XLSX.writeFile(
      wb,
      `Timecards_${realname}_${month}_${year}.xlsx`,
    );
  };


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
  };
  useEffect(() => {
    if (id !== undefined && month !== undefined && year !== undefined) {
      setSelectedMonth(month);
      setSelectedYear(year);
      updateMonthAndYear(month, year);
      setUser_id(id);
      handleDateChange(month, year, stateDaysInMonth);

    } else {
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      const currentYear = String(currentDate.getFullYear());

      // Cập nhật state
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
      updateMonthAndYear(currentMonth, currentYear);
    }
  }, [id]);


  return (
    <>
      <NavTimcard role="admin" />
      <MonthYearSelector
        onChange={handleDateChange}
        initialMonth={month}
        initialYear={year}
      />
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
              userID={user_id}
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
