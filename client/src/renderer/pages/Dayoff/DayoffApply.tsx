import { Heading2 } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {SelectCustom,
} from '../../components/Table/SelectCustom';
import { Link } from "react-router-dom";
export const DayoffApply = () => {
  const Data = [
    ["Huỳnh Thị Thanh Tuyền","Web", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",],
    ["Huỳnh Thị Thanh Tuyền","Web", "1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",]
  ]

  return <>
    <Heading2 text="Danh sách duyệt nghỉ phép" />
    <div className="left">
      <SelectCustom />
    </div>
    <CTable>
        <CTableHead heads={["Họ Và Tên","Nhóm", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Đồng Ý", "Từ Chối"]}/>
        <CTableBody data={Data} accreptAdminData={true} />
    </CTable>
    <Pagination />
  </>;
};
