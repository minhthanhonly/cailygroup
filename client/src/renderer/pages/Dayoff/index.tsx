import { Button } from "../../components/Button";
import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";

export const Dayoff = () => {

const Data = [
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""],
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]
]

  return (
    <>

      <Heading2 text="Danh sách xin nghỉ phép" />
      <CTable>
        <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]}/>
        <CTableBody data={Data}/>
      </CTable>
      <Pagination />
    </>
  );
};
