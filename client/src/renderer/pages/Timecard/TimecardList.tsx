import React, { useEffect, useState } from "react";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";
import { Pagination } from "../../components/Pagination";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Excel } from "../../components/ExportExcel/Excel";
import MonthYearSelector from "../../components/Table/SelectMonthYears";

import { urlControl } from '../../routes/server';
import { SelectCustom } from "../../components/Table/SelectCustom";

interface FieldUsers {
  id: number;
  realname: string;
  userid: string;
  authority_name: string;
  group_name: string; // đây là data của thằng bảng khác 
}

export const TimecardList: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);

  const [selectedMonths, setSelectedMonths] = useState<string[]>(Array(listOfUsers.length).fill(''));
  const [selectedYears, setSelectedYears] = useState<string[]>(Array(listOfUsers.length).fill(''));
  const [daysInMonths, setDaysInMonths] = useState<Date[][]>(Array(listOfUsers.length).fill([]));





  const handleDateChange = (month: string, year: string, daysInMonth: Date[], index: number) => {
    setSelectedMonths(prevMonths => {
      const newMonths = [...prevMonths];
      newMonths[index] = month;
      return newMonths;
    });


    setSelectedYears(prevYears => {
      const newYears = [...prevYears];
      newYears[index] = year;
      return newYears;
    });

    setDaysInMonths(prevDays => {
      const newDays = [...prevDays];
      newDays[index] = daysInMonth;
      return newDays;
    });

  };



  useEffect(() => {
    axios.get('http://cailygroup.com/users/').then((response) => {
      setListOfUsers(response.data); setListOfUsers(response.data);
      console.log("listOfUsers", response.data);
    }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  }, [])

  const [groupNames, setGroupNames] = useState<string[]>([]);

  useEffect(() => {
    const uniqueGroupNames = Array.from(new Set(listOfUsers.map(user => user.group_name)));
    setGroupNames(uniqueGroupNames);
  }, [listOfUsers]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  const totalPages = Math.ceil(listOfUsers.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };


  return (
    <>
      <NavTimcard role="admin" />
      <SelectCustom onGroupChange={(groupId: string) => {
        // Xử lý khi nhóm thay đổi groups={groupNames}
      }} />

      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Quyền truy cập", "Tháng năm", "Thẻ giờ", "Xuất Excel"]} />
        <tbody >
          {listOfUsers.map((data, index) => (
            <tr key={index}>
              <td>{data.realname}</td>
              <td>{data.group_name}</td>
              <td>{data.authority_name}</td>
              <td><MonthYearSelector onChange={(month, year, daysInMonth) => handleDateChange(month, year, daysInMonth, index)} /></td>
              <td> <NavLink className="btn" to={`/timecard/` + data.id}> Xem Thẻ Giờ </NavLink></td>
              <td> </td>
              {/* <Excel /> */}
            </tr>
          ))}
        </tbody>

      </CTable>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};