import CardTime from "../../components/Card/Card";
import { AddGroup } from "../../components/Form/Form";
import { Heading3 } from "../../components/Heading";
import ListBranch from "../../components/List/ListBranch";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";


export const TimecardSetting = () => {
  const Data = [
    ["Ngày 01 Tháng 01", "2", "Tết Dương Lịch"],
    ["Ngày 30 Tháng 04", "4", "Ngày giải phóng miền Nam, Thống nhất Đất nước"],
  ]
  return (
    <>
      <NavTimcard role="admin"/>
      <Heading3 text="Cấu hình giờ vào - giờ ra"/>
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime />
          <button className="btn btn--widthAuto">Cập nhật</button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime />
          <button className="btn btn--widthAuto">Cập nhật</button>
        </div>
      </div>
      <Heading3 text="Cấu hình ngày lễ"/>
      <AddGroup/>
      <CTable>
        <CTableHead heads={["Ngày Tháng", "Thứ", "Ngày lễ - Ngày nghỉ", "Hành Động"]}/>
        <CTableBody data={Data} admin={true} deleteData={true}/>
      </CTable>
    </>
  );
};
