import { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';
import { AddGroup } from '../../components/Form/Form';
import { Heading2 } from '../../components/Heading';
import { urlControl } from '../../routes/server';
import Modal from '../../components/Modal/Modal';

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

  const [groupname, setGroupname] = useState('');

  useEffect(() => {
    axios.get(urlControl + 'GroupsController.php').then((response) => {
      setListOfGroups(response.data);
      setIsTableUpdated(false); //đặt lại trạng thái khi dữ liệu thay đổi
    });
  }, [isTableUpdated]); // khi state thay đổi useEffect sẽ chạy lại

  const handleDelete = async (
    groupId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');

    if (!isConfirmed) {
      return; // Người dùng không xác nhận xóa
    }
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
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };

  let dynamicUpdate = ({
    id,
    groupName,
  }: {
    id: string;
    groupName: string;
  }) => (
    <>
      <button onClick={() => openModal(groupName)}>
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
            <h2>Sửa tên nhóm</h2>
            <input
              value={groupName}
              onChange={(e) => setGroupname(e.target.value)}
            />

            <div className="wrp-button">
              <button className="btn" onClick={() => handleUpdate(id)}>
                Xác nhận
              </button>
              <button className="btn btn--orange" onClick={closeModal}>
                Hủy
              </button>
            </div>
          </>
        }
      </Modal>
    </>
  );

  const openModal = (initialGroupName: string) => {
    setGroupname(initialGroupName);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = (id: string) => {
    closeModal();
  };

  let dynamicDelete = (id: string) => (
    <button
      onClick={(event) => {
        handleDelete(id, event);
      }}
    >
      <p className="icon icon--check">
        <img
          src={require('../../../../assets/icndelete.png')}
          alt="edit"
          className="fluid-image"
        />
      </p>
    </button>
  );
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
    const group_data = {
      group_name: groupname,
      add_level: 1,
      owner: 'admin',
    };

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
          value={groupname}
          onChange={(event) => setGroupname(event.target.value)}
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
