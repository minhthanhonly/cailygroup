
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {
  SelectCustom,
} from '../../components/Table/SelectCustom';
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const DayoffList = () => {
  const Data = [
<<<<<<< HEAD
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", "1"],
    ["Huỳnh Thị Thanh Tuyền", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", "0"]
=======
    ["Huỳnh Thị Thanh Tuyền","1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",true],
    ["Huỳnh Thị Thanh Tuyền","1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", false]
>>>>>>> 598f9700fbfb817e33ed3026bc2da0d604913b90
  ]
  return <>
    <NavDayoff role="admin"/>
    <CTable>
      <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Hủy đăng ký nghỉ "]} />
      <CTableBody data={Data} />
    </CTable>
    <Pagination />
  </>;
};
