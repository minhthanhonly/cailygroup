import { Link } from "react-router-dom";
import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { Button } from "../../components/Button";
import CTable_Col from "../../components/Table/TableCustom/CTable_Col";
import CTable_Row from "../../components/Table/TableCustom/CTable_Row";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import CTableBody from "../../components/Table/CTableBody";
import { Pagination } from "../../components/Pagination";




export const Member = () => {

  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
  ]
  return (
    <>
      <Heading2 text="Thông tin thành viên" />

      <div className="box-group box-group--second">
        <div className="box-group__item">
          <SelectCustom />
        </div>
        <div className="box-group__item">
          <InputQuantity />
        </div>
        <div className="box-group__item">
          <Search />
        </div>
      </div>

      <Button size="medium">Bắt đầu</Button>

      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Email", "Skype ID", "Phone", "Hành Động"]} />
        <CTableBody data={Data} editData={true} />
      </CTable>
      <Pagination />
      {/* <Link to="/member-add">Thêm thành viên</Link>
      <br/>
      <br/>
      <Link to="/member-edit">Sửa thành viên</Link> */}
    </>
  )
};
