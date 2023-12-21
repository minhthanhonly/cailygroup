import { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';
import { AddGroup } from '../../components/Form/Form';
import { Heading2 } from '../../components/Heading';
import { urlControl } from '../../routes/server';

export const Group = () => {
  type FieldGroups = {
    id: string,
    group_name:string;
    update: React.ReactNode;
    delete: React.ReactNode;
  }
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);

  useEffect(() => {
    axios.get(urlControl + "GroupsController.php").then((response) => {
      setListOfGroups(response.data);
      setIsTableUpdated(false);//đặt lại trạng thái khi dữ liệu thay đổi
    })
  }, [isTableUpdated]);// khi state thay đổi useEffect sẽ chạy lại

  const handleUpdate = () => {
    
  }
  const handleDelete = (id) => {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(urlControl + 'GroupsController.php' + '/' + id, options)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            // Kiểm tra data để xác định hành động tiếp theo (nếu cần)
            console.log(data);
        })
        .catch(function(error) {
            console.error("Fetch error:", error);
        });
  };
  let dynamicUpdate = (
    <button onClick={handleUpdate}>
    <p className="icon icon--check">
      <img
        src={require('../../../../assets/icnedit.png')}
        alt="edit"
        className="fluid-image"
      />
    </p></button>
  );
  let dynamicDelete = (
    <button onClick={handleDelete}>
    <p className="icon icon--check">
      <img
        src={require('../../../../assets/icndelete.png')}
        alt="edit"
        className="fluid-image"
      />
    </p></button>
  );
  let DataTable: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    DataTable.push({
      id: `${listOfGroups[i].id}`,
      group_name: `${listOfGroups[i].group_name}`,
      update: dynamicUpdate,
      delete: dynamicDelete,
    });
  }
  const [groupname, setGroupname] = useState('')
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
      body: JSON.stringify( {group_data} ),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Data inserted successfully:', responseData);
        setIsTableUpdated(true);//Khi thêm nhóm mới ,cập nhật state mới
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Server error message:', error.response.data);
        }
      });
      
  }
  
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
        <button className="btn" onClick={handleSubmint}>Thêm</button>
      </div>
      <CTable>
        <CTableHead heads={["STT", "Tên Nhóm", "Sửa", "Xóa"]}/>
        <CTableBody data={DataTable} path_edit='/group/edit'/>
      </CTable>
    </>
  )
};
