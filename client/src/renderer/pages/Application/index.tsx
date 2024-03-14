import { useState } from 'react';
import { Heading2 } from '../../components/Heading';
import {Accordion} from '../../components/Accordion'

export const Application = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    const handleTabClick = (index, event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
        setActiveTab(index);
    };

    return (
        <div>
            <Heading2 text="申請状況" />
            <div className='box-application'>
                <p className='txt-lead'>自分が行った申請の一覧です。</p>
                <div className='box-tab'>
                    <div className='tab01 tab-head'>
                        {['進行中', 'すべて', '差し戻し', '却下', '完了', '下書き', '取り消し'].map((label, index) => (
                            <div key={index} className={`tab-head__item ${index === activeTab ? 'is-active' : ''}`}>
                                <a href="#" onClick={(event) => handleTabClick(index, event)}><span>{label}</span></a>
                            </div>
                        ))}
                    </div>
                    <div className="tab01 tab-content">
                        {/* Thêm nội dung tương ứng với tab hoạt động ở đây */}
                        {activeTab === 0 && 
                        <div>
                            <Accordion title="【申請書名が入ります】" subtitle="髙崎　亜生（2024/01/01　14:00）" />
                        </div>
                        }
                        {activeTab === 1 && <p>Nội dung của tab すべて</p>}
                        {activeTab === 2 && <p>Nội dung của tab 差し戻し</p>}
                        {activeTab === 3 && <p>Nội dung của tab 却下</p>}
                        {activeTab === 4 && <p>Nội dung của tab 完了</p>}
                        {activeTab === 5 && <p>Nội dung của tab 下書き</p>}
                        {activeTab === 6 && <p>Nội dung của tab 取り消し</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
