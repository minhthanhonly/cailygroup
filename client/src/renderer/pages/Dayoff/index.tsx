import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import { Button } from '../../components/Button';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';

export const Dayoff = () => {
  type FieldGroups = {
    realname: string;
    day_number: string;
    start_datetime: string;
    end_datetime: string;
    note: string;
    status: React.ReactNode;
  };

  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  useEffect(() => {
    axios.get(urlControl + 'DayoffsController.php').then((response) => {
      setListOfGroups(response.data);
    });
  }, []);

  const actionCheck = (
    <p className="icon icon--check">
      <img
        src={require('../../../../assets/check.png')}
        alt="edit"
        className="fluid-image"
      />
    </p>
  );
  const actionButon = (
    <Button href="/" size="medium" color="orange">
      Hủy
    </Button>
  );
  let DataTable: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    let dynamicAction;

    if (listOfGroups[i].status === '0') {
      dynamicAction = (
        <Button href="/" size="medium" color="orange">
          Hủy
        </Button>
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
    } as FieldGroups);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavDayoff role="admin" />
      <CTable>
        <CTableHead
          heads={[
            'Họ Và Tên',
            'Số Ngày',
            'Ngày Bắt Đầu',
            'Ngày Kết Thúc',
            'Ghi Chú',
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
    </>
  );
};
function setCurrentPage(page: any) {
  throw new Error('Function not implemented.');
}
