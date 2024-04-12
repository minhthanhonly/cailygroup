
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Heading2 } from '../../components/Heading';
import { Tab } from '../Application/tab';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';
import { UserRole } from '../../components/UserRole';

const Search = (id: unknown) => {
    const axiosPrivate = useAxiosPrivate();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const isAdmin = users.roles === UserRole.ADMIN;
    const isManager = users.roles === UserRole.MANAGER;
    const isLeader = users.roles === UserRole.LEADER;

    const [statusTotal, setStatusTotal] = useState(0);

    const [listOfTable, setListOfTable] = useState([]); // Sử dụng kiểu dữ liệu Table
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


    const [accordionItems, setAccordionItems] = useState<any>([]);
    useEffect(() => {
        const Load = async () => {
            try {
                const response = await axiosPrivate.get('application/getforid/' + id);
                // console.log(response.data);
                // setAccordionItems(response.data);
                const data = response.data;
                const parsedTableJson = JSON.parse(data.tablejson);
                console.log(parsedTableJson);
                setAccordionItems(parsedTableJson.rows[0]);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        Load();
    }, [id]);

    const handleDeleteComment = async (commentId: any, endpoint: string, getDataFunction: () => void) => {
        try {
            const response = await axiosPrivate.delete(`application/${endpoint}/${commentId}`);
            if (response.status === 200) {
                console.log('Comment deleted successfully');
                getDataFunction();
            } else {
                console.error('Failed to delete comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleSubmitComment = async (value: string, endpoint: string, getDataFunction: () => void, setValueFunction: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }) => {
        const note = value.trim();
        if (note.length === 0) {
            console.error('Không thể thêm comment: Nội dung trống');
            return;
        }
        try {
            const commentData = {
                note: value,
                user_id: users.id,
                id_register: id,
                authority: endpoint === 'addcomment' ? 1 : (endpoint === 'addcommentsecond' ? 2 : 3),
            };
            setValueFunction('');
            const res = await axiosPrivate.post(`application/${endpoint}/`, commentData);
            getDataFunction();
        } catch (error) {
            console.error('Lỗi khi thêm comment:', error);
        }
    };

    const getCommentForUser = async (endpoint: string, setDataFunction: { (value: any): void; (value: any): void; (arg0: any[]): void; }) => {
        try {
            const response = await axiosPrivate.get(`application/${endpoint}/${id}`);
            const commentData = response.data;
            if (Array.isArray(commentData)) {
                setDataFunction(commentData);
            } else {
                console.error('Error fetching data: Response data is not an array');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteFirst = async (commentId: any) => {
        handleDeleteComment(commentId, 'deletecommentfirst', () => getCommentForUser('getcommentforuserfirst', setCommentFirst));
    };

    const handleDeleteSecond = async (commentId: any) => {
        handleDeleteComment(commentId, 'deletecommentsecond', () => getCommentForUser('getcommentforusersecond', setCommentSeCond));
    };

    const handleDeleteThird = async (commentId: any) => {
        handleDeleteComment(commentId, 'deletecommentthird', () => getCommentForUser('getcommentforuserthird', setCommentThird));
    };

    const handleSubmitFirst = async () => {
        handleSubmitComment(textValue, 'addcomment', () => getCommentForUser('getcommentforuserfirst', setCommentFirst), setTextValue);
    };

    const handleSubmitSecond = async () => {
        handleSubmitComment(commentValue, 'addcommentsecond', () => getCommentForUser('getcommentforusersecond', setCommentSeCond), setCommentValue);
    };

    const handleSubmitThird = async () => {
        handleSubmitComment(commentValueThird, 'addcommentthird', () => getCommentForUser('getcommentforuserthird', setCommentThird), setCommentValueThird);
    };

    useEffect(() => {
        getCommentForUser('getcommentforuserfirst', setCommentFirst);
        getCommentForUser('getcommentforusersecond', setCommentSeCond);
        getCommentForUser('getcommentforuserthird', setCommentThird);
    }, [id]);
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
                                    <select className="dropdown">
                                        {listOfTable.map((data, index) => (
                                            <option value={data.id}>{data.name}</option>
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
                <button className="btn btn--from btn--blue">検索する</button>
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
                                                            <div className="list-accordion__item__content">
                                                                {isOpen && (
                                                                    <div className="list-accordion__item__content__inner">
                                                                        <div className="list-accordion__item__content__item">



                                                                            <div className="box-approves">
                                                                                <div className="box-approves__inner">
                                                                                    <p className="box-approves__headding">承認状況</p>
                                                                                    <ul>
                                                                                        <li>
                                                                                            <div className="box-approves__item">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span>申</span>
                                                                                                </div>
                                                                                                <div className="box-approves__item__content">
                                                                                                    <p className="box-approves__item__content__text">
                                                                                                        申請者名：{jsonData.rows[0].realname}（申請日時：
                                                                                                        {jsonData.rows[0].date}
                                                                                                        {'\u00A0\u00A0'}
                                                                                                        {jsonData.rows[0].time}）
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span>1</span>
                                                                                                </div>
                                                                                                <div className="box-approves__item__content">
                                                                                                    <p className="box-approves__item__content__text">
                                                                                                        承認者名：{jsonData.rows[0].owner}（申請日時：
                                                                                                        {jsonData.rows[0].date}
                                                                                                        {'\u00A0\u00A0'}
                                                                                                        {jsonData.rows[0].time}）
                                                                                                    </p>
                                                                                                    {commentFirst.length > 0 && (
                                                                                                        <div className="box-approves__item__content__comment">
                                                                                                            {commentFirst.map((commentItem: { realname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; createdAt: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: any; note: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                                                                                                                <div
                                                                                                                    key={index}
                                                                                                                    className="box-approves__item__content__comment__item"
                                                                                                                >
                                                                                                                    <p className="box-approves__item__content__comment__head">
                                                                                                                        <span className="box-approves__item__content__comment__title">
                                                                                                                            {commentItem.realname}
                                                                                                                            ：（{commentItem.createdAt}）
                                                                                                                        </span>

                                                                                                                        {isAdmin ? (
                                                                                                                            <>
                                                                                                                                <span
                                                                                                                                    className="btn-delete"
                                                                                                                                    onClick={() =>
                                                                                                                                        handleDeleteFirst(commentItem.id)
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <img
                                                                                                                                        src={require('../../../../assets/close.png')}
                                                                                                                                        alt="delete"
                                                                                                                                        className="fluid-image"
                                                                                                                                    />
                                                                                                                                </span>
                                                                                                                            </>
                                                                                                                        ) : (
                                                                                                                            <span></span>
                                                                                                                        )}
                                                                                                                    </p>
                                                                                                                    <p className="box-approves__item__content__comment__text">
                                                                                                                        {commentItem.note}
                                                                                                                    </p>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    )}
                                                                                                    {isAdmin ? (
                                                                                                        <>
                                                                                                            <textarea
                                                                                                                placeholder="ココメントを入力（任意1000文字以内）"
                                                                                                                value={textValue}
                                                                                                                onChange={(event) =>
                                                                                                                    setTextValue(event.target.value)
                                                                                                                }
                                                                                                            />
                                                                                                            <p className="box-approves__item__content__btn">
                                                                                                                <span>
                                                                                                                    <a
                                                                                                                        className="btncomment btn02"
                                                                                                                        onClick={handleSubmitFirst}
                                                                                                                    >
                                                                                                                        コメントする
                                                                                                                    </a>
                                                                                                                </span>
                                                                                                            </p>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <div></div>
                                                                                                    )}

                                                                                                    <p className="list-btn">
                                                                                                        <span className="list-btn__item">
                                                                                                            <span className={statusattr.statusattrClass}>
                                                                                                                {statusattr.statusattrTexts}
                                                                                                            </span>
                                                                                                        </span>
                                                                                                    </p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span>2</span>
                                                                                                </div>
                                                                                                <div className="box-approves__item__content">
                                                                                                    <p className="box-approves__item__content__text">
                                                                                                        承認者名：{jsonData.rows[0].owner}（申請日時：
                                                                                                        {jsonData.rows[0].date}
                                                                                                        {'\u00A0\u00A0'}
                                                                                                        {jsonData.rows[0].time}）
                                                                                                    </p>
                                                                                                    {commentSeCond.length > 0 && (
                                                                                                        <div className="box-approves__item__content__comment">
                                                                                                            {commentSeCond.map(
                                                                                                                (commentItem: any, index: any) => (
                                                                                                                    <div
                                                                                                                        key={index}
                                                                                                                        className="box-approves__item__content__comment__item"
                                                                                                                    >
                                                                                                                        <p className="box-approves__item__content__comment__head">
                                                                                                                            <span className="box-approves__item__content__comment__title">
                                                                                                                                {commentItem.realname}
                                                                                                                                ：（{commentItem.createdAt}）
                                                                                                                            </span>
                                                                                                                            {isManager ? (
                                                                                                                                <>
                                                                                                                                    <span
                                                                                                                                        className="btn-delete"
                                                                                                                                        onClick={() =>
                                                                                                                                            handleDeleteSecond(
                                                                                                                                                commentItem.id,
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        <img
                                                                                                                                            src={require('../../../../assets/close.png')}
                                                                                                                                            alt="delete"
                                                                                                                                            className="fluid-image"
                                                                                                                                        />
                                                                                                                                    </span>
                                                                                                                                </>
                                                                                                                            ) : (
                                                                                                                                <span></span>
                                                                                                                            )}
                                                                                                                        </p>
                                                                                                                        <p className="box-approves__item__content__comment__text">
                                                                                                                            {commentItem.note}
                                                                                                                        </p>
                                                                                                                    </div>
                                                                                                                ),
                                                                                                            )}
                                                                                                        </div>
                                                                                                    )}
                                                                                                    {isManager ? (
                                                                                                        <>
                                                                                                            <textarea
                                                                                                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                                                                                                value={commentValue}
                                                                                                                onChange={(event) =>
                                                                                                                    setCommentValue(event.target.value)
                                                                                                                }
                                                                                                            />
                                                                                                            <p className="box-approves__item__content__btn">
                                                                                                                <span>
                                                                                                                    <a
                                                                                                                        className="btncomment btn02"
                                                                                                                        onClick={handleSubmitSecond}
                                                                                                                    >
                                                                                                                        コメントする
                                                                                                                    </a>
                                                                                                                </span>
                                                                                                            </p>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <div></div>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>

                                                                                        <li>
                                                                                            <div className="box-approves__item">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span className="active">3</span>
                                                                                                </div>
                                                                                                <div className="box-approves__item__content">
                                                                                                    <p className="box-approves__item__content__text">
                                                                                                        承認者名：{jsonData.rows[0].owner}（申請日時：
                                                                                                        {jsonData.rows[0].date}
                                                                                                        {'\u00A0\u00A0'}
                                                                                                        {jsonData.rows[0].time}）
                                                                                                    </p>
                                                                                                    {commentThird.length > 0 && (
                                                                                                        <div className="box-approves__item__content__comment">
                                                                                                            {commentThird.map(
                                                                                                                (commentItem: any, index: any) => (
                                                                                                                    <div
                                                                                                                        key={index}
                                                                                                                        className="box-approves__item__content__comment__item"
                                                                                                                    >
                                                                                                                        <p className="box-approves__item__content__comment__head">
                                                                                                                            <span className="box-approves__item__content__comment__title">
                                                                                                                                {commentItem.realname}
                                                                                                                                ：（{commentItem.createdAt}）
                                                                                                                            </span>
                                                                                                                            {isLeader ? (
                                                                                                                                <>
                                                                                                                                    <span
                                                                                                                                        className="btn-delete"
                                                                                                                                        onClick={() =>
                                                                                                                                            handleDeleteThird(
                                                                                                                                                commentItem.id,
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        <img
                                                                                                                                            src={require('../../../../assets/close.png')}
                                                                                                                                            alt="delete"
                                                                                                                                            className="fluid-image"
                                                                                                                                        />
                                                                                                                                    </span>
                                                                                                                                </>
                                                                                                                            ) : (
                                                                                                                                <span></span>
                                                                                                                            )}
                                                                                                                        </p>
                                                                                                                        <p className="box-approves__item__content__comment__text">
                                                                                                                            {commentItem.note}
                                                                                                                        </p>
                                                                                                                    </div>
                                                                                                                ),
                                                                                                            )}
                                                                                                        </div>
                                                                                                    )}
                                                                                                    {isLeader ? (
                                                                                                        <>
                                                                                                            <textarea
                                                                                                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                                                                                                value={commentValueThird}
                                                                                                                onChange={(event) =>
                                                                                                                    setCommentValueThird(event.target.value)
                                                                                                                }
                                                                                                            />
                                                                                                            <p className="box-approves__item__content__btn">
                                                                                                                <span>
                                                                                                                    <a
                                                                                                                        className="btncomment btn02"
                                                                                                                        onClick={handleSubmitThird}
                                                                                                                    >
                                                                                                                        コメントする
                                                                                                                    </a>
                                                                                                                </span>
                                                                                                            </p>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <div></div>
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span>未</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item box-approves__item--01">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span className="bg-blue01 color-white">完</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item box-approves__item--01">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span className="bg-red01 color-white">却</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item box-approves__item--01">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span className="bg-blue01 color-white">下</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        <li>
                                                                                            <div className="box-approves__item box-approves__item--01">
                                                                                                <div className="box-approves__item__title">
                                                                                                    <span className="bg-blue01 color-white">消</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div >
                                                                    </div>
                                                                )
                                                                }
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