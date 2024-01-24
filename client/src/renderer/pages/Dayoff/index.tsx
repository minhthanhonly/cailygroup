import { Pagination } from '../../components/Pagination';
import { CTable } from '../../components/Table/CTable';
import CTableBody from '../../components/Table/CTableBody';
import { CTableHead } from '../../components/Table/CTableHead';
import NavDayoff from '../../layouts/components/Nav/NavDayoff';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../api/axios';
import Modaldelete from '../../components/Modal/Modaldelete';
import './Dayoffs.scss';
import { SelectCustomDayoff } from '../../components/Table/SelectCustom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import React from 'react';
import { format } from 'date-fns';

export const Dayoff = () => {
  const axiosPrivate = useAxiosPrivate();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [id, setID] = useState<string>();
  const openModaldelete = (ids: string) => {
    setID(ids);
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  type FieldGroups = {
    id: string;
    date: string;
    realname: string;
    group_name: string;
    day_number: string;
    time_start: string;
    time_end: string;
    note: string;
    owner: string;
    status: React.ReactNode;
  };

  const [opentimeValue, setOpentimeValue] = useState();
  const [closetimeValue, setClosetimeValue] = useState();
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);
  const [listOfGroupsDayoff, setListOfGroupsDayoff] = useState<
    FieldGroups[] | []
  >([]);
  let DataTable: FieldGroups[] = [];
  let DataTables: FieldGroups[] = [];
  listOfGroupsDayoff.sort((a, b) => {
    const groupNameComparison = (a as any).group_name.localeCompare(
      (b as any).group_name,
    );
    if (groupNameComparison !== 0) {
      return groupNameComparison;
    } else {
      const dateA = new Date(
        (a as any).date.split('-').reverse().join('-'),
      ).getTime();
      const dateB = new Date(
        (b as any).date.split('-').reverse().join('-'),
      ).getTime();
      return dateA - dateB;
    }
  });
  listOfGroups.sort((a, b) => {
    const groupNameComparison = (a as any).group_name.localeCompare(
      (b as any).group_name,
    );
    if (groupNameComparison !== 0) {
      return groupNameComparison;
    } else {
      const dateA = new Date(
        (a as any).date.split('-').reverse().join('-'),
      ).getTime();
      const dateB = new Date(
        (b as any).date.split('-').reverse().join('-'),
      ).getTime();
      return dateA - dateB;
    }
  });
  for (let i = 0; i < listOfGroups.length; i++) {
    let dynamicAction;

    if (listOfGroups[i].status === '0') {
      dynamicAction = (
        <>
          <button
            className="btn btn--medium btn--orange"
            onClick={(event) => {
              openModaldelete(listOfGroups[i].id);
            }}
          >
            Hủy
          </button>
        </>
      );
    } else if (listOfGroups[i].status === '2') {
      dynamicAction = (
        <div className="center">
          <p className="icon icon--check">
            <img
              src={require('../../../../assets/minus-button.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
          {listOfGroups[i].owner}
        </div>
      );
    } else {
      dynamicAction = (
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/check.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      );
    }
    DataTable.push({
      realname: `${listOfGroups[i].realname}`,
      group_name: `${listOfGroups[i].group_name}`,
      day_number: `${listOfGroups[i].day_number}`,
      date: (
        <React.Fragment>
          {listOfGroups[i].date.split(',').map((date, index, array) => {
            const numberOfDays = array.length;
            return (
              <React.Fragment key={date}>
                {index === 0
                  ? numberOfDays === 1
                    ? `${listOfGroups[i].time_start} đến ${
                        listOfGroups[i].time_end
                      } ngày ${date.trim()}`
                    : `${
                        listOfGroups[i].time_start
                      } đến ${closetimeValue} Ngày: ${date.trim()}`
                  : index === numberOfDays - 1
                  ? `${opentimeValue} đến ${
                      listOfGroups[i].time_end
                    } Ngày: ${date.trim()}`
                  : `${opentimeValue} đến ${closetimeValue} Ngày: ${date.trim()}`}
                {index !== array.length - 1 && <br />}{' '}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ),
      note: `${listOfGroups[i].note}`,
      status: dynamicAction,
    } as unknown as FieldGroups);
  }
  for (let i = 0; i < listOfGroupsDayoff.length; i++) {
    let dynamicAction;
    if (listOfGroupsDayoff[i].status === '0') {
      dynamicAction = <div className="center">chưa xác nhận</div>;
    } else if (listOfGroupsDayoff[i].status === '2') {
      dynamicAction = (
        <div className="center">
          <p className="icon icon--check">
            <img
              src={require('../../../../assets/minus-button.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
          {listOfGroupsDayoff[i].owner}
        </div>
      );
    } else {
      dynamicAction = (
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/check.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      );
    }
    DataTables.push({
      realname: `${listOfGroupsDayoff[i].realname}`,
      group_name: `${listOfGroupsDayoff[i].group_name}`,
      day_number: `${listOfGroupsDayoff[i].day_number}`,
      time_start: `${listOfGroupsDayoff[i].time_start}`,
      time_end: `${listOfGroupsDayoff[i].time_end}`,
      note: `${listOfGroupsDayoff[i].note}`,
      status: dynamicAction,
    } as unknown as FieldGroups);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(DataTable.length / itemsPerPage);
  const totalPagess = Math.ceil(DataTables.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  let data = {
    id: users.id,
  };
  const deleteStatus = async (
    dayoffId: any,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: dayoffId };
        await axiosPrivate.delete('dayoffs/delete/' + dayoffId);
        const updatedList = await axiosPrivate.get(
          'dayoffs/getforuser/' + users.id,
        );
        setListOfGroups(updatedList.data);

        setCurrentPage(1);
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
    closeModaldelete();
  };
  useEffect(() => {
    axiosPrivate.get('dayoffs/getforuser/' + users.id).then((response) => {
      setListOfGroups(response.data);
    });
  }, [currentPage]);
  const handleShowMe = () => {
    setShowTable(true);
    setCurrentPage(1);
  };
  function findConfigValue(configArray: any[], key: string) {
    const configItem = configArray.find((item) => item.config_key === key);
    return configItem ? configItem.config_value : null;
  }
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const handleGroupChange = (groupId: string) => {
    setSelectedGroup(groupId);
    setCurrentPage(1);
  };
  const handleShowAll = () => {
    setShowTable(false);
    handleGroupChange('all');
    setCurrentPage(1);
  };
  const fetchData = useCallback(async () => {
    try {
      const [groupsResponse, dayoffsResponse] = await Promise.all([
        axiosPrivate.get('groups'),
        axiosPrivate.get('dayoffs', {
          params: {
            group: selectedGroup,
          },
        }),
      ]);

      const groupsData = groupsResponse.data;
      const dayoffsData = Array.isArray(dayoffsResponse.data)
        ? dayoffsResponse.data
        : [];

      const combinedData = dayoffsData.map((dayoff) => {
        const groupInfo = groupsData.find(
          (group: { id: any; user_id: any }) =>
            group.id === dayoff.user_group || group.user_id === dayoff.user_id,
        );

        return {
          ...dayoff,
          group_name: groupInfo ? groupInfo.group_name : 'Unknown Group',
        };
      });
      setListOfGroupsDayoff(combinedData);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setListOfGroupsDayoff([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    const getTimeConfig = async () => {
      const responseConfig = await axiosPrivate.post('config');
      const configData = responseConfig.data;
      setOpentimeValue(findConfigValue(configData, 'opentime'));
      setClosetimeValue(findConfigValue(configData, 'closetime'));
    };
    getTimeConfig();
  });
  return (
    <>
      <NavDayoff role="admin" />
      <ul className="dayoffs-menu">
        <li onClick={handleShowMe}>Của tôi</li>
        <li onClick={handleShowAll}>Của mọi người</li>
      </ul>
      {showTable ? null : (
        <div className="left select-ml0 mt20">
          <SelectCustomDayoff onGroupChange={handleGroupChange} />
        </div>
      )}
      <CTable>
        <CTableHead
          heads={[
            'Họ và tên',
            'nhóm',
            'Số ngày nghỉ',
            'Ngày nghỉ phép',
            'Ghi chú',
            'Hủy đăng ký nghỉ ',
          ]}
        />
        {showTable ? (
          <CTableBody
            data={DataTable.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage,
            )}
            path_edit="/"
            path_timecard={''}
          />
        ) : (
          <CTableBody
            data={DataTables.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage,
            )}
            path_edit="/"
            path_timecard={''}
          />
        )}
      </CTable>
      {showTable ? (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <Pagination
          totalPages={totalPagess}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <>
          <h2 className="mb15">Xác nhận hủy nghỉ phép:</h2>
          <div className="wrp-button">
            <a
              className="btn btn--green"
              onClick={(event) => {
                deleteStatus(id, event);
              }}
              href={id}
            >
              Đồng ý
            </a>
            <button className="btn btn--orange" onClick={closeModaldelete}>
              Hủy
            </button>
          </div>
        </>
      </Modaldelete>
    </>
  );
};
