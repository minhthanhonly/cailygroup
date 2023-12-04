import { Button } from "../../components/Button";
import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Link } from "react-router-dom";
export const Dayoff = () => {

const Data = [
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""],
  ["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]
]

  return (
    <>

      <Heading2 text="Danh sách xin nghỉ phép" />
      <Link to="/day-off-list">Danh sách duyệt nghỉ phép</Link>
      <br/>
      <br/>
      <Link to="/day-off-register">Đăng ký nghỉ phép</Link>
      <CTable>
        <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", ""]}/>
        <CTableBody data={Data}/>
      </CTable>
      <Pagination />
    </>
  );
};
