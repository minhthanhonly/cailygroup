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

export const Timecard = () => {
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
  };

  const exportToExcel = () => {
    // Lấy đối tượng bảng HTML
    const table = document.getElementById('timecards_table');

    // Tạo workbook
    const wb = XLSX.utils.book_new();

    // Tạo sheet cho "Nguyễn Văn A"
    const wsVA = XLSX.utils.aoa_to_sheet([['Nguyễn Văn A']]);
    const mergeConfig = { s: { r: 0, c: 0 }, e: { r: 2, c: 7 } };
    wsVA['!merges'] = [mergeConfig];

    // Style cho cell "Nguyễn Văn A"
    const centerStyle = {
      hcenter: true,
      vcenter: true,
    };
    wsVA[XLSX.utils.encode_cell(mergeConfig.s)].s = centerStyle;

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, wsVA, 'Sheet1');

    // Tạo sheet cho dữ liệu từ bảng timecards_table
    const wsData = XLSX.utils.table_to_sheet(table);

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, wsData, 'DataSheet');

    // Xuất workbook ra file Excel
    XLSX.writeFile(wb, 'tableExcelFile.xlsx');
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
            {/* RowCounts = {RowCounts}  data={DataTable}  data={DataTable} */}
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
