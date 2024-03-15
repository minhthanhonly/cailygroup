import { useState } from 'react';
import { Heading2 } from '../../components/Heading';
import {AccordionComponent} from '../../components/AccordionComponent'

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
                                <AccordionComponent items=
                                {
                                    [
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                        { 
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）', 
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                        { 
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）', 
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )  
                                        },
                                    ]
                                } />
                            </div>
                        }
                        {activeTab === 1 && 
                            <div>
                            <AccordionComponent items=
                            {
                                [
                                    {
                                        title: '【申請書名が入ります】', 
                                        subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                        content: (
                                            <div>
                                                <div className='box-register'>
                                                    <ul>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>期間</span>
                                                                <span className='box-register__item__content'>2024/00/00</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>行先</span>
                                                                <span className='box-register__item__content'>行先が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>事由</span>
                                                                <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>備考</span>
                                                                <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='box-approves'>
                                                    <div className='box-approves__inner'>
                                                        <p className='box-approves__headding'>承認状況</p>
                                                        <ul>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>申</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='active'>1</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                        <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                        <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                        <p className='box-approves__item__content__btn'>
                                                                            <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                            <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                            <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                            <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                        </p>
                                                                        <p className='list-btn'>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>未</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>完</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-red01 color-white'>却</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>下</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>消</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    }, 
                                ]
                            } />
                            </div>
                        }
                        {activeTab === 2 &&
                            <div>
                                <AccordionComponent items=
                                {
                                    [
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                    ]
                                } />
                            </div>
                        }
                        {activeTab === 3 && 
                            <div>
                                <AccordionComponent items=
                                {
                                    [
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                    ]
                                } />
                            </div>
                        }
                        {activeTab === 4 && 
                            <div>
                            <AccordionComponent items=
                            {
                                [
                                    {
                                        title: '【申請書名が入ります】', 
                                        subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                        content: (
                                            <div>
                                                <div className='box-register'>
                                                    <ul>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>期間</span>
                                                                <span className='box-register__item__content'>2024/00/00</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>行先</span>
                                                                <span className='box-register__item__content'>行先が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>事由</span>
                                                                <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>備考</span>
                                                                <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='box-approves'>
                                                    <div className='box-approves__inner'>
                                                        <p className='box-approves__headding'>承認状況</p>
                                                        <ul>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>申</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='active'>1</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                        <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                        <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                        <p className='box-approves__item__content__btn'>
                                                                            <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                            <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                            <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                            <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                        </p>
                                                                        <p className='list-btn'>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>未</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>完</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-red01 color-white'>却</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>下</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>消</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    },
                                    {
                                        title: '【申請書名が入ります】', 
                                        subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                        content: (
                                            <div>
                                                <div className='box-register'>
                                                    <ul>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>期間</span>
                                                                <span className='box-register__item__content'>2024/00/00</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>行先</span>
                                                                <span className='box-register__item__content'>行先が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>事由</span>
                                                                <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className='box-register__item'>
                                                                <span className='box-register__item__title'>備考</span>
                                                                <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='box-approves'>
                                                    <div className='box-approves__inner'>
                                                        <p className='box-approves__headding'>承認状況</p>
                                                        <ul>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>申</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='active'>1</span>
                                                                    </div>
                                                                    <div className='box-approves__item__content'>
                                                                        <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                        <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                        <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                        <p className='box-approves__item__content__btn'>
                                                                            <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                            <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                            <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                            <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                        </p>
                                                                        <p className='list-btn'>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                            <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span>未</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>完</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-red01 color-white'>却</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>下</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-approves__item box-approves__item--01'>
                                                                    <div className='box-approves__item__title'>
                                                                        <span className='bg-blue01 color-white'>消</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    },  
                                ]
                            } />
                            </div>
                        }
                        {activeTab === 5 &&
                            <div>
                                <AccordionComponent items=
                                {
                                    [
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        }, 
                                    ]
                                } />
                            </div>
                        }
                        {activeTab === 6 &&
                            <div>
                                <AccordionComponent items=
                                {
                                    [
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        },
                                        {
                                            title: '【申請書名が入ります】', 
                                            subtitle: '髙崎　亜生（2024/01/01　14:00）',
                                            content: (
                                                <div>
                                                    <div className='box-register'>
                                                        <ul>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>期間</span>
                                                                    <span className='box-register__item__content'>2024/00/00</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>行先</span>
                                                                    <span className='box-register__item__content'>行先が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>事由</span>
                                                                    <span className='box-register__item__content'>事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります事由が入ります</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='box-register__item'>
                                                                    <span className='box-register__item__title'>備考</span>
                                                                    <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br />備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='box-approves'>
                                                        <div className='box-approves__inner'>
                                                            <p className='box-approves__headding'>承認状況</p>
                                                            <ul>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>申</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='active'>1</span>
                                                                        </div>
                                                                        <div className='box-approves__item__content'>
                                                                            <p className='box-approves__item__content__text'>承認者名：承認者名が入ります</p>
                                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                                            <p className='box-approves__item__content__btn'>
                                                                                <span><a href="#" className='btncomment btn02'>コメントする</a></span>
                                                                                <span><a href="#" className='btnapprove btn02'>承認する</a></span>
                                                                                <span><a href="#" className='btnremand btn02'>差し戻す</a></span>
                                                                                <span><a href="#" className='btndismiss btn02'>却下する</a></span>
                                                                            </p>
                                                                            <p className='list-btn'>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>差し戻し</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>却下</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-read01 boder-read01'>承認待ち</a></span>
                                                                                <span className='list-btn__item'><a href="#" className='btn01 color-blue01 boder-blue01'>承認済み</a></span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span>未</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>完</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-red01 color-white'>却</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>下</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className='box-approves__item box-approves__item--01'>
                                                                        <div className='box-approves__item__title'>
                                                                            <span className='bg-blue01 color-white'>消</span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) 
                                        },  
                                    ]
                                } />
                            </div> 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
