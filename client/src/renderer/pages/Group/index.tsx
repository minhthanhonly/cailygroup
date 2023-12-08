import { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';

export const Group = () => {
  type FieldGroups = {
    id: string,
    group_name:string;
  }
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/groups").then((response) => {
      setListOfGroups(response.data)
      console.log(response.data);
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
      <CTable>
        <CTableHead heads={["STT", "Tên Nhóm", "Hành động"]}/>
        <CTableBody data={DataTable} admin={true} deleteData={true}/>
      </CTable>
    </>
  )
};
