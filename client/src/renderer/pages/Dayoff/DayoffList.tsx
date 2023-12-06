
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {
  SelectCustom,
} from '../../components/Table/SelectCustom';
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
import { useState } from "react";




export const DayoffList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang

  const actionCheck = (
    <p className="icon icon--check">
      <img
        src={require('../../assets/images/check.png')}
        alt="edit"
        className="fluid-image"
      />
    </p>
  );
  const actionButon = (
    <Button href="/" size='medium' color="orange">Hủy</Button>
  );
  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền", "2", "7:222 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionButon],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền", "2", "7:222 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionButon],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền", "2", "7:222 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionButon],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền", "2", "7:222 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionButon],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền", "2", "7:222 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionButon],

  ]

  // Tính tổng số trang
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return <>
    <NavDayoff role="admin" />
    <CTable>
      <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Hủy đăng ký nghỉ "]} />
      <CTableBody data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />
    </CTable>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  </>;
};
function setCurrentPage(page: any) {
  throw new Error("Function not implemented.");
}

