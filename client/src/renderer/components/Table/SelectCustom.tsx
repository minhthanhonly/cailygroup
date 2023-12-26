import './SelectMonthYears.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlControl } from '../../routes/server';

interface SelectCustomProps {
  onGroupChange: (groupId: string) => void;
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
      .get(urlControl + 'GroupsController.php')
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

export const SelectCustomName = () => {
  return (
    <>
      <div className="select__box group">
        <div className="select__box--flex grid-row">
          <select>
            <option value="1">Phan Hồ Tú</option>
            <option value="2">Phan Hồ Tú</option>
            <option value="3">Phan Hồ Tú</option>
            <option value="4">Phan Hồ Tú</option>
            <option value="">Phan Hồ Tú</option>
          </select>
        </div>
      </div>
    </>
  );
};
