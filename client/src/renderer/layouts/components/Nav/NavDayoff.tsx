import ListBranch from '../../../components/List/ListBranch';

interface Role {
  role: string;
}

const AdminBranch = [
  {
    text: 'Danh sách xin nghỉ phép',
    to: '/dayoffs',
  },
  {
    text: 'Đăng ký nghỉ phép',
    to: '/dayoffs/register',
  },
  {
    text: 'Danh sách duyệt nghỉ phép',
    to: '/dayoffs/apply',
  },
];

const NavDayoff: React.FC<Role> = ({ role }) => {
  return <>{role == 'admin' ? <ListBranch branch={AdminBranch} /> : ''}</>;
};

export default NavDayoff;
