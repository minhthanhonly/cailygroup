import React, { useEffect, useState } from 'react';
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
    group_name: string;
  }
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  useEffect(() => {
    axios.get(urlControl + "GroupsController.php").then((response) => {
      setListOfGroups(response.data)
    })
  }, [])

  let DataTable: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    DataTable.push({
      id: `${listOfGroups[i].id}`,
      group_name: `${listOfGroups[i].group_name}`
    });
  }

  return (
    <>
      <Heading2 text="Quản lý nhóm" />
      <AddGroup />
      <CTable>
        <CTableHead heads={["STT", "Tên Nhóm", "Sửa", "Xóa"]} />
        <CTableBody data={DataTable} permission_edit={true} path_edit='/group/edit' permission_delete={true} />
      </CTable>
    </>
  )
};
