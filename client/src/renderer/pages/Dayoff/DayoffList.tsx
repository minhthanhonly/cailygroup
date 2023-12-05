
import { Pagination } from "../../components/Pagination";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import { Button } from "../../components/Button";
import {SelectCustom,
} from '../../components/Table/SelectCustom';
import NavDayoff from "../../layouts/components/Nav/NavDayoff";
export const DayoffList = () => {
  const actionCheck = (
    <p className="icon icon--check">
      <img
        src={require('../../assets/images/check.png')}
        alt="edit"
        className="fluid-image"
      />
    </p>
  );
  const actionButon = (
    <Button href="/" size='medium' color="orange">Hủy</Button>
  );

  

  const Data = [
    ["Huỳnh Thị Thanh Tuyền","1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm",actionButon],
    ["Huỳnh Thị Thanh Tuyền","1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck],
    ["Huỳnh Thị Thanh Tuyền","1", "7:30 - 16/11/2023", "17:00 - 16/11/2023", "Nghỉ Phép Năm", actionCheck]
  ]
  return <>
    <NavDayoff role="admin"/>
    <CTable>
        <CTableHead heads={["Họ Và Tên", "Số Ngày", "Ngày Bắt Đầu", "Ngày Kết Thúc", "Ghi Chú", "Hủy đăng ký nghỉ "]}/>
        <CTableBody data={Data}/>
    </CTable>
    <Pagination />
  </>;
};
