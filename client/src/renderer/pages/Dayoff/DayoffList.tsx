import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {
  SelectCustom,
} from '../../components/Table/SelectCustom';
export const DayoffList = () => {
  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", "1"],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", "0"]
  ]
  return <>
    <Heading2 text="Danh sách xin nghỉ phép" />
    <CTable>
      <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Hủy đăng ký nghỉ "]} />
      <CTableBody data={Data} />
    </CTable>
    <Pagination />
  </>;
};
