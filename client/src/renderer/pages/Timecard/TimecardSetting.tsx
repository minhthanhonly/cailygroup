import { AddGroup } from "../../components/Form/Form";
import { Heading3Center } from "../../components/Heading";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";


export const TimecardSetting = () => {
  const Data = [
    ["Ngày 01 Tháng 01", "2", "Tết Dương Lịch"],
    ["Ngày 30 Tháng 04", "4", "Ngày giải phóng miền Nam, Thống nhất Đất nước"],
  ]
  return (
    <>
      <Heading3Center text="Cấu hình giờ vào - giờ ra"/>
      <Heading3Center text="Cấu hình ngày lễ"/>
      <AddGroup/>
      <CTable>
        <CTableHead heads={["Ngày Tháng", "Thứ", "Ngày lễ - Ngày nghỉ", "Hành Động"]}/>
        <CTableBody data={Data} admin={true} action="delete"/>
      </CTable>
    </>
  );
};
