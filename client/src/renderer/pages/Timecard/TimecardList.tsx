import React, { useEffect, useState } from "react";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { SelectCustom } from "../../components/Table/SelectCustom";
import MonthYearSelector from "../../components/Table/SelectMonthYears";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";
import { Route, BrowserRouter as Router } from 'react-router-dom';


interface FieldUsers {
  id: number;
  realname: string;
  userid: string;
  authority_name: string;
  group_name: string;
  user_group: string;
}

export const TimecardList: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<FieldUsers[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);


  const handleDateChange = (month: string, year: string, daysInMonth: Date[], index: number) => {
    // Handle date change logic if needed
  };

  useEffect(() => {
    axios.get('http://cailygroup.com/users/')
      .then((response) => {
        setListOfUsers(response.data);

      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);


  useEffect(() => {
    if (selectedGroupName !== null) {
      const trimmedSelectedGroupName = selectedGroupName.trim().toLowerCase();

      const filtered = listOfUsers.filter(users => {
        const userGroup = users.user_group.trim().toLowerCase();

        // Kiểm tra giá trị "all"
        if (trimmedSelectedGroupName === "all") {
          return true; // Hoặc điều kiện của bạn khi giá trị là "all"
        } else {
          return userGroup === trimmedSelectedGroupName;
        }
      });
      setFilteredUsers(filtered);
      setCurrentPage(1); // Reset trang khi thay đổi bộ lọc
    } else {
      setFilteredUsers(listOfUsers);
      setCurrentPage(1); // Reset trang khi thay đổi bộ lọc
    }
  }, [selectedGroupName, listOfUsers]);


  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Trích xuất các items của trang hiện tại
  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <>
      <NavTimcard role="admin" />
      <SelectCustom onGroupChange={(groupId: string) => {
        setSelectedGroupName(groupId);
      }} />

      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Quyền truy cập", "Tháng năm", "Thẻ giờ", "Xuất Excel"]} />
        <tbody>
          {currentItems.map((data, index) => (
            <tr key={index}>
              <td>{data.realname}</td>
              <td>{data.group_name}</td>
              <td>{data.authority_name}</td>
              <td><MonthYearSelector onChange={(month, year, daysInMonth) => handleDateChange(month, year, daysInMonth, index)} /></td>
              <td> <NavLink className="btn" to={`/timecards/` + data.id}> Xem Thẻ Giờ </NavLink></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </CTable>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};