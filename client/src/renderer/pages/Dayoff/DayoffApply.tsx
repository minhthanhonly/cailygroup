import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';
import { SelectCustom } from '../../components/Table/SelectCustom';

export const DayoffApply = () => {
  type FieldGroups = {
    id: any;
    realname: string;
    day_number: string;
    start_datetime: string;
    end_datetime: string;
    note: string;
    yes: React.ReactNode;
    no: React.ReactNode;
    status: number;
  };
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const fetchData = useCallback(async () => {
    try {
      const [groupsResponse, dayoffsResponse] = await Promise.all([
        axios.get(urlControl + 'GroupsController.php'),
        axios.get(urlControl + 'DayoffsController.php', {
          params: {
            group: selectedGroup,
          },
        }),
      ]);

      const groupsData = groupsResponse.data;
      const dayoffsData = Array.isArray(dayoffsResponse.data)
        ? dayoffsResponse.data
        : [];

      const combinedData = dayoffsData.map((dayoff) => {
        const groupInfo = groupsData.find(
          (group: { id: any; user_id: any }) =>
            group.id === dayoff.user_group || group.user_id === dayoff.user_id,
        );

        return {
          ...dayoff,
          group_name: groupInfo ? groupInfo.group_name : 'Unknown Group',
        };
      });

      setListOfGroups(combinedData);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setListOfGroups([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGroupChange = (groupId: string) => {
    setSelectedGroup(groupId);
    fetchData();
  };

  let DataTable: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    let dynamicYes = (
      <a
        className="btn btn--medium btn--green"
        onClick={(event) => {
          updateStatus(listOfGroups[i].id, event);
        }}
        href={listOfGroups[i].id}
      >
        Đồng ý
      </a>
    );
    let dynamicNo = (
      <a
        className="btn btn--medium btn--orange"
        onClick={(event) => {
          deleteStatus(listOfGroups[i].id, event);
        }}
        href={listOfGroups[i].id}
      >
        Hủy
      </a>
    );
    if (listOfGroups[i].status == 0) {
      DataTable.push({
        realname: `${listOfGroups[i].realname}`,
        day_number: `${listOfGroups[i].day_number}`,
        start_datetime: `${listOfGroups[i].start_datetime}`,
        end_datetime: `${listOfGroups[i].end_datetime}`,
        note: `${listOfGroups[i].note}`,
        yes: dynamicYes,
        no: dynamicNo,
      } as unknown as FieldGroups);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const updateStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      const isConfirmed = window.confirm('Duyệt nghỉ phép?');

      if (!isConfirmed) {
        return;
      }
      event.preventDefault();
      try {
        const response = await axios.post(
          urlControl + 'DayoffsController.php',
          {
            method: 'UPDATE_STATUS',
            id: dayoffId,
            status: 1, // Đặt status thành 1 khi được chấp nhận
          },
        );
        fetchData(); // Tải lại dữ liệu sau khi cập nhật trạng thái
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };
  const deleteStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      const isConfirmed = window.confirm('Hủy đăng ký nghỉ phép?');

      if (!isConfirmed) {
        return;
      }
      event.preventDefault();
      try {
        const payload = { id: dayoffId };
        let response = await axios.delete(
          urlControl + 'DayoffsController.php',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            data: payload,
          },
        );
        fetchData(); // Tải lại dữ liệu sau khi cập nhật trạng thái
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };

  return (
    <>
      <NavDayoff role="admin" />
      <div className="left select-ml0">
        <SelectCustom onGroupChange={handleGroupChange} />
      </div>
      <CTable>
        <CTableHead
          heads={[
            'Họ Và Tên',
            'Số Ngày',
            'Ngày Bắt Đầu',
            'Ngày Kết Thúc',
            'Ghi Chú',
            'Đồng Ý',
            'Từ Chối',
          ]}
        />
        <CTableBody
          data={DataTable.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
          )}
          path_edit="/"
        />
      </CTable>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
