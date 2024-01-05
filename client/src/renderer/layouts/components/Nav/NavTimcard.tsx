import ListBranch from '../../../components/List/ListBranch';

interface Role {
  role: string;
}

const AdminBranch = [
  {
    text: 'Thẻ giờ',
    to: '/timecards',
  },
  {
    text: 'Cấu hình thẻ giờ',
    to: '/timecards/setting',
  },
  {
    text: 'Danh sách thẻ giờ',
    to: '/timecards/list',
  },
  {
    text: 'Chỉnh sửa thẻ giờ',
    to: '/timecards/edit',
  },
];

const ManagerBranch = [
  {
    text: 'Thẻ giờ',
    to: '/timecards',
  },
  {
    text: 'Danh sách thẻ giờ',
    to: '/timecards/list',
  },
  {
    text: 'Chỉnh sửa thẻ giờ',
    to: '/timecards/edit',
  },
];

const NavTimcard: React.FC<Role> = ({ role }) => {
  return (
    <>
      {role == 'admin' ? <ListBranch branch={AdminBranch} /> : ''}
      {role == 'manager' ? <ListBranch branch={ManagerBranch} /> : ''}
    </>
  );
};

export default NavTimcard;
