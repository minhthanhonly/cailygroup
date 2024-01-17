import { useEffect, useState } from 'react';

import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import { NavLink, useLocation } from 'react-router-dom';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import ExcelJS from 'exceljs';
import axios from '../../api/axios';
import { saveAs } from 'file-saver';
import './Timecard.scss';

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
    daysInMonth: stateDaysInMonth = [],
    datacheck,
  } = (location.state as {
    id: number;
    month: string;
    year: string;
    daysInMonth?: Date[];
    datacheck: number;
  }) || {};
  const [user_id, setUser_id] = useState<number>();

  // lấy thông tin của người bên trong timecardlist list
  const matchedUser = listOfUsers.find((user) => user.id === id);
  const realname = matchedUser ? matchedUser.realname : '';
  const matchedUser_month = month ? month : '';
  const matchedUser_year = year ? year : '';
  const datacheck_hi = datacheck ? datacheck : '';

  //------------------------------phần lấy user-------------------------------------------------------
  useEffect(() => {
    const loggedInUserId = JSON.parse(localStorage.getItem('users') || '{}');

    if (loggedInUserId) {
      axios
        .get('timecards/list')
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

  const exportToExcel = async () => {
    const matchedUser = listOfUsers.find((user) => user.id === id);
    const realname = matchedUser ? matchedUser.realname : currentUser?.realname;

    const table = document.getElementById(
      'timecards_table',
    ) as HTMLTableElement;

    if (!table) {
      console.error('Không tìm thấy bảng.');
      return;
    }

    const tableWithRows = table as HTMLTableElement & {
      rows: HTMLCollectionOf<HTMLTableRowElement>;
    };
    const month = selectedMonth;
    const year = selectedYear;
    const startRow = 4;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `Timecards_${realname}_${month}_${year}`.slice(0, 31),
    );

    // Merge cells for the name and date
    worksheet.mergeCells(`A1:H3`);
    worksheet.getCell(`A1`).value = ` ${realname || ''} \n ${month}/${year}`;
    worksheet.getCell(`A1`).alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };
    worksheet.getCell(`A1:H3`).border = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } },
    };

    worksheet.mergeCells(`A5:H8`);
    worksheet.getCell(`A5:H8`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCCC' }, // Mã màu tùy chọn, ở đây là màu đỏ
    };
    // Thêm dữ liệu từ bảng vào ô A4:I4
    const rowsArray = Array.from(table.rows);
    const numericSelectedYear = parseInt(selectedYear, 10);
    const numericSelectedMonth = parseInt(selectedMonth, 10);

    console.log('numericSelectedYear', numericSelectedYear);
    console.log('numericSelectedMonth', numericSelectedMonth);
    for (let r = 1; r <= table.rows.length; r++) {
      for (let c = 1; c <= table.rows[r - 1].cells.length; c++) {
        const cell = worksheet.getCell(
          `${String.fromCharCode(64 + c)}${startRow + r - 1}`,
        );
        const cellContent = table.rows[r - 1].cells[c - 1].textContent;

        // Chuyển đổi selectedYear và selectedMonth sang kiểu số

        // Kiểm tra nếu ngày tương ứng là thứ 7
        const currentDate = new Date(
          numericSelectedYear,
          numericSelectedMonth - 1,
          parseInt(cellContent || '0', 10),
        );
        const dayOfWeek = currentDate.getDay();

        switch (dayOfWeek) {
          case 6: // Thứ 7
            console.log('tao ở đây từ tối');
            for (
              let colIndex = 1;
              colIndex <= table.rows[r - 1].cells.length;
              colIndex++
            ) {
              const currentCell = worksheet.getCell(
                `${String.fromCharCode(64 + colIndex)}${startRow + r - 1}`,
              );
              currentCell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffdddd' }, // Màu xám nhạt cho Thứ 7
              };
            }
            break;
          default:
            // Không là Chủ nhật hoặc Thứ 7, không thực hiện gì cả
            break;
        }
        cell.value = cellContent;
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF000000' } },
          bottom: { style: 'thin', color: { argb: 'FF000000' } },
          left: { style: 'thin', color: { argb: 'FF000000' } },
          right: { style: 'thin', color: { argb: 'FF000000' } },
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    }
    const rowIndexHead = 4;
    const startColumnHead = 1; // Cột A
    const endColumnHead = 8; // Cột H

    for (let col = startColumnHead; col <= endColumnHead; col++) {
      const cell = worksheet.getCell(
        `${String.fromCharCode(64 + col)}${rowIndexHead}`,
      );
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffdddd' }, // Mã màu tùy chọn, ở đây là màu đỏ
      };
    }

    const rowIndex = 40;
    const startColumn = 5; // Cột E
    const endColumn = 6; // Cột F

    for (let col = startColumn; col <= endColumn; col++) {
      const cell = worksheet.getCell(
        `${String.fromCharCode(64 + col)}${rowIndex}`,
      );
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffdddd' }, // Mã màu tùy chọn, ở đây là màu đỏ
      };
    }

    const lastColumnIndex = table.rows[0].cells.length;
    worksheet.spliceColumns(lastColumnIndex, 1);

    for (let c = 1; c <= table.rows[0].cells.length - 1; c++) {
      const column = worksheet.getColumn(c);

      // Kiểm tra xem ô và nội dung có tồn tại không
      const maxWidth = Math.max(
        20,
        ...rowsArray.map((row) => {
          const cell = row.cells[c - 1];
          return cell && cell.textContent ? cell.clientWidth / 8 : 20; // Nếu ô hoặc nội dung không tồn tại, sử dụng 20 làm giá trị mặc định
        }),
      );

      column.width = maxWidth; // Sử dụng giá trị maxWidth để đặt độ rộng của cột
    }

    // Combine the variables and truncate if necessary
    const sheetName = `Timecards_${realname}_${month}_${year}`.slice(0, 31);

    // Save the workbook to a file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${sheetName}.xlsx`);
  };

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

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
  useEffect(() => {
    setTimeout(function () {
      datacheck == 1 ? exportToExcel() : null;
    }, 500);
  }, []);
  return (
    <>
      <NavTimcard role="admin" />

      <div
        className="timecard-head-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <MonthYearSelector
          onChange={handleDateChange}
          initialMonth={month}
          initialYear={year}
        />
        <ButtonCenter>
          <button
            onClick={exportToExcel}
            className="btn btn--medium btn--green"
          >
            Xuất Thẻ Giờ
          </button>
          <NavLink className="btn" to="/dayoffs/register">
            Đăng ký nghỉ phép
          </NavLink>
        </ButtonCenter>
      </div>
      {realname ? (
        <h3 className="timecard-title">Thẻ giờ của: {realname}</h3>
      ) : null}

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
    </>
  );
};
