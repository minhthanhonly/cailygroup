import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { Heading2 } from "../../components/Heading";
import ButtonDelete from "../../components/Button/ButtonDelete";
import Modaldelete from "../../components/Modal/Modaldelete";
import { UserRole } from "../../components/UserRole";
import ButtonEdit from "../../components/Button/ButtonEdit";
import ButtonAdd from "../../components/Button/ButtonAdd";
import { Button } from "../../components/Button";
import { spawn } from "child_process";

export default function NewApplication(){
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;
  const isMember = users.roles === UserRole.MEMBER;

  type FieldNewApplication = {
    form_description: string;
    id: number,
    form_name: string,
    status: number,
  };
  const [listNewApplication, setListNewApplication] = useState<FieldNewApplication[] | []>([]);

  const fetchNewApplication = async () => {
    const res = await axiosPrivate.get("newapplication/");
    setIsTableUpdated(false);
    setListNewApplication(res.data);
  };
  useEffect(() => {
    fetchNewApplication();
  },[isTableUpdated])
  /*
  * XÓA FORM
  */
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState(0);
  const handleDelete = async ($id: number) => {
    const formData = { id: $id }
    const res = await axiosPrivate.post("newapplication/delete", formData);
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
  return (
    <>
      <div className="grid-row grid-row--center ml0 mr0">
        <Heading2 text="申請書一覧" />
        <Button to="/newapplication/add">Add New Form</Button>
      </div>

      <table className="table-base table-base--01">
        <tbody>
          {listNewApplication.map((value, index) => {
            let isStatus = value.status;
            return (
              <tr key={index} className={(isStatus == 0 && isMember ) ? '--hidden' : (isStatus == 0 && isLeader ) ? '--hidden' : (isStatus == 0) ? '--draft' : ''}>
                <th><NavLink to={"detail/" + value.id} className="link">{value.form_name} {(isStatus == 0) ? <span className="mark">（下書き）</span> : ''}</NavLink></th>
                <td>{value.form_description}</td>
                {(isAdmin || isManager) ? <td className="--w10"><ButtonEdit href={"/newapplication/edit/" + value.id} /><ButtonDelete onButtonClick={() => openModal(value.id)}/></td> : ''}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modaldelete isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Bạn có chắc chắn muốn xóa không?</h2>
        <div className='wrp-button'>
          <button className='btn btn--green' onClick={() => handleDelete(isDeleteModalid)}>Đồng ý</button>
          <button className='btn btn--orange' onClick={closeModal}>Hủy</button>
        </div>
      </Modaldelete>
    </>
  )
}
