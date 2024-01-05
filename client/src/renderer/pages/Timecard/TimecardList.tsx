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

interface FieldUsers {
  id: number;
  realname: string;
  userid: string;
  authority: string;
  user_groupname: string;
}

export const TimecardList: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);

  const [selectedMonths, setSelectedMonths] = useState<string[]>(Array(listOfUsers.length).fill(''));
  const [selectedYears, setSelectedYears] = useState<string[]>(Array(listOfUsers.length).fill(''));
  const [daysInMonths, setDaysInMonths] = useState<Date[][]>(Array(listOfUsers.length).fill([]));


  console.log("selectedMonths", selectedMonths);
  console.log("selectedYears", selectedYears);


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
    axios.get('http://cailygroup.com/users/')
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  const totalPages = Math.ceil(listOfUsers.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavTimcard role="admin" />
      <p className="txt-title">Nhóm: Web</p>
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Quyền truy cập", "Tháng năm", "Thẻ giờ", "Xuất Excel"]} />
        <tbody >
          {listOfUsers.map((data, index) => (
            <tr key={index}>
              <td>{data.realname}</td>
              <td>{data.user_groupname}</td>
              <td>{data.authority}</td>
              <td><MonthYearSelector onChange={(month, year, daysInMonth) => handleDateChange(month, year, daysInMonth, index)} /></td>
              <td> <NavLink className="btn" to={`/timecard` + data.id}> Xem Thẻ Giờ </NavLink></td>
              <td> <Excel /> </td>
            </tr>
          ))}
        </tbody>

      </CTable>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};