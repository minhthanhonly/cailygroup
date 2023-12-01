import { CTable } from "../../components/Table/CTable"
import CTableBody from "../../components/Table/CTableBody"
import { CTableHead } from "../../components/Table/CTableHead"
import NavTimcard from "../../layouts/components/Nav/NavTimcard"

export const TimecardList = () => {
  const Data = [
    ["Phan Ho Tu", "Web", "Trưởng nhóm", ""],
    ["Phan Ho Tu", "Web", "Trưởng nhóm", ""],
  ]

  return (
    <>
      <NavTimcard role="admin"/>
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Quyền truy cập", "Tháng năm", "Thẻ giờ", "Xuất Excel"]}/>
        <CTableBody data={Data} admin={true} showData={true} exportData={true}/>
      </CTable>
    </>
  )
}
