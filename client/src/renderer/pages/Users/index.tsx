import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import CTableBody from "../../components/Table/CTableBody";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState } from "react";
import ButtonAdd from "../../components/Button/ButtonAdd";
import axios from "axios";
import { urlControl } from "../../routes/server";

export const Users = () => {

  type FieldUsers = {
    realname: string,
    user_group: string,
    user_email: string,
    user_skype: string,
    user_phone: string,
  }
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);

  useEffect(() => {
    axios.get('http://cailygroup.com/users/').then((response) => {
      setListOfUsers(response.data)
    })
  }, [])



  // let myArray = <?php echo json_encode($listOfUsers) ?>;
  // console.log(myArray);

  let DataTable: FieldUsers[] = [];

  // let obj: FieldUsers = JSON.parse(listOfUsers.toString());

  // console.log(obj);
  // for (let i = 0; i < listOfUsers.length; i++) {
  //   DataTable.push({
  //     realname: `${listOfUsers[i].realname}`,
  //     user_group: `${listOfUsers[i].user_group}`,
  //     user_email: `${listOfUsers[i].user_email}`,
  //     user_skype: `${listOfUsers[i].user_skype}`,
  //     user_phone: `${listOfUsers[i].user_phone}`
  //   });
  // }

  // listOfUsers.replace('users','');




  const Data = [
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
    ["Huỳnh Thị Thanh Tuyền", "Năng Lương", "huynhthithanhtuyen@gmail.com", "huynhthithanhtuyen@gmail.com", '0973124567'],
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
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

      {/* <ButtonAdd path_add="/member/add" /> */}
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Email", "Skype ID", "Phone", "Sửa", "Xóa"]} />
        <CTableBody data={DataTable} permission_edit={true} path_edit="/member/edit" permission_delete={true} />
      </CTable>
    </>
  )
};
