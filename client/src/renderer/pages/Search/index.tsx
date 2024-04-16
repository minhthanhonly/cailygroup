
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Heading2 } from '../../components/Heading';
import { Tab } from '../Application/tab';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { UserRole } from '../../components/UserRole';



interface ListItem {
    id: string;
    name: string;
    // Các trường khác nếu có
}
const Search = (id: unknown) => {
    const axiosPrivate = useAxiosPrivate();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const isAdmin = users.roles === UserRole.ADMIN;
    const isManager = users.roles === UserRole.MANAGER;
    const isLeader = users.roles === UserRole.LEADER;

    const [statusTotal, setStatusTotal] = useState(0);

    const [listOfTable, setListOfTable] = useState<{ id: string; name: string }[]>([]);

    const [listOfDataBase, setListOflistOfDataBase] = useState<any[]>([]);

    const statusCounts: { [key: number]: number } = {};

    ////////////////////////////////////////////////
    const [isOpen, setIsOpen] = useState(false);
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
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const tabs = [
        { id: 'tab1', label: '進行中', status: -1 },
        { id: 'tab2', label: 'すべて', status: 1 },
        { id: 'tab3', label: '差し戻し', status: 2 },
        { id: 'tab4', label: '却下', status: 3 },
        { id: 'tab5', label: '完了', status: 4 },
        { id: 'tab6', label: '下書き', status: 5 },
        { id: 'tab7', label: '取り消し', status: 6 }
    ];
    const [activeTab, setActiveTab] = useState('tab2');
    const handleTabClick = (tabId: React.SetStateAction<string>) => {
        setActiveTab(tabId);
        // Your logic to handle tab click
    };


    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await axiosPrivate.get('search');
                setListOfTable(response.data); // Cập nhật mảng với dữ liệu từ API
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, []);


    useEffect(() => {
        const getTables = async () => {
            try {

                const response = await axiosPrivate.get('search/data');
                // console.log(response.data);
                // setAccordionItems(response.data);
                const data = response.data;

                setListOflistOfDataBase(data);
                const totalStatus = data.length;
                setStatusTotal(totalStatus);
                // setIdStatusList(idStatusList);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, []);


    listOfDataBase.map((item: { id_status: any; }) => {
        const idStatus = item.id_status;
        statusCounts[idStatus] = (statusCounts[idStatus] || 0) + 1;
    });

    const [date, setDate] = useState(new Date());
    const [dateRange, setDateRange] = useState<{ dateStart: Date | null, dateEnd: Date | null }>({
        dateStart: date,
        dateEnd: date
    });

    const handleLeaveDateChange = (date: Date | null, type: 'start' | 'end') => {
        setDateRange(prevState => ({
            ...prevState,
            [type === 'start' ? 'dateStart' : 'dateEnd']: date
        }));
    };


    // const handleDeleteComment = async (commentId: any, endpoint: string, getDataFunction: () => void) => {
    //     try {
    //         const response = await axiosPrivate.delete(`application/${endpoint}/${commentId}`);
    //         if (response.status === 200) {
    //             console.log('Comment deleted successfully');
    //             getDataFunction();
    //         } else {
    //             console.error('Failed to delete comment:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting comment:', error);
    //     }
    // };

    // const handleSubmitComment = async (value: string, endpoint: string, getDataFunction: () => void, setValueFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }) => {
    //     const note = value.trim();
    //     if (note.length === 0) {
    //         console.error('Không thể thêm comment: Nội dung trống');
    //         return;
    //     }
    //     try {
    //         const commentData = {
    //             note: value,
    //             user_id: users.id,
    //             id_register: id,
    //             authority: endpoint === 'addcomment' ? 1 : (endpoint === 'addcommentsecond' ? 2 : 3),
    //         };
    //         setValueFunction('');
    //         const res = await axiosPrivate.post(`application/${endpoint}/`, commentData);
    //         getDataFunction();
    //     } catch (error) {
    //         console.error('Lỗi khi thêm comment:', error);
    //     }
    // };

    // const getCommentForUser = async (endpoint: string, setDataFunction: { (value: any): void; (value: any): void; (arg0: any[]): void; }) => {
    //     try {
    //         const response = await axiosPrivate.get(`application/${endpoint}/${id}`);
    //         const commentData = response.data;
    //         if (Array.isArray(commentData)) {
    //             setDataFunction(commentData);
    //         } else {
    //             console.error('Error fetching data: Response data is not an array');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // const handleDeleteFirst = async (commentId: any) => {
    //     handleDeleteComment(commentId, 'deletecommentfirst', () => getCommentForUser('getcommentforuserfirst', setCommentFirst));
    // };

    // const handleDeleteSecond = async (commentId: any) => {
    //     handleDeleteComment(commentId, 'deletecommentsecond', () => getCommentForUser('getcommentforusersecond', setCommentSeCond));
    // };

    // const handleDeleteThird = async (commentId: any) => {
    //     handleDeleteComment(commentId, 'deletecommentthird', () => getCommentForUser('getcommentforuserthird', setCommentThird));
    // };

    // const handleSubmitFirst = async () => {
    //     handleSubmitComment(textValue, 'addcomment', () => getCommentForUser('getcommentforuserfirst', setCommentFirst), setTextValue);
    // };

    // const handleSubmitSecond = async () => {
    //     handleSubmitComment(commentValue, 'addcommentsecond', () => getCommentForUser('getcommentforusersecond', setCommentSeCond), setCommentValue);
    // };

    // const handleSubmitThird = async () => {
    //     handleSubmitComment(commentValueThird, 'addcommentthird', () => getCommentForUser('getcommentforuserthird', setCommentThird), setCommentValueThird);
    // };

    // useEffect(() => {
    //     getCommentForUser('getcommentforuserfirst', setCommentFirst);
    //     getCommentForUser('getcommentforusersecond', setCommentSeCond);
    //     getCommentForUser('getcommentforuserthird', setCommentThird);
    // }, [id]);


    const [selectedId, setSelectedId] = useState('');
    const [searchResults, setSearchResults] = useState<ListItem[]>([]);


    // useEffect để đặt giá trị mặc định cho selectedId khi component được tạo
    useEffect(() => {
        setSelectedId(listOfTable.length > 0 ? listOfTable[0].id : '');
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được tạo

    // Hàm xử lý khi chọn một mục từ dropdown
    const handleTableSelect = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedId(event.target.value);
    };

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        // Lấy id của mục được chọn từ dropdown
        const selectedOptionId = selectedId;

        console.log("selectedOptionId", selectedOptionId);

        // Tìm kiếm trong `listOfDataBase` dựa trên id
        const matchedItems = listOfDataBase.filter(item => String(item.table_id) === String(selectedOptionId));
        setSearchResults(matchedItems);

        if (matchedItems.length > 0) {
            console.log('Các mục trong listOfDataBase có cùng id:', matchedItems);
            // Thực hiện tìm kiếm với thông tin của các mục tương ứng
        } else {
            console.log('Không tìm thấy mục nào trong listOfDataBase có id giống với id được chọn.');
        }
    };
    return (
        <>
            <Heading2 text="申請状況" />
            <p className="txt-lead">申請検索</p>

            <div className="group_box">
                <div className="grid-row group_box--grid">
                    <div className="group_box--title"><p>申請書の種類 </p></div>
                    <div className="group_box__insert">
                        <div className="grid-row group_box--form ">
                            <div className="group_box--box">
                                <div className="group_box--flex">
                                    <select className="dropdown" onChange={handleTableSelect}>
                                        {listOfTable.map((data, index) => (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className='tb-from' style={{ marginTop: 4 + 'em' }}>
                <tbody>
                    <tr>
                        <th><div className='tb-from--th'>申請日</div></th>
                        <td>
                            <div className='tb-from--td'>
                                <div className='tb-from--times'>
                                    <span>
                                        <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateStart, 'start')} value={dateRange.dateStart} />
                                    </span>
                                    <span> <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateEnd, 'end')} value={dateRange.dateEnd} /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><div className='tb-from--th'>最終承認完了日</div></th>
                        <td>
                            <div className='tb-from--td'>
                                <div className='tb-from--times'>
                                    <span>
                                        <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateStart, 'start')} value={dateRange.dateStart} />
                                    </span>
                                    <span> <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateEnd, 'end')} value={dateRange.dateEnd} /></span>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div className="group_box">
                <div className="grid-row group_box--grid">
                    <div className="group_box--title"><p>フリーワード </p></div>
                    <div className="group_box__insert">
                        <div className="grid-row group_box--form ">
                            <div className="group_box--box">
                                <div className="group_box--flex">
                                    <input type="text" className="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrp-button">
                <button className="btn btn--from btn--blue" onClick={handleSearch}>検索する</button>
            </div>



            <div className="box-tab">
                <div className="tab01 tab-head">
                    <ul className="lst-branch">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <a
                                    onClick={() => handleTabClick(tab.id)}
                                    className={activeTab === tab.id ? 'active' : ''}
                                >
                                    {tab.label} ({tab.status !== -1 ? (statusCounts[tab.status] || 0) : (statusTotal || 0)})
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tab01 tab-content">
                    <div className="list-accordion">
                        <div className="list-accorditon__inner">

                            {tabs.map(tab => {


                                const isJsonEmpty = (jsonData: {}) => {
                                    return Object.keys(jsonData).length === 0;
                                };

                                const filteredData = tab.status !== -1 ?
                                    listOfDataBase.filter(item => Number(item.id_status) === Number(tab.status)) :
                                    listOfDataBase;


                                return (
                                    <div key={tab.id} className={activeTab === tab.id ? "sss" : "hidden"}>
                                        {filteredData.map(item => {
                                            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
                                            const jsonData = JSON.parse(item.tablejson);

                                            // Truy cập và lưu trữ giá trị của trường statusTotal từ mỗi đối tượng JSON


                                            return (
                                                <div key={item.id}>
                                                    <div className="list-accordion__parent">
                                                        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
                                                            <div className="list-accordion__item__head" onClick={toggleAccordion}>
                                                                <div className="list-accordion__item__head__title">
                                                                    <p className="list-accordion__item__head__title__title">
                                                                        {jsonData.rows && jsonData.rows.length > 0 ? jsonData.rows[0].tableName : 'No data available'}
                                                                    </p>
                                                                    <span className="list-accordion__item__head__title__subtitle">
                                                                        {jsonData.rows[0].owner}（{jsonData.rows[0].date} {'\u00A0\u00A0'}
                                                                        {jsonData.rows[0].time}）
                                                                    </span>
                                                                </div>
                                                                <div className="list-accordion__item__head__btn">
                                                                    <p className="list-accordion__item__head__btn__btn">
                                                                        <span className={approve.approveClass}>
                                                                            {approve.approveTexts}
                                                                        </span>
                                                                    </p>
                                                                    <p className="list-accordion__item__head__btn__icn">
                                                                        <span className="icn-item">
                                                                            <img src={editIcon} alt="edit" className="fluid-image" />
                                                                        </span>
                                                                        <span className="icn-item">
                                                                            <img src={closeIcon} alt="close" className="fluid-image" />
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* Hiển thị tất cả các giá trị của trường statusTotal */}

                                    </div>
                                );
                            })}
                        </div >
                    </div >
                </div >
            </div >
        </>

    )


}

export default Search;