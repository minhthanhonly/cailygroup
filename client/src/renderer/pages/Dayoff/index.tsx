import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';

export const Dayoff = () => {
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
        <a
          className="btn btn--medium btn--orange"
          href={listOfGroups[i].id}
          onClick={(event) => {
            deleteStatus(listOfGroups[i].id, event);
          }}
        >
          Hủy
        </a>
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
  const itemsPerPage = 10; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const deleteStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: dayoffId };
        await axios.delete('http://cailygroup.com/dayoffs/delete/' + dayoffId);
        // await axios.delete(urlControl + 'DayoffsController.php', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   data: payload,
        // });
        const updatedList = await axios.get('http://cailygroup.com/dayoffs/');
        // const updatedList = await axios.get(
        //   urlControl + 'DayoffsController.php',
        //   {
        //     params: {
        //       method: 'GET',
        //     },
        //   },
        // );
        setListOfGroups(updatedList.data);

        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };
  useEffect(() => {
    axios.get('http://cailygroup.com/dayoffs/').then((response) => {
      setListOfGroups(response.data);
    });
    // axios
    //   .get(urlControl + 'DayoffsController.php', {
    //     params: {
    //       method: 'GET',
    //     },
    //   })
    //   .then((response) => {
    //     setListOfGroups(response.data);
    //   });
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
    </>
  );
};
function setCurrentPage(page: any) {
  throw new Error('Function not implemented.');
}
