import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const Dayoff = () => {

const Data = [
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""],
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]
]

  return (
    <>
      <NavDayoff role="admin"/>
      <CTable>
        <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]}/>
        <CTableBody data={Data}/>
      </CTable>
      <Pagination />
    </>
  );
};
