import React, { useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { Heading2 } from '../../components/Heading';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { UserRole } from '../../components/UserRole';
import moment from 'moment'; // Import moment.js
import { SearchData } from './SearchData';
import { Register } from '../Application/register';

interface ListItem {
  id: string;
  name: string;
  datajson: string;
  id_status: number;
  createdAt: string;
  owner: string;
  // Các trường khác nếu có
}
export const Search = () => {
  const axiosPrivate = useAxiosPrivate();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;

  const [statusTotal, setStatusTotal] = useState(0);

  const [listOfTable, setListOfTable] = useState<
    { id: string; name: string }[]
  >([]);

  const [listOfDataBase, setListOflistOfDataBase] = useState<any[]>([]);

  ////////////////////////////////////////////////
  const [openTabId, setOpenTabId] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [commentValueThird, setCommentValueThird] = useState('');
  const [commentFirst, setCommentFirst] = useState<any>([]);
  const [commentSeCond, setCommentSeCond] = useState<any>([]);
  const [commentThird, setCommentThird] = useState<any>([]);
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
  });
  const [statusattr, setStatusattr] = useState({
    statusattrTexts: '',
    statusattrClass: '',
  });
  const toggleAccordion = (id: string) => {
    setOpenTabId((prevId) => (prevId === id ? null : id));
  };

  const tabs = [
    { id: 'tab1', label: '進行中', status: 1 },
    { id: 'tab2', label: 'すべて', status: -1 },
    { id: 'tab3', label: '差し戻し', status: 2 },
    { id: 'tab4', label: '却下', status: 3 },
    { id: 'tab5', label: '完了', status: 4 },
    { id: 'tab6', label: '下書き', status: 5 },
    { id: 'tab7', label: '取り消し', status: 6 },
  ];
  const [activeTab, setActiveTab] = useState('tab2');
  const handleTabClick = (tabId: React.SetStateAction<string>) => {
    setActiveTab(tabId);
    // Your logic to handle tab click
  };
  useEffect(() => {
    const getTables = async () => {
      try {
        const dataCheck = await axiosPrivate.get('search/data');
        const data = dataCheck.data;
        setListOflistOfDataBase(data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
      }
    };
    getTables();
  }, []);

  const [date, setDate] = useState(new Date());
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    1,
  ); // Đặt giờ và phút thành 0:01
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
  ); // Đặt giờ và phút thành 23:59
  const startOfDayUpdate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    1,
  ); // Đặt giờ và phút thành 0:01
  const endOfDayUpdate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
  ); // Đặt giờ và phút thành 23:59
  const [dateRange, setDateRange] = useState<{
    dateStart: Date;
    dateEnd: Date;
    dateStartUpdate: Date;
    dateEndUpdate: Date;
  }>({
    dateStart: startOfDay,
    dateEnd: endOfDay,
    dateStartUpdate: startOfDayUpdate,
    dateEndUpdate: endOfDayUpdate,
  });

  const handleLeaveDateChange = (
    _date: Date | moment.Moment | null,
    type: 'start' | 'end' | 'startUpdate' | 'endUpdate',
  ) => {
    if (_date instanceof Date) {
      const time = _date.toLocaleTimeString(); // Lấy thời gian từ _date

      setDateRange((prevState) => ({
        ...prevState,
        [type === 'start'
          ? 'dateStart'
          : type === 'startUpdate'
            ? 'dateStartUpdate'
            : type === 'endUpdate'
              ? 'dateEndUpdate'
              : 'dateEnd']: _date,
      }));
    } else if (_date instanceof moment) {
      // Sử dụng moment.Moment thay vì DateObject
      const time = _date.format('HH:mm'); // Lấy thời gian từ _date

      setDateRange((prevState) => ({
        ...prevState,
        [type === 'start'
          ? 'dateStart'
          : type === 'startUpdate'
            ? 'dateStartUpdate'
            : type === 'endUpdate'
              ? 'dateEndUpdate'
              : 'dateEnd']: _date.toDate(), // Chuyển đổi sang đối tượng Date
      }));
    } else {
      console.log('Date is null or not valid');
    }
  };
  const [selectedName, setSelectedName] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [searchResults, setSearchResults] = useState<ListItem[]>([]);

  const handleTableSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedId(selectedId);

    // Tìm JSON tương ứng với ID đã chọn
    const selectedJson = listOfDataBase.find((data) => data.id === selectedId);
    if (selectedJson) {
      // Nếu tìm thấy, lấy tên từ JSON và đặt vào state
      const jsonData = JSON.parse(selectedJson.datajson);
      setSelectedName(jsonData.appName);
    }
  };

  useEffect(() => {
    // Đảm bảo useEffect chỉ chạy một lần khi component được tạo
    if (listOfDataBase.length > 0) {
      // Lấy ID của JSON đầu tiên trong danh sách
      const firstDataId = listOfDataBase[0].id;
      setSelectedId(firstDataId);

      // Tìm JSON tương ứng với ID đầu tiên
      const firstData = listOfDataBase.find((data) => data.id === firstDataId);
      if (firstData) {
        // Nếu tìm thấy, lấy tên từ JSON và đặt vào state
        const jsonData = JSON.parse(firstData.datajson);
        setSelectedName(jsonData.appName);
      }
    }
  }, [listOfDataBase]); // useEffect sẽ chạy lại khi `listOfDataBase` thay đổi

  const formatNumberWithCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Hàm xử lý sự kiện khi nội dung của trường input thay đổi
  const handleTextChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    let inputValue = event.target.value;
    // Xử lý trường hợp khi người dùng xoá giá trị
    if (inputValue === '') {
      setTextValue(''); // Đặt lại giá trị thành chuỗi trống
      return;
    }
    inputValue = inputValue.toString();
    inputValue = inputValue.replace(/,/g, '');
    if (!isNaN(Number(inputValue))) {
      const formattedValue = Number(inputValue);
      setTextValue(String(formattedValue));
    } else {
      setTextValue(inputValue);
    }
  };

  const [statusCounts, setStatusCounts] = useState<{ [key: number]: number }>(
    {},
  );
  const [isSearched, setIsSearched] = useState(false);

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    const matchedItems = listOfDataBase.filter((item) => {
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript

      const searchText = textValue.trim().toLowerCase();
      const jsonData = JSON.parse(item.datajson);
      const itemDate = new Date(item.createdAt);
      const updateDate = new Date(item.updatedAt);

      const startDate = dateRange.dateStart || new Date(0); // or some default start date
      const endDate = dateRange.dateEnd || new Date(); // or some default end date
      const startDateUpdate = dateRange.dateStartUpdate || new Date(0); // or some default start date
      const endDateUpdate = dateRange.dateEndUpdate || new Date(); // or some default end date

      if (jsonData) {
        return (
          selectedName === jsonData.appName &&
          (searchText === '' ||
            JSON.stringify(jsonData).toLowerCase().includes(searchText)) &&
          itemDate >= startDate &&
          itemDate <= endDate &&
          updateDate >= startDateUpdate &&
          updateDate <= endDateUpdate
        );
      } else if (jsonData && searchText !== '') {
        return (
          selectedName === jsonData.appName &&
          (searchText === '' ||
            JSON.stringify(jsonData).toLowerCase().includes(searchText)) &&
          itemDate >= startDate &&
          itemDate <= endDate &&
          updateDate >= startDateUpdate &&
          updateDate <= endDateUpdate
        );
      } else {
        return false;
      }

      // return (
      //     String(item.table_id) === String(selectedOptionId) &&
      //     jsonData.appName.some((row: any) => Object.values(row).some(value => typeof value === 'string' && value.includes(searchText)))

      //     && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate
      // );
      // if (jsonData && jsonData.appName && searchText !== '') {

      // } else if (jsonData && jsonData.appName && searchText === '') {

      //     if (itemDate && startDate && endDate && updateDate && startDateUpdate && endDateUpdate) {

      //         return String(item.table_id) === String(selectedOptionId)
      //             && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate;
      //     }
      //     else {
      //         return false;
      //     }
      // }
      // return false;
    });

    setSearchResults(matchedItems);

    const newStatusCounts: { [key: number]: number } = {};
    matchedItems.forEach((item) => {
      const idStatus = item.id_status;
      newStatusCounts[idStatus] = (newStatusCounts[idStatus] || 0) + 1;
    });

    const totalStatus = matchedItems.length;
    setStatusTotal(totalStatus);
    setStatusCounts(newStatusCounts);
    setIsSearched(true);

    // Kích hoạt việc render lại component bằng cách cập nhật lại activeTab
    setActiveTab('tab2'); // Đặt lại activeTab để kích hoạt việc render lại
  };
  return (
    <>
      <Heading2 text="申請状況" />
      <p className="txt-lead">申請検索</p>
      <div className="group_box">
        <div className="grid-row group_box--grid">
          <div className="group_box--title">
            <p>申請書の種類 </p>
          </div>
          <div className="group_box__insert">
            <div className="grid-row group_box--form ">
              <div className="group_box--box">
                <div className="group_box--flex">
                  <select className="dropdown" onChange={handleTableSelect}>
                    {(() => {
                      const addedNames = new Set();
                      return listOfDataBase
                        .map((data) => {
                          const jsonData = JSON.parse(data.datajson);
                          if (!addedNames.has(jsonData.appName)) {
                            addedNames.add(jsonData.appName);
                            return (
                              <option key={data.id} value={data.id}>
                                {jsonData.appName}
                              </option>
                            );
                          }
                          return null; // Trả về null nếu tên đã tồn tại
                        })
                        .filter((option) => option !== null); // Lọc ra các mục null
                    })()}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="tb-from" style={{ marginTop: 4 + 'em' }}>
        <tbody>
          <tr>
            <th>
              <div className="tb-from--th">申請日</div>
            </th>
            <td>
              <div className="tb-from--td">
                <div className="tb-from--times">
                  <span>
                    <DatePicker
                      onChange={(_date) => {
                        if (_date && !Array.isArray(_date)) {
                          handleLeaveDateChange(_date.toDate(), 'start');
                        }
                      }}
                      value={dateRange.dateStart}
                      format="YYYY-MM-DD"
                    />
                  </span>
                  <span>
                    <DatePicker
                      onChange={(_date) => {
                        if (_date && !Array.isArray(_date)) {
                          handleLeaveDateChange(_date.toDate(), 'end');
                        }
                      }}
                      value={dateRange.dateEnd}
                      format="YYYY-MM-DD"
                    />
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <div className="tb-from--th">最終承認完了日</div>
            </th>
            <td>
              <div className="tb-from--td">
                <div className="tb-from--times">
                  <span>
                    <DatePicker
                      onChange={(_date) => {
                        if (_date && !Array.isArray(_date)) {
                          handleLeaveDateChange(_date.toDate(), 'startUpdate');
                        }
                      }}
                      value={dateRange.dateStartUpdate}
                      format="YYYY-MM-DD"
                    />
                  </span>
                  <span>
                    <DatePicker
                      onChange={(_date) => {
                        if (_date && !Array.isArray(_date)) {
                          handleLeaveDateChange(_date.toDate(), 'endUpdate');
                        }
                      }}
                      value={dateRange.dateEndUpdate}
                      format="YYYY-MM-DD"
                    />
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="group_box">
        <div className="grid-row group_box--grid">
          <div className="group_box--title">
            <p>フリーワード </p>
          </div>
          <div className="group_box__insert">
            <div className="grid-row group_box--form ">
              <div className="group_box--box">
                <div className="group_box--flex">
                  <input
                    type="text"
                    className=""
                    value={textValue} // Giá trị của trường input được liên kết với state
                    onChange={handleTextChange} // Gọi hàm handleTextChange khi nội dung thay đổi
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrp-button">
        <button className="btn btn--from btn--blue" onClick={handleSearch}>
          検索する
        </button>
      </div>

      <div className="box-tab">
        <div className="tab01 tab-head">
          <ul className="lst-branch">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <a
                  onClick={() => handleTabClick(tab.id)}
                  className={activeTab === tab.id ? 'active' : ''}
                >
                  {tab.label} (
                  {isSearched
                    ? tab.status !== -1
                      ? statusCounts[tab.status] || 0
                      : statusTotal || 0
                    : 0}
                  )
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab01 tab-content">
          <div className="list-accordion">
            <div className="list-accorditon__inner">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={activeTab === tab.id ? 'sss' : 'hidden'}
                >
                  <div className="table_content">
                    {searchResults
                      .filter((item) =>
                        tab.status !== -1
                          ? Number(item.id_status) === Number(tab.status)
                          : true,
                      )
                      .map((item, index) => {
                        try {
                          // Phân tích chuỗi JSON thành đối tượng JavaScript
                          let jsonData = JSON.parse(item.datajson);

                          let numberStatus = Number(item.id_status);
                          let table = Number(item.id);

                          let id = Number(item.id);

                          // Hiển thị thông tin chỉ khi trạng thái phù hợp
                          return (
                            <>
                              <div className="list-accordion__parent">
                                <div
                                  key={index}
                                  className={`list-accordion__item ${openTabId === item.id ? 'open' : ''
                                    }`}
                                >
                                  <div
                                    className="list-accordion__item__head"
                                    onClick={() => toggleAccordion(item.id)}
                                  >
                                    <div className="list-accordion__item__head__title">
                                      <p className="list-accordion__item__head__title__title">
                                        {jsonData.appName &&
                                          jsonData.appName.length > 0
                                          ? jsonData.appName
                                          : 'No data available'}
                                      </p>
                                      <span className="list-accordion__item__head__title__subtitle">
                                        {item.owner}（{item.createdAt}{' '}
                                        {'\u00A0\u00A0'}
                                        {jsonData.appName[0].time}）
                                      </span>
                                    </div>
                                    <div className="list-accordion__item__head__btn">
                                      <p className="list-accordion__item__head__btn__btn">
                                        <span
                                          className={`lbl01 ${[
                                            'lbl-blue',
                                            'lbl-yellow',
                                            'lbl-red',
                                            'lbl-white',
                                            'lbl-brown',
                                          ][numberStatus - 1]
                                            }`}
                                        >
                                          {
                                            [
                                              '承認待ち',
                                              '差し戻し',
                                              '却下',
                                              '完了',
                                              '下書き',
                                              '取り消し',
                                            ][numberStatus - 1]
                                          }
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="list-accordion__item__content">
                                    {openTabId && (
                                      <div className="list-accordion__item__content__inner">
                                        <div className="list-accordion__item__content__item">
                                          <Register id={id} />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        } catch (error) {
                          // Xử lý trường hợp chuỗi không hợp lệ
                          console.error(
                            `Error parsing JSON at index ${index}:`,
                            error,
                          );
                          return null; // Hoặc hiển thị một thông báo lỗi phù hợp
                        }
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
