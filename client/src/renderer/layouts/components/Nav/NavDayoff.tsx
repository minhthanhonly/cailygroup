import ListBranch from "../../../components/List/ListBranch";

interface Role {
    role: string;
  }

const AdminBranch = [
  {
    text: "Danh sách xin nghỉ phép",
    to: "/day-off"
  },{
    text: "Đăng ký nghỉ phép",
    to: "/day-off/register"
  },{
    text: "Danh sách duyệt nghỉ phép",
    to: "/day-off/apply"
  }
]

const NavDayoff: React.FC<Role> = ({role}) => {
  return (
    <>
      {role == "admin" ? <ListBranch branch={AdminBranch}/> : ""}
    </>
  );
};

export default NavDayoff;
