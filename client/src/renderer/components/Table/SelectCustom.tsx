import './SelectMonthYears.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';

interface SelectCustomProps {
  onGroupChange: (groupId: string) => void;

}

interface SelectCustomNameProps {
  selectedGroupData: { id: number; realname: string }[];
}


export const SelectCustom: React.FC<SelectCustomProps> = ({
  onGroupChange,
}) => {
  const [groupList, setGroupList] = useState<
    { id: string; group_name: string }[]
  >([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  useEffect(() => {
    axios
      .get('http://cailygroup.com/groups/')
      .then((response) => {
        const responseData = response.data;
        if (Array.isArray(responseData)) {
          setGroupList(responseData);
        } else {
          console.error('API không trả về một mảng dữ liệu.');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupId = event.target.value;
    setSelectedGroup(selectedGroupId);
    onGroupChange(selectedGroupId);
  };

  return (
    <div className="select__box group">
      <div className="select__box--title">
        <p>Nhóm:</p>
      </div>
      <div className="select__box--flex grid-row select-dropdown">
        <select value={selectedGroup} onChange={handleGroupChange}>
          <option value="all">Tất cả</option>
          {groupList.map((group) => (
            <option key={group.id} value={group.id}>
              {group.group_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const SelectCustomName: React.FC<SelectCustomNameProps> = ({
  selectedGroupData,
}) => {
  const [selectedUser, setSelectedUser] = useState<string>(''); // State để lưu trữ người dùng được chọn

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    // Thực hiện các hành động khác khi người dùng thay đổi
  };

  return (
    <div className="select__box group">
      <div className="select__box--flex grid-row">
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Chọn người dùng</option>
          {selectedGroupData && selectedGroupData.map((user) => (
            <option key={user.id} value={user.id}>
              {user.realname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
