import { Link } from "react-router-dom";
import { Heading2 } from "../../components/Heading";

export const Member = () => {
  return (
    <>
      <Heading2 text="Thông tin thành viên"/>
      <Link to="/member-add">Thêm thành viên</Link>
      <br/>
      <br/>
      <Link to="/member-edit">Sửa thành viên</Link>
    </>
  )
};
