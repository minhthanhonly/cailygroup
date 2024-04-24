import React, { useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { Heading2 } from '../../components/Heading';
import { Tab } from '../Application/tab';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { UserRole } from '../../components/UserRole';
import moment from 'moment'; // Import moment.js
import { Travelallowance } from '../Application/travelallowance';

interface ListItem {
  id: string;
  name: string;
  tablejson: string;
  id_status: number;
  // Các trường khác nếu có
}
// const Search = (id: unknown) => {
//     const axiosPrivate = useAxiosPrivate();
//     const users = JSON.parse(localStorage.getItem('users') || '{}');
//     const isAdmin = users.roles === UserRole.ADMIN;
//     const isManager = users.roles === UserRole.MANAGER;
//     const isLeader = users.roles === UserRole.LEADER;

//     const [statusTotal, setStatusTotal] = useState(0);

//     const [listOfTable, setListOfTable] = useState<{ id: string; name: string }[]>([]);

//     const [listOfDataBase, setListOflistOfDataBase] = useState<any[]>([]);

//     ////////////////////////////////////////////////
//     const [openTabId, setOpenTabId] = useState<string | null>(null);
//     const [textValue, setTextValue] = useState('');
//     const [commentValue, setCommentValue] = useState('');
//     const [commentValueThird, setCommentValueThird] = useState('');
//     const [commentFirst, setCommentFirst] = useState<any>([]);
//     const [commentSeCond, setCommentSeCond] = useState<any>([]);
//     const [commentThird, setCommentThird] = useState<any>([]);
//     const [approve, setApprove] = useState({
//         approveTexts: '',
//         approveClass: '',
//     });
//     const [statusattr, setStatusattr] = useState({
//         statusattrTexts: '',
//         statusattrClass: '',
//     });
//     const toggleAccordion = (id: string) => {
//         setOpenTabId(prevId => (prevId === id ? null : id));
//     };

//     const tabs = [
//         { id: 'tab1', label: '進行中', status: 1 },
//         { id: 'tab2', label: 'すべて', status: - 1 },
//         { id: 'tab3', label: '差し戻し', status: 2 },
//         { id: 'tab4', label: '却下', status: 3 },
//         { id: 'tab5', label: '完了', status: 4 },
//         { id: 'tab6', label: '下書き', status: 5 },
//         { id: 'tab7', label: '取り消し', status: 6 }
//     ];
//     const [activeTab, setActiveTab] = useState('tab2');
//     const handleTabClick = (tabId: React.SetStateAction<string>) => {
//         setActiveTab(tabId);
//         // Your logic to handle tab click
//     };

//     useEffect(() => {
//         const getTables = async () => {
//             try {
//                 const response = await axiosPrivate.get('search');
//                 setListOfTable(response.data); // Cập nhật mảng với dữ liệu từ API
//             } catch (err) {
//                 console.error('Lỗi khi lấy dữ liệu:', err);
//             }
//         }
//         getTables();
//     }, []);

//     useEffect(() => {
//         const getTables = async () => {
//             try {

//                 const response = await axiosPrivate.get('search/data');
//                 const data = response.data;
//                 setListOflistOfDataBase(data);
//             } catch (err) {
//                 console.error('Lỗi khi lấy dữ liệu:', err);
//             }
//         }
//         getTables();
//     }, []);

//     // const [accordionItems, setAccordionItems] = useState<any>([]);

//     const [date, setDate] = useState(new Date());

//     const today = new Date();
//     const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 1); // Đặt giờ và phút thành 0:01
//     const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59); // Đặt giờ và phút thành 23:59
//     const startOfDayUpdate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 1); // Đặt giờ và phút thành 0:01
//     const endOfDayUpdate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59); // Đặt giờ và phút thành 23:59

//     const [dateRange, setDateRange] = useState<{ dateStart: Date, dateEnd: Date, dateStartUpdate: Date, dateEndUpdate: Date }>({
//         dateStart: startOfDay,
//         dateEnd: endOfDay,
//         dateStartUpdate: startOfDayUpdate,
//         dateEndUpdate: endOfDayUpdate
//     });

//     const handleLeaveDateChange = (_date: Date | moment.Moment | null, type: 'start' | 'end' | 'startUpdate' | 'endUpdate') => {
//         if (_date instanceof Date) {
//             const time = _date.toLocaleTimeString(); // Lấy thời gian từ _date

//             setDateRange(prevState => ({
//                 ...prevState,
//                 [type === 'start' ? 'dateStart' : type === 'startUpdate' ? 'dateStartUpdate' : type === 'endUpdate' ? 'dateEndUpdate' : 'dateEnd']: _date
//             }));
//         } else if (_date instanceof moment) { // Sử dụng moment.Moment thay vì DateObject
//             const time = _date.format("HH:mm"); // Lấy thời gian từ _date

//             setDateRange(prevState => ({
//                 ...prevState,
//                 [type === 'start' ? 'dateStart' : type === 'startUpdate' ? 'dateStartUpdate' : type === 'endUpdate' ? 'dateEndUpdate' : 'dateEnd']: _date.toDate() // Chuyển đổi sang đối tượng Date
//             }));
//         } else {
//             console.log('Date is null or not valid');
//         }
//     };

//     const [selectedId, setSelectedId] = useState('');
//     const [searchResults, setSearchResults] = useState<ListItem[]>([]);

//     // useEffect để đặt giá trị mặc định cho selectedId khi component được tạo
//     useEffect(() => {
//         setSelectedId(listOfTable.length > 0 ? listOfTable[0].id : '');
//     }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được tạo

//     // Hàm xử lý khi chọn một mục từ dropdown
//     const handleTableSelect = (event: { target: { value: React.SetStateAction<string>; }; }) => {
//         setSelectedId(event.target.value);
//     };

//     const formatNumberWithCommas = (value: number) => {
//         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };

//     // Hàm xử lý sự kiện khi nội dung của trường input thay đổi
//     const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
//         let inputValue = event.target.value;

//         // Xử lý trường hợp khi người dùng xoá giá trị
//         if (inputValue === "") {
//             setTextValue(""); // Đặt lại giá trị thành chuỗi trống
//             return;
//         }

//         // Loại bỏ tất cả các dấu phẩy khỏi giá trị nhập vào
//         inputValue = inputValue.toString();

//         // Loại bỏ tất cả các dấu phẩy khỏi giá trị nhập vào
//         inputValue = inputValue.replace(/,/g, '');

//         // Kiểm tra xem giá trị nhập vào có phải là số không
//         if (!isNaN(Number(inputValue))) {
//             // Nếu là số, áp dụng định dạng số
//             const formattedValue = formatNumberWithCommas(Number(inputValue));
//             setTextValue(formattedValue);
//         } else {
//             // Nếu không phải là số, chỉ cần cập nhật giá trị
//             setTextValue(inputValue);
//         }
//     };

//     const [statusCounts, setStatusCounts] = useState<{ [key: number]: number }>({});
//     const [isSearched, setIsSearched] = useState(false);

//     // Hàm xử lý khi nhấn nút tìm kiếm
//     const handleSearch = () => {
//         // Lấy id của mục được chọn từ dropdown

//         const searchText = textValue.trim().toLowerCase();
//         const selectedOptionId = selectedId;
//         const startDate = dateRange.dateStart || startOfDay;
//         const endDate = dateRange.dateEnd || endOfDay;

//         const startDateUpdate = dateRange.dateStartUpdate || startOfDayUpdate;
//         const endDateUpdate = dateRange.dateEndUpdate || endOfDayUpdate;
//         console.log("searchText", searchText);

//         const matchedItems = listOfDataBase.filter(item => {
//             // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
//             const jsonData = JSON.parse(item.tablejson);
//             const itemDate = new Date(jsonData.rows[0].date);
//             const updateDate = new Date(item.updatedAt);

//             if (jsonData && jsonData.rows && searchText !== '') {
//                 // Thực hiện tìm kiếm khi có dữ liệu phù hợp
//                 // console.log("jsonData.rows", jsonData.rows);

//                 // console.log("aaaa", jsonData.rows.some((row: any) =>
//                 //     Object.values(row).some(value =>
//                 //         typeof value === 'string' && value.includes(searchText)
//                 //     )
//                 // ));

//                 return (

//                     String(item.table_id) === String(selectedOptionId) &&
//                     jsonData.rows.some((row: any) => Object.values(row).some(value => typeof value === 'string' && value.includes(searchText)))

//                     && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate
//                 );

//                 // return (
//                 //     String(item.table_id) === String(selectedOptionId) &&
//                 //     jsonData.rows.some((row: any) => Object.values(row).some(value =>  typeof value === 'string' && value.includes(searchText)  ))
//                 // );
//             } else if (jsonData && jsonData.rows && searchText === '') {
//                 if (itemDate && startDate && endDate && updateDate && startDateUpdate && endDateUpdate) {
//                     return String(item.table_id) === String(selectedOptionId)
//                         && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate;
//                 }
//                 else {
//                     return false;
//                 }
//             }
//             else {

//                 return false;
//             }

//             // if (searchText !== '') {
//             //     console.log("ở đây", String(item.table_id) === String(selectedOptionId) &&
//             //         jsonData.rows.map((row: any) => String(row)).some((row: string | string[]) => row.includes(searchText)))
//             //     //  && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate);
//             //     return (
//             //         String(item.table_id) === String(selectedOptionId) &&
//             //         jsonData.rows.map((row: any) => String(row)).some((row: string | string[]) => row.includes(searchText))

//             //         // && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate
//             //     );
//             // } else {
//             //     if (itemDate && startDate && endDate && updateDate && startDateUpdate && endDateUpdate) {
//             //         return (
//             //             String(item.table_id) === String(selectedOptionId)
//             //             // && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate
//             //         );
//             //     }
//             // }

//             // if (searchText !== '') {
//             //     return (
//             //         // Kiểm tra ID được chọn từ dropdown
//             //         String(item.table_id) === String(selectedOptionId) &&
//             //         // Kiểm tra từ khoá
//             //         jsonData.rows.some((row: string | string[]) => row.includes(searchText)) &&
//             //         // Kiểm tra ngày bắt đầu và kết thúc
//             //         itemDate >= startDate && itemDate <= endDate &&
//             //         // Kiểm tra ngày bắt đầu và kết thúc của update
//             //         updateDate >= startDateUpdate && updateDate <= endDateUpdate
//             //     );
//             // } else {
//             //     // Nếu từ khoá tìm kiếm rỗng, chỉ kiểm tra các thông tin khác như dropdown và ngày tháng
//             //     if (itemDate && startDate && endDate && updateDate && startDateUpdate && endDateUpdate) {
//             //         return String(item.table_id) === String(selectedOptionId)
//             //             && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate;
//             //     }
//             // }

//             // if (itemDate && startDate && endDate && updateDate && startDateUpdate && endDateUpdate) {
//             //     return String(item.table_id) === String(selectedOptionId)
//             //         && itemDate >= startDate && itemDate <= endDate && updateDate >= startDateUpdate && updateDate <= endDateUpdate;
//             // }

//             return false; // Thêm lệnh return false ở đây
//         });

//         setSearchResults(matchedItems);

//         const newStatusCounts: { [key: number]: number } = {};
//         matchedItems.forEach(item => {
//             const idStatus = item.id_status;
//             newStatusCounts[idStatus] = (newStatusCounts[idStatus] || 0) + 1;
//         });

//         const totalStatus = matchedItems.length;
//         setStatusTotal(totalStatus);
//         setStatusCounts(newStatusCounts);
//         setIsSearched(true);

//         // Kích hoạt việc render lại component bằng cách cập nhật lại activeTab
//         setActiveTab('tab2'); // Đặt lại activeTab để kích hoạt việc render lại
//     };
//     return (
//         <>
//             <Heading2 text="申請状況" />
//             <p className="txt-lead">申請検索</p>

//             <div className="group_box">
//                 <div className="grid-row group_box--grid">
//                     <div className="group_box--title"><p>申請書の種類 </p></div>
//                     <div className="group_box__insert">
//                         <div className="grid-row group_box--form ">
//                             <div className="group_box--box">
//                                 <div className="group_box--flex">
//                                     <select className="dropdown" onChange={handleTableSelect}>
//                                         {listOfTable.map((data, index) => (
//                                             <option key={data.id} value={data.id}>{data.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <table className='tb-from' style={{ marginTop: 4 + 'em' }}>
//                 <tbody>
//                     <tr>
//                         <th><div className='tb-from--th'>申請日</div></th>
//                         <td>
//                             <div className='tb-from--td'>
//                                 <div className='tb-from--times'>
//                                     <span>
//                                         <DatePicker onChange={(_date) => { if (_date && !Array.isArray(_date)) { handleLeaveDateChange(_date.toDate(), 'start'); } }} value={dateRange.dateStart} format="YYYY-MM-DD" />
//                                     </span>
//                                     <span>
//                                         <DatePicker onChange={(_date) => { if (_date && !Array.isArray(_date)) { handleLeaveDateChange(_date.toDate(), 'end'); } }} value={dateRange.dateEnd} format="YYYY-MM-DD" />
//                                     </span>
//                                 </div>
//                             </div>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th><div className='tb-from--th'>最終承認完了日</div></th>
//                         <td>
//                             <div className='tb-from--td'>
//                                 <div className='tb-from--times'>

//                                     <span>
//                                         <DatePicker onChange={(_date) => { if (_date && !Array.isArray(_date)) { handleLeaveDateChange(_date.toDate(), 'startUpdate'); } }} value={dateRange.dateStartUpdate} format="YYYY-MM-DD" />
//                                     </span>
//                                     <span>
//                                         <DatePicker onChange={(_date) => { if (_date && !Array.isArray(_date)) { handleLeaveDateChange(_date.toDate(), 'endUpdate'); } }} value={dateRange.dateEndUpdate} format="YYYY-MM-DD" />
//                                     </span>
//                                 </div>
//                             </div>
//                         </td>
//                     </tr>

//                 </tbody>
//             </table>
//             <div className="group_box">
//                 <div className="grid-row group_box--grid">
//                     <div className="group_box--title"><p>フリーワード </p></div>
//                     <div className="group_box__insert">
//                         <div className="grid-row group_box--form ">
//                             <div className="group_box--box">
//                                 <div className="group_box--flex">
//                                     <input type="text" className="" value={textValue} // Giá trị của trường input được liên kết với state
//                                         onChange={handleTextChange} // Gọi hàm handleTextChange khi nội dung thay đổi
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="wrp-button">
//                 <button className="btn btn--from btn--blue" onClick={handleSearch}>検索する</button>
//             </div>

//             <div className="box-tab">
//                 <div className="tab01 tab-head">
//                     <ul className="lst-branch">
//                         {tabs.map(tab => (
//                             <li key={tab.id}>
//                                 <a
//                                     onClick={() => handleTabClick(tab.id)}
//                                     className={activeTab === tab.id ? 'active' : ''}
//                                 >
//                                     {tab.label} ({isSearched ? (tab.status !== -1 ? (statusCounts[tab.status] || 0) : (statusTotal || 0)) : 0})
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="tab01 tab-content">
//                     <div className="list-accordion">
//                         <div className="list-accorditon__inner">

//                             {tabs.map(tab => (
//                                 <div key={tab.id} className={activeTab === tab.id ? "sss" : "hidden"}>
//                                     <div className='table_content'>
//                                         {searchResults
//                                             .filter(item => tab.status !== -1 ? Number(item.id_status) === Number(tab.status) : true) // Lọc dữ liệu theo tab status
//                                             .map((item, index) => {
//                                                 try {
//                                                     // Phân tích chuỗi JSON thành đối tượng JavaScript
//                                                     const jsonData = JSON.parse(item.tablejson);
//                                                     const numberStatus = (Number(item.id_status));

//                                                     // Hiển thị thông tin chỉ khi trạng thái phù hợp
//                                                     return (
//                                                         <div className="list-accordion__parent">
//                                                             <div key={index} className={`list-accordion__item ${openTabId === item.id ? 'open' : ''}`}>
//                                                                 <div className="list-accordion__item__head" onClick={() => toggleAccordion(item.id)}>
//                                                                     <div className="list-accordion__item__head__title">
//                                                                         <p className="list-accordion__item__head__title__title">
//                                                                             {jsonData.rows && jsonData.rows.length > 0 ? jsonData.rows[0].tableName : 'No data available'}

//                                                                         </p>
//                                                                         <span className="list-accordion__item__head__title__subtitle">
//                                                                             {jsonData.rows[0].owner}（{jsonData.rows[0].date} {'\u00A0\u00A0'}
//                                                                             {jsonData.rows[0].time}）
//                                                                         </span>
//                                                                     </div>
//                                                                     <div className="list-accordion__item__head__btn">
//                                                                         <p className="list-accordion__item__head__btn__btn">
//                                                                             <span className={`lbl01 ${numberStatus === 1 ? "lbl-blue" : numberStatus === 2 ? "lbl-yellow" : numberStatus === 3 ? "lbl-red" : numberStatus === 4 ? "lbl-white" : numberStatus === 5 ? "lbl-brown" : ""}`} >
//                                                                                 {numberStatus === 1 ? "承認待ち" : numberStatus === 2 ? "差し戻し" : numberStatus === 3 ? "却下" : numberStatus === 4 ? "完了" : numberStatus === 5 ? "下書き" : "取り消し"}
//                                                                             </span>
//                                                                         </p>
//                                                                         <p className="list-accordion__item__head__btn__icn">
//                                                                             <span className="icn-item">
//                                                                                 <img src={editIcon} alt="edit" className="fluid-image" />
//                                                                             </span>
//                                                                             <span className="icn-item">
//                                                                                 <img src={closeIcon} alt="close" className="fluid-image" />
//                                                                             </span>
//                                                                         </p>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="list-accordion__item__content">
//                                                                     {openTabId && (
//                                                                         <div className="list-accordion__item__content__inner">
//                                                                             <div className="list-accordion__item__content__item">

//                                                                                 <Travelallowance id={id} />

//                                                                             </div >
//                                                                         </div>
//                                                                     )
//                                                                     }
//                                                                 </div>
//                                                             </div>
//                                                         </div>

//                                                     );
//                                                 } catch (error) {
//                                                     // Xử lý trường hợp chuỗi không hợp lệ
//                                                     console.error(`Error parsing JSON at index ${index}:`, error);
//                                                     return null; // Hoặc hiển thị một thông báo lỗi phù hợp
//                                                 }
//                                             })}

//                                     </div>
//                                 </div>
//                             ))}
//                         </div >
//                     </div >
//                 </div >
//             </div >
//         </>

//     )

// }

const Search = () => {
  return <div></div>;
};
export default Search;
