import React, { useEffect, useState } from 'react';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../components/Pagination';
import { SelectCustom } from '../../components/Table/SelectCustom';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { UserRole } from '../../components/UserRole';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';


import { Timecard } from "./index";
import CTableTimeCardHead from '../../components/Table/Table_01/CTableTimeCardHead';
import CTableTimeCardBody from '../../components/Table/Table_01/CTableTimeCardBody';

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
  daysInMonth?: Date[];
}

export const TimecardList: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);
  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(
    null,
  );
  const [filteredUsers, setFilteredUsers] = useState<FieldUsers[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);


  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [user_id, setUser_id] = useState<number>();

  const navigate = useNavigate();

  // Lưu giá trị biến state trong Link
  const [selectedParams, setSelectedParams] = useState<TimecardParams>({});

  const [selectedDates, setSelectedDates] = useState<{
    [id: number]: { month: string; year: string; daysInMonth?: Date[] };
  }>({});
  const [MonthYearSelectorDefaultMonth, setMonthYearSelectorDefaultMonth] =
    useState<string>('');
  const [MonthYearSelectorDefaultYear, setMonthYearSelectorDefaultYear] =
    useState<string>('');

  const handleDateChange = (
    month: string,
    year: string,
    daysInMonth: Date[],
    userId: number | undefined,
    index: number,
  ) => {
    console.log(`Selected ID: ${userId}`); // Log ID của người được chọn
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);
    setSelectedDates((prevState) => ({
      ...prevState,
      [userId || index]: { month, year, daysInMonth },
    }));
    // Handle date change logic if needed
  };

  const fetchTimecards = async () => {
    const res = await axiosPrivate.get('timecards/list/');
    setListOfUsers(res.data);
    setSelectedDates({});
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    setMonthYearSelectorDefaultMonth(currentMonth.toString());
    setMonthYearSelectorDefaultYear(currentYear.toString());

    res.data.forEach((users: { realname: any; id: any; }) => {
      console.log(`ID of ${users.realname}: ${users.id}`);
    });
  };
  useEffect(() => {
    if (selectedGroupName !== null) {
      const trimmedSelectedGroupName = selectedGroupName.trim().toLowerCase();
      const filtered = listOfUsers.filter((users) => {
        const userGroup = users.user_group.trim().toLowerCase();
        if (trimmedSelectedGroupName === 'all') {
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

  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleButtonClick = (dataId: number, selectedIndex: number) => {
    const { month, year, daysInMonth } = selectedDates[selectedIndex] || {};
    redirectToTimecards(dataId, month, year, daysInMonth, 0);
  };

  const handleButtonClickExportData = (
    dataId: number,
    selectedIndex: number,
  ) => {
    const { month, year, daysInMonth } = selectedDates[selectedIndex] || {};
    console.log(dataId, selectedIndex, daysInMonth);
    const ngayHienTai = new Date();
    const thangHienTai = ngayHienTai.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0

    // Tạo mảng với 5 phần tử
    const mangNgayTrongThang = Array(31)
      .fill(null)
      .map((_, index) => {
        // Tính toán ngày cho mỗi phần tử trong mảng
        const ngayTrongThang = new Date(
          ngayHienTai.getFullYear(),
          thangHienTai - 1,
          index + 1,
        );

        // Trả về đối tượng chứa thông tin ngày và các thông tin khác nếu cần
        return {
          ngay: ngayTrongThang.toISOString().split('T')[0],
          // Các thông tin khác có thể thêm vào đây
        };
      });

    // In ra kết quả
    console.log(mangNgayTrongThang);
    // const { month, year, daysInMonth } = selectedDates[selectedIndex] || {};
    // redirectToTimecards(dataId, month, year, daysInMonth, 1);
  };

  const redirectToTimecards = (
    dataId: number,
    month: string | undefined,
    year: string | undefined,
    daysInMonth: Date[] | undefined,
    datacheck: number = 0,
  ) => {
    const queryParams: Record<string, string | Date[] | number | undefined> = {
      id: dataId.toString(),
      month: month || MonthYearSelectorDefaultMonth,
      year: year || MonthYearSelectorDefaultYear,
      daysInMonth: daysInMonth || undefined,
      datacheck: datacheck || 0,
    };

    navigate('/timecards', { state: queryParams });
  };

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;

  const fetchTimecardsByGroup = async ($groupid: string) => {
    const res = await axiosPrivate.get('timecards/groups/' + $groupid);
    setListOfUsers(res.data);
  };

  useEffect(() => {
    if (isLeader) {
      // fetchTimecardsByGroup(users.user_group_id);
      fetchTimecards();
    } else {
      fetchTimecards();
    }
  }, [MonthYearSelectorDefaultMonth, MonthYearSelectorDefaultYear]);

  return (
    <>
      <NavTimcard role="admin" />
      {isAdmin || isManager ? (
        <SelectCustom
          onGroupChange={(groupId: string) => {
            setSelectedGroupName(groupId);
          }}
        />
      ) : (
        ''
      )}

      {isLeader && (
        <SelectCustom
          onGroupChange={(groupId: string) => {
            setSelectedGroupName(groupId);
          }}
        />
      )}
      <CTable>
        <CTableHead
          heads={[
            'Họ và tên',
            'Nhóm',
            'Quyền truy cập',
            'Tháng năm',
            'Thẻ giờ',
            'Xuất Excel',
          ]}
        />
        <tbody>
          {currentItems.map((data, index) => (
            <tr key={index}>
              <td>{data.realname}</td>
              <td>{data.group_name}</td>
              <td>{data.authority_name}</td>
              <td>
                <MonthYearSelector
                  onChange={(month, year, daysInMonth) =>
                    handleDateChange(month, year, daysInMonth, data.id, index)
                  }
                />
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleButtonClick(data.id, index)}
                >
                  {' '}
                  Xem Thẻ Giờ{' '}
                </button>
              </td>
              <td>
                <button
                  className="btn btn--medium btn--green"
                  onClick={() => handleButtonClickExportData(data.id, index)}
                >
                  Xuất Thẻ Giờ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </CTable>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* <div className="table-container table--01">
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
      </div> */}
    </>
  );
};
