import { Heading2 } from "../../components/Heading";
import { InputQuantity } from "../../components/InputQuantity";
import { Search } from "../../components/Search";
import { CTable } from "../../components/Table/CTable";
import { CTableHead } from "../../components/Table/CTableHead";
import { useEffect, useState } from "react";
import ButtonAdd from "../../components/Button/ButtonAdd";
import axios from "axios";
import ButtonEdit from "../../components/Button/ButtonEdit";
import ButtonDelete from "../../components/Button/ButtonDelete";
import Modaldelete from "../../components/Modal/Modaldelete";
import { Pagination } from "../../components/Pagination";

function Members() {
  const [isTableUpdated, setIsTableUpdated] = useState(false);

  /*
  * LẤY DANH SÁCH THÀNH VIÊN
  */
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
      setIsTableUpdated(false);
    }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  }, [isTableUpdated])

  /*
  * LẤY TẤT CẢ NHÓM
  */
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  type FieldGroups = {
    id: string,
    group_name: string,
  }
  useEffect(() => {
    axios.get('http://cailygroup.com/groups/').then((response) => {
      setListOfGroups(response.data);
      setIsTableUpdated(false);
    }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  }, [isTableUpdated])

  /*
  * LẤY DANH SÁCH USER THEO NHÓM
  */
  const [selectedGroup, setSelectedGroup] = useState('');
  const fetchMembersByGroup = async($groupid: string) => {
    const groupid = {groupid:$groupid};
    const res = await axios.get("http://cailygroup.com/users/groups/"+$groupid);
    setListOfUsers(res.data);
  };
  useEffect(() => {
    if (selectedGroup) {
      fetchMembersByGroup(selectedGroup);
    }
  }, [selectedGroup]);

  /*
  * XÓA USER
  */
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState(0);
  const handleDelete = async($id: number) => {

  const formData = {id:$id}
    const res = await axios.post("http://cailygroup.com/users/delete", formData);
    setIsTableUpdated(true);
    closeModal();
  }

  const openModal = ($id: number) => {
    setModalOpen(true);
    setDeleteModalId($id)
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let DataTable: FieldUsers[] = [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số mục muốn hiển thị trên mỗi trang
  // Tính tổng số trang
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const [message, setMessage] = useState('');

  return (
    <>
      <Heading2 text="Thông tin thành viên" />
      <div className="box-group box-group--second">
        <div className="box-group__item">
          <div className="select__box group">
            <div className="select__box--title">
              <p>Nhóm:</p>
            </div>
            <div className="select__box--flex grid-row select-dropdown">
              <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                <option value="-1">Tất cả</option>
                {listOfGroups.map((value, index) => (
                  <option value={value.id} key={index}>{value.group_name}</option>
                ))}
              </select>
          </div>
        </div>
        </div>
        <div className="box-group__item">
          <InputQuantity total={listOfUsers.length} />
        </div>
        <div className="box-group__item">
          <Search />
        </div>
      </div>
      <ButtonAdd path_add="/members/add" />
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
              <td><ButtonEdit href={"/members/edit/" + data.id} /></td>
              <td><ButtonDelete onButtonClick={() => openModal(data.id)} /></td>
            </tr>
          ))}
        </tbody>
      </CTable>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Modaldelete isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Bạn có chắc chắn muốn xóa không?</h2>
        <div className='wrp-button'>
          <button className='btn btn--green' onClick={() => handleDelete(isDeleteModalid)}>Đồng ý</button>
          <button className='btn btn--orange' onClick={closeModal}>Hủy</button>
        </div>
      </Modaldelete>
    </>
  )
};

export default Members;
