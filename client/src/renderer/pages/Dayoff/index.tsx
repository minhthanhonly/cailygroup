import { useState } from "react";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const Dayoff = () => {

  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023"],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023"],
  ]
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavDayoff role="admin" />
      <CTable>
        <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc"]} />
        <CTableBody data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};
