
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import { Heading2 } from '../../components/Heading';
import { Tab } from '../Application/tab';

const Search = () => {

    const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0, 0]);
    const [statusTotal, setStatusTotal] = useState(0);
    const tabs = [
        { id: 'tab1', label: '進行中', status: 1 },
        { id: 'tab2', label: 'すべて', status: -1 },
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
                                    <input type="text" className="search" />
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
                                    {tab.label} ({tab.status === -1 ? statusTotal : statusCount[tab.status - 1]})
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="tab01 tab-content">
                    <div className="list-accordion">
                        <div className="list-accorditon__inner">
                            {tabs.map(tab => (
                                activeTab === tab.id && <Tab key={tab.id} status={tab.status} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}

export default Search;