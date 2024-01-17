import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Modaldelete from '../../components/Modal/Modaldelete';

export const Dayoff = () => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id, setID] = useState();
  const openModaldelete = (ids: number) => {
    setID(ids);
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  type FieldGroups = {
    id: string;
    date: string;
    realname: string;
    group_name: string;
    day_number: string;
    start_datetime: string;
    end_datetime: string;
    note: string;
    owner: string;
    status: React.ReactNode;
  };

  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  let DataTable: FieldGroups[] = [];
  listOfGroups.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-')).getTime();
    const dateB = new Date(b.date.split('-').reverse().join('-')).getTime();
    return dateA - dateB;
  });
  for (let i = 0; i < listOfGroups.length; i++) {
    let dynamicAction;

    if (listOfGroups[i].status === '0') {
      dynamicAction = (
        <>
          <button
            className="btn btn--medium btn--orange"
            onClick={(event) => {
              openModaldelete(listOfGroups[i].id);
            }}
          >
            Hủy
          </button>
        </>
      );
    } else if (listOfGroups[i].status === '2') {
      dynamicAction = (
        <div className="center">
          <p className="icon icon--check">
            <img
              src={require('../../../../assets/minus-button.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
          {listOfGroups[i].owner}
        </div>
      );
    } else {
      dynamicAction = (
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/check.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      );
    }
    DataTable.push({
      realname: `${listOfGroups[i].realname}`,
      group_name: `${listOfGroups[i].group_name}`,
      day_number: `${listOfGroups[i].day_number}`,
      start_datetime: `${listOfGroups[i].start_datetime}`,
      end_datetime: `${listOfGroups[i].end_datetime}`,
      note: `${listOfGroups[i].note}`,
      status: dynamicAction,
    } as unknown as FieldGroups);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  let data = {
    id: users.id,
  };
  const deleteStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    console.log(dayoffId);
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: dayoffId };
        await axios.delete('dayoffs/delete/' + dayoffId);
        const updatedList = await axios.get('dayoffs/getforuser/' + users.id);
        setListOfGroups(updatedList.data);

        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
    closeModaldelete();
  };
  useEffect(() => {
    axios.get('dayoffs/getforuser/' + users.id).then((response) => {
      setListOfGroups(response.data);
    });
  }, [currentPage]);
  return (
    <>
      <NavDayoff role="admin" />
      <CTable>
        <CTableHead
          heads={[
            'Họ và tên',
            'nhóm',
            'Số giờ',
            'Giờ bắt đầu',
            'Giờ kết thúc',
            'Ghi chú',
            'Hủy đăng ký nghỉ ',
          ]}
        />
        <CTableBody
          data={DataTable.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
          )}
          path_edit="/"
          path_timecard={''}
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
