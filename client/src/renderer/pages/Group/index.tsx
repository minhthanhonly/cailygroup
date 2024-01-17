import { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';
import { Heading2 } from '../../components/Heading';
import Modal from '../../components/Modal/Modal';
import Modaldelete from '../../components/Modal/Modaldelete';

interface GroupProps {
  id: string;
  groupName: string;
  update: React.ReactNode;
  delete: React.ReactNode;
}
export const Group = () => {
  type FieldGroups = {
    id: string;
    group_name: string;
    update: React.ReactNode;
    delete: React.ReactNode;
  };
  type FieldUsers = {
    id: number,
    realname: string,
    group_name: string,
    user_email: string,
    user_skype: string,
    user_phone: string,
  };
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [modalGroupName, setModalGroupName] = useState('');
  const [modalGroupNameid, setModalGroupNameId] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState('');
  const [listOfUsers, setListOfUsers] = useState<FieldUsers[] | []>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [selectedGroup, setSelectedGroup] = useState('');
  const fetchMembersByGroup = async($groupid: string) => {
    const groupid = {groupid:$groupid};
    const res = await axios.get("users/groups/"+$groupid);
    if(res.data.length > 0) {
      setListOfUsers(res.data);
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    axios.get('groups/').then((response) => {
      setListOfGroups(response.data);
      setIsTableUpdated(false); //đặt lại trạng thái khi dữ liệu thay đổi
    });
  }, [isTableUpdated]); // khi state thay đổi useEffect sẽ chạy lại

  let dynamicUpdate = ({ id, groupName, }: { id: string; groupName: string; }) => (
    <>
      <button onClick={() => openModal(groupName, id)}>
        <p className="icon icon--check">
          <img src={require('../../../../assets/icnedit.png')} alt="edit" className="fluid-image" />
        </p>
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <>
            <Heading2 text="Sửa Nhóm" />
            <div className="form-user form">
              <div className="form-content">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Sửa Tên nhóm
                        <img src={require('../../../../assets/icn-group.png')} alt="" className="fluid-image"/>
                      </label>
                      <input
                        value={modalGroupName}
                        onChange={(e) => setModalGroupName(e.target.value)}
                        className="form-input"
                        type="text"
                        placeholder="Nhập Tên nhóm"
                      />
                    </div>
                    <div className="wrp-button">
                      <button className="btn btn--green" onClick={(event) => handleUpdate(modalGroupNameid, modalGroupName, event)}>Xác nhận</button>
                      <button className="btn btn--orange" onClick={closeModal}>Hủy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </Modal>
    </>
  );

  const openModal = (initialGroupName: string, initialGroupNameId: string) => {
    setModalGroupName(initialGroupName);
    setModalGroupNameId(initialGroupNameId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (groupId:string, event:any) => {
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: groupId };
        let response = await axios.delete('groups/delete/', {headers: {'Content-Type': 'application/json',},data: payload,});
        console.log('DELETE Response:', response.data);
        closeModaldelete();
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };

  const handleUpdate = async (id: string, group_name: string, event:any) => {
    if (event) {
      event.preventDefault();
      try {
        const dataUpdate = { id, group_name };
        const response = await axios.put('groups/update/',dataUpdate,{ headers: { 'Content-Type': 'application/json' } });
        console.log('Update Response:', response.data);
        closeModal();
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };

  let dynamicDelete = (id:string) => (
    <>
      <button onClick={(event) => { openModaldelete(id); }}>
        <p className="icon icon--check">
            <img src={require('../../../../assets/icndelete.png')} alt="edit" className="fluid-image"/>
        </p>
      </button>
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <h2>{isDisabled ? 'Bạn không thể xóa vì nhóm có thành viên đang hoạt động' : 'Bạn có chắc chắn muốn xóa không?'}</h2>
        <div className='wrp-button'>
        {!isDisabled &&
         <button className='btn btn--green'  onClick={(event) => handleDelete(isDeleteModalid, event)} disabled={isDisabled}>Đồng ý</button>
        }
          <button className='btn btn--orange' onClick={closeModaldelete}>Quay lại</button>
        </div>
      </Modaldelete>
    </>
  );

  const [minitialId, setMInitialId] = useState('');

  const openModaldelete = (initialId: string) => {
    setMInitialId(initialId);
    setDeleteModalId(initialId);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    if(isDeleteModalOpen  == true) {
      fetchMembersByGroup(minitialId);
    }
  });

  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  let DataTable: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    DataTable.push({
      id: `${listOfGroups[i].id}`,
      group_name: `${listOfGroups[i].group_name}`,
      update: dynamicUpdate({
        id: listOfGroups[i].id,
        groupName: listOfGroups[i].group_name,
      }),
      delete: dynamicDelete(listOfGroups[i].id),
    });
  }
  const handleSubmint = async() => {
    if (!groupName) {
      console.error('Tên nhóm không hợp lệ');
      return;
    }
    try{
      const group_data = {
        group_name: groupName,
        add_level: 1,
        owner: 'admin',
      };
      setGroupName('');
      const res = await axios.post("groups/add/", group_data);
      console.log('Data inserted successfully:', res.data);
      setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
    }
    catch(error){console.error('Lỗi khi thêm dữ liệu:', error);}
  };

  return (
    <>
      <Heading2 text="Quản lý nhóm" />
      <div className="form-group form-addgroup">
        <label>Nhập Tên Nhóm:</label>
        <img src={require('../../../../assets/icn-group.png')} alt="" className="fluid-image form-addgroup__image"/>
        <input
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          className="form-input"
          type="text"
          placeholder="Tên nhóm muốn thêm"
        />
        <button className="btn" onClick={handleSubmint}>Thêm</button>
      </div>
      <CTable>
        <CTableHead heads={['STT', 'Tên Nhóm', 'Sửa', 'Xóa']} />
        <CTableBody data={DataTable} path_edit="/group/edit" path_timecard=""/>
      </CTable>
    </>
  );
};
