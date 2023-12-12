import { useState } from "react"
import { CTable } from "../../components/Table/CTable"
import CTableBody from "../../components/Table/CTableBody"
import { CTableHead } from "../../components/Table/CTableHead"
import NavTimcard from "../../layouts/components/Nav/NavTimcard"
import { Pagination } from "../../components/Pagination"

export const TimecardList = () => {
  const Data = [
    ["Phan Ho Tu", "Web", "Trưởng nhóm",],
    ["Phan Ho Tu", "Web", "Trưởng nhóm",],
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
      <NavTimcard role="admin" />
      <p className="txt-title">Nhóm: Web</p>
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Quyền truy cập", "Tháng năm", "Thẻ giờ", "Xuất Excel"]} />
        <CTableBody path_edit={"edit"} data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} selector={true} permission_view={true} permission_export={true} />
      </CTable>

      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
}
