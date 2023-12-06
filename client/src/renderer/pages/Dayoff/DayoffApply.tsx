import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {SelectCustom,
} from '../../components/Table/SelectCustom';
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const DayoffApply = () => {
  const actionagree = (
    <Button href="/" size='medium' color="green">Xác Nhận</Button>
  );
  const actioncancel = (
    <Button href="/" size='medium' color="orange">Hủy</Button>
  );
  const Data = [
    ["Huỳnh Thị Thanh Tuyền","Web", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",actionagree,actioncancel],
    ["Huỳnh Thị Thanh Tuyền","Web", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",actionagree,actioncancel]
  ]

  return <>
    <NavDayoff role="admin"/>
    <div className="left mt50">
      <SelectCustom />
    </div>
    <CTable>
        <CTableHead heads={["Họ Và Tên","Nhóm", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Đồng Ý", "Từ Chối"]}/>
        <CTableBody data={Data}/>
    </CTable>
    <Pagination />
  </>;
};
