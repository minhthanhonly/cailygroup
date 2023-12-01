import ListBranch from "../../../components/List/ListBranch";

interface Role {
  role: string;
}

const AdminBranch = [
  {
    text: "Thẻ Giờ",
    to: "/timecard"
  },{
    text: "Cấu hình thẻ giờ",
    to: "/timecard-setting"
  },{
    text: "Danh sách thẻ giờ",
    to: "/timecard-list"
  }
]

const NavTimcard: React.FC<Role> = ({role}) => {
  return (
    <>
      {role == "admin" ? <ListBranch branch={AdminBranch}/> : ""}
    </>
  );
};

export default NavTimcard;
