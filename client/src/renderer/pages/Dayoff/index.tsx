import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';
import Modaldelete from '../../components/Modal/Modaldelete';

export const Dayoff = () => {
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
    realname: string;
    day_number: string;
    start_datetime: string;
    end_datetime: string;
    note: string;
    status: React.ReactNode;
  };

  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  let DataTable: FieldGroups[] = [];
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

  const deleteStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    console.log(dayoffId);
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: dayoffId };
        await axios.delete('http://cailygroup.com/dayoffs/delete/' + dayoffId);
        const updatedList = await axios.get('http://cailygroup.com/dayoffs/');
        setListOfGroups(updatedList.data);

        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
    closeModaldelete();
  };

  useEffect(() => {
    axios.get('http://cailygroup.com/dayoffs/').then((response) => {
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
            'Số Ngày',
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
