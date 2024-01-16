import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import { useEffect, useState } from "react";
import ButtonAdd from "../../components/Button/ButtonAdd";
import axios from "../../api/axios";
import ButtonEdit from "../../components/Button/ButtonEdit";
import Modal from "../../components/Modal/Modal";
import ButtonDelete from "../../components/Button/ButtonDelete";
import { useNavigate } from "react-router-dom";
import SelectGroup from "../../components/Select/selectGroup";

export const Users = () => {
  const navigate = useNavigate();
  const [isTableUpdated, setIsTableUpdated] = useState(false);

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
    axios.get('users/').then((response) => {
      setListOfUsers(response.data);
      setIsTableUpdated(false);
    }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  }, [isTableUpdated])

  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleDelete = async ($id: number) => {
    const formData = { id: $id }
    const res = await axios.post("users/delete", formData);
    setIsTableUpdated(true);
    setTimeout(() => {
      closeModal();
    }, 1000);
  }

  const openModal = ($id: number) => {
    setModalOpen(true);
    handleDelete($id)
  };

  const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);

  return (
    <>
      <Heading2 text="Thông tin thành viên" />

      <div className="box-group box-group--second">
        <div className="box-group__item">

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
              <td><ButtonDelete onButtonClick={() => openModal(data.id)} /></td>
            </tr>
          ))}
        </tbody>
      </CTable>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <>
            <h3 className="hdglv3">Xác nhận xóa</h3>
            {/* {message=='' ? '' : <div className="box-bg"><p className="bg bg-green">{message}</p></div>} */}
            <div className="wrp-button">
              <button className="btn" onClick={() => handleDelete}>Xác nhận</button>
              <button className="btn btn--orange" onClick={closeModal}>
                Hủy
              </button>
            </div>
          </>
        }
      </Modal>
    </>
  )
};
