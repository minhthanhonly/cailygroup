import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import CTableBody from "../../components/Table/CTableBody";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import ButtonAdd from "../../components/Button/ButtonAdd";

export const Member = () => {

  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
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
      <Heading2 text="Thông tin thành viên" />

      <div className="box-group box-group--second">
        <div className="box-group__item">
          <SelectCustom />
        </div>
        <div className="box-group__item">
          <InputQuantity />
        </div>
        <div className="box-group__item">
          <Search />
        </div>
      </div>

      <ButtonAdd path_add="/member/add" />
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Email", "Skype ID", "Phone", "Sửa", "Xóa"]} />
        <CTableBody data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} permission_edit={true} path_edit="/member/edit" permission_delete={true} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
};
