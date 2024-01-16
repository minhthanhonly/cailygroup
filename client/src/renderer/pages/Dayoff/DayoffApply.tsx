import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { SelectCustom } from '../../components/Table/SelectCustom';
import Modaldelete from '../../components/Modal/Modaldelete';

export const DayoffApply = () => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setID] = useState();
  const openModaldelete = (ids: any) => {
    setID(ids);
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  type FieldGroups = {
    id: any;
    group_name: string;
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
  const handleGroupChange = (groupId: string) => {
    setSelectedGroup(groupId);
    fetchData();
  };

  let DataTable: FieldGroups[] = [];
  listOfGroups.sort((a, b) => {
    const dateA = new Date(
      (a as any).date.split('-').reverse().join('-'),
    ).getTime();
    const dateB = new Date(
      (b as any).date.split('-').reverse().join('-'),
    ).getTime();
    if (dateA !== dateB) {
      return dateA - dateB;
    }
    return (a as any).group_name.localeCompare((b as any).group_name);
  });

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
        Từ chối
      </a>
    );
    if (listOfGroups[i].status == 0) {
      DataTable.push({
        realname: `${listOfGroups[i].realname}`,
        group_name: `${listOfGroups[i].group_name}`,
        day_number: `${listOfGroups[i].day_number}`,
        start_datetime: `${listOfGroups[i].start_datetime}`,
        end_datetime: `${listOfGroups[i].end_datetime}`,
        note: `${listOfGroups[i].note}`,
        yes: dynamicYes,
        no: dynamicNo,
      } as unknown as FieldGroups);
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const [groupsResponse, dayoffsResponse] = await Promise.all([
        axios.get('groups'),
        axios.get('dayoffs', {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const data = { owner: users.realname };
  const updateStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      event.preventDefault();
      try {
        const response = await axios.post('dayoffs/update/' + dayoffId, {
          data,
        });
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
      event.preventDefault();
      try {
        let response = await axios.post('dayoffs/refuse/' + dayoffId, {
          data,
        });
        console.log(response.data);
        fetchData();
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
            'nhóm',
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
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <>
          <h2 className="mb15">Xác nhận hủy nghỉ phép:</h2>
          <div className="wrp-button">
            <a
              className="btn btn--green"
              onClick={(event) => {
                deleteStatus(id, event);
              }}
              href={id}
            >
              Đồng ý
            </a>
            <button className="btn btn--orange" onClick={closeModaldelete}>
              Hủy
            </button>
          </div>
        </>
      </Modaldelete>
    </>
  );
};
