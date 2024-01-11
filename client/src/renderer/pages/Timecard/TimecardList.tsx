import React, { useEffect, useState } from "react";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Pagination } from "../../components/Pagination";
import { SelectCustom } from "../../components/Table/SelectCustom";
import MonthYearSelector from "../../components/Table/SelectMonthYears";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";

interface FieldUsers {
  id: number;
  realname: string;
  userid: string;
  authority_name: string;
  group_name: string;
  user_group: string;
}

interface TimecardParams {
  id?: number;
  month?: string;
  year?: string;
}

export const TimecardList: React.FC = () => {
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<FieldUsers[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Lưu giá trị biến state trong Link
  const [selectedParams, setSelectedParams] = useState<TimecardParams>({});

  const [selectedDates, setSelectedDates] = useState<{ [id: number]: { month: string; year: string; daysInMonth?: Date[] } }>({});
  const [MonthYearSelectorDefaultMonth, setMonthYearSelectorDefaultMonth] = useState<string>("");
  const [MonthYearSelectorDefaultYear, setMonthYearSelectorDefaultYear] = useState<string>("");

  const handleDateChange = (month: string, year: string, daysInMonth: Date[], index: number) => {
    setSelectedDates(prevState => ({
      ...prevState,
      [index]: { month, year, daysInMonth }
    }));
    // Handle date change logic if needed
  };

  useEffect(() => {
    axios.get('http://cailygroup.com/timecards/list')
      .then((response) => {
        setListOfUsers(response.data);
        setSelectedDates({});
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        setMonthYearSelectorDefaultMonth(currentMonth.toString());
        setMonthYearSelectorDefaultYear(currentYear.toString());
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }, [MonthYearSelectorDefaultMonth, MonthYearSelectorDefaultYear]);

  useEffect(() => {
    if (selectedGroupName !== null) {
      const trimmedSelectedGroupName = selectedGroupName.trim().toLowerCase();
      const filtered = listOfUsers.filter(users => {
        const userGroup = users.user_group.trim().toLowerCase();
        if (trimmedSelectedGroupName === "all") {
          return true;
        } else {
          return userGroup === trimmedSelectedGroupName;
        }
      });
      setFilteredUsers(filtered);
      setCurrentPage(1);
    } else {
      setFilteredUsers(listOfUsers);
      setCurrentPage(1);
    }
  }, [selectedGroupName, listOfUsers]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleButtonClick = (dataId: number, selectedIndex: number) => {
    const { month, year } = selectedDates[selectedIndex] || {};

    // Cập nhật trạng thái selectedParams với ID, tháng và năm được chọn
    const queryParams: Record<string, string> = {
      id: dataId.toString(),
      month: month || MonthYearSelectorDefaultMonth,
      year: year || MonthYearSelectorDefaultYear,
    };

    // Chuyển hướng đến trang mới và truyền tham số qua query string
    console.log("selectedParams222", queryParams);
    navigate(`/timecards`, { state: queryParams });
    //navigate(`/timecards?${new URLSearchParams(queryParams).toString()}`);
  };


  // useEffect(() => {
  //   if (selectedParams.id || selectedParams.month || selectedParams.year) {
  //     console.log("selectedParams", selectedParams);
  //   }
  // }, [selectedParams]);
  // ...


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
              <td>
                <button className="btn" onClick={() => handleButtonClick(data.id, index)}> Xem Thẻ Giờ </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </CTable>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};