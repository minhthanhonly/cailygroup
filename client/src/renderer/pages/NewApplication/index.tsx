import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { Heading2 } from "../../components/Heading";
import ButtonDelete from "../../components/Button/ButtonDelete";
import Modaldelete from "../../components/Modal/Modaldelete";

export default function NewApplication(){
  const [isTableUpdated, setIsTableUpdated] = useState(false);

  type FieldNewApplication = {
    form_description: string;
    id: number,
    form_name: string,
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
      <Heading2 text="申請書一覧" />
      <table className="table-base table-base--01">
        <tbody>
          {listNewApplication.map((value, index) => (
            <tr key={index}>
              <th><NavLink to={"detail/" + value.id} className="link">{value.form_name}</NavLink></th>
              <td>{value.form_description}</td>
              <td><ButtonDelete onButtonClick={() => openModal(value.id)}/></td>
            </tr>
          ))}
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
