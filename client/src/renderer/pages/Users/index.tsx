import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import { useEffect, useState } from "react";
import ButtonAdd from "../../components/Button/ButtonAdd";
import axios from "axios";
import ButtonEdit from "../../components/Button/ButtonEdit";

export const Users = () => {

  type FieldUsers = {
    id: number,
    realname: string,
    group_name: string,
    user_email: string,
    user_skype: string,
    user_phone: string,
  }
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);

  useEffect(() => {
    axios.get('http://cailygroup.com/users/').then((response) => {
      setListOfUsers(response.data);
    }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  }, [])

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Heading2 text="Thông tin thành viên" />

      <div className="box-group box-group--second">
        <div className="box-group__item">
          <SelectCustom onGroupChange={function (groupId: string): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
        <div className="box-group__item">
          <InputQuantity />
        </div>
        <div className="box-group__item">
          <Search />
        </div>
      </div>

      <ButtonAdd path_add="/users/add" />
      <CTable>
        <CTableHead heads={["Họ và tên", "Nhóm", "Email", "Skype ID", "Phone", "Sửa", "Xóa"]} />
        <tbody>
          {listOfUsers.map((data, index) => (
            <tr key={index}>
              <td>{data.realname}</td>
              <td>{data.group_name}</td>
              <td>{data.user_email}</td>
              <td>{data.user_skype}</td>
              <td>{data.user_phone}</td>
              <td><ButtonEdit href={"/users/edit/" + data.id} /></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </CTable>
    </>
  )
};
