import { useEffect, useState } from 'react';
import { TableGroup } from '../../components/Table/TableGroup';
import axios from 'axios';
import { CTable } from '../../components/Table/CTable';
import { CTableHead } from '../../components/Table/CTableHead';
import CTableBody from '../../components/Table/CTableBody';


export const Group = () => {

  type FieldGroups = {
    group_name:string;
  }
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/groups").then((response) => {
      setListOfGroups(response.data)
      console.log(response.data);
    })
  }, [])

  // let items: FieldGroups[] = [];

  // for (let i = 0; i < listOfGroups.length; i++) {
  //   // Tạo một đối tượng mới và thêm vào mảng
  //   items.push({ group_name: `${listOfGroups.group_name}`});
  // }


  // {listOfGroups.map((value, key) => {
  //   names.push(value.group_name)
  // })}
  // names.push()

  // console.log(names);

  return (
    <>
      <CTable>
        <CTableHead heads={["STT", "Tên Nhóm", "Hành Động"]}/>
        <CTableBody data={listOfGroups}/>
      </CTable>


    </>
  )

  // <TableGroup />;
};
