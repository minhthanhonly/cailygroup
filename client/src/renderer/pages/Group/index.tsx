import { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';
import { AddGroup } from '../../components/Form/Form';
import { Heading2 } from '../../components/Heading';
import { urlControl } from '../../routes/server';
import Modal from '../../components/Modal/Modal';
import { EditGroup } from "../../components/Form/Form";
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
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [modalGroupName, setModalGroupName] = useState('');
  const [modalGroupNameid, setModalGroupNameId] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState('');

  useEffect(() => {
    axios.get(urlControl + 'GroupsController.php').then((response) => {
      setListOfGroups(response.data);
      setIsTableUpdated(false); //đặt lại trạng thái khi dữ liệu thay đổi
    });
  }, [isTableUpdated]); // khi state thay đổi useEffect sẽ chạy lại

  
  let dynamicUpdate = ({id,groupName,}: {id: string;groupName: string;}) => (
    <>
      <button onClick={() => openModal(groupName,id)}>
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/icnedit.png')}
            alt="edit"
            className="fluid-image"
          />
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
                          <img
                            src={require('../../../../assets/icn-group.png')}
                            alt=""
                            className="fluid-image"
                          />
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
                        <button className="btn btn--green"onClick={(event) => handleUpdate(modalGroupNameid,modalGroupName,event)}>Xác nhận</button>
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

  const handleDelete = async (groupId,event) => {
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: groupId };
        let response = await axios.delete(urlControl + 'GroupsController.php', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: payload,
        });
        console.log('DELETE Response:', response.data);
        closeModaldelete();
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };

  const handleUpdate = async (id: string, group_name:string, event) => {
    if (event) {
      event.preventDefault();
      try {
        const dataUpdate = { id, group_name };
        const response = await axios.put(
          urlControl + 'GroupsController.php',
          dataUpdate,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Update Response:', response.data);
        closeModal();
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };
  
  let dynamicDelete = (id) => (
    <>
      <button  onClick={(event) => { openModaldelete(id, event);}}>
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/icndelete.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      </button>
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <h2>Bạn có chắc chắn muốn xóa không?</h2>
        <div className='wrp-button'>
          <button className='btn btn--green' onClick={(event) => handleDelete(isDeleteModalid,event)}>Đồng ý</button>
          <button className='btn btn--orange' onClick={closeModaldelete}>Hủy</button>
        </div>
      </Modaldelete>
    </>
  );

  const openModaldelete = (initialId: string) => {
    setDeleteModalId(initialId);
    setDeleteModalOpen(true);
  };
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
  const handleSubmint = () => {
    if (!groupName) {
      console.error('Tên nhóm không hợp lệ');
      return;
    }
    const group_data = {
      group_name: groupName,
      add_level: 1,
      owner: 'admin',
    };
    setGroupName('');
    fetch(urlControl + 'GroupsController.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ group_data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Data inserted successfully:', responseData);
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới

      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Server error message:', error.response.data);
        }
      });
  };
  
  return (
    <>
      <Heading2 text="Quản lý nhóm" />
      <div className="form-group form-addgroup">
        <label>Nhập Tên Nhóm:</label>
        <img
          src={require('../../../../assets/icn-group.png')}
          alt=""
          className="fluid-image form-addgroup__image"
        />
        <input
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          className="form-input"
          type="text"
          placeholder="Tên nhóm muốn thêm"
        />
        <button className="btn" onClick={handleSubmint}>
          Thêm
        </button>
      </div>
      <CTable>
        <CTableHead heads={['STT', 'Tên Nhóm', 'Sửa', 'Xóa']} />
        <CTableBody data={DataTable} path_edit="/group/edit" />
      </CTable>
    </>
  );
};
