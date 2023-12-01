import ListBranch from "../../../components/List/ListBranch";

interface Role {
  role: string;
}

const AdminBranch = [
  {
    text: "Thẻ giờ",
    to: "/timecard"
  },{
    text: "Cấu hình thẻ giờ",
    to: "/timecard-setting"
  },{
    text: "Danh sách thẻ giờ",
    to: "/timecard-list"
  },{
    text: "Chỉnh sửa thẻ giờ",
    to: "/timecard-edit"
  }
]

const ManagerBranch = [
  {
    text: "Thẻ giờ",
    to: "/timecard"
  },{
    text: "Danh sách thẻ giờ",
    to: "/timecard-list"
  },{
    text: "Chỉnh sửa thẻ giờ",
    to: "/timecard-edit"
  }
]

const NavTimcard: React.FC<Role> = ({role}) => {
  return (
    <>
      {role == "admin" ? <ListBranch branch={AdminBranch}/> : ""}
      {role == "manager" ? <ListBranch branch={ManagerBranch}/> : ""}
    </>
  );
};

export default NavTimcard;
