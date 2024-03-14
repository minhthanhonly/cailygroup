import React, { useState } from 'react';

export const Accordion = ({ title, subtitle }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordionParent = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`list-accordion ${isActive ? 'is-active' : ''}`}>
			<div className='list-accorditon__inner'>
				<div className='list-accordion__parent' onClick={toggleAccordionParent}>
                    <div className='list-accordion__item'>
                        <div className='list-accordion__item__head'>
                            <div className='list-accordion__item__head__title'>
                                <p className='list-accordion__item__head__title__title'>【申請書名が入ります】</p>
                                <span className='list-accordion__item__head__title__subtitle'>髙崎　亜生（2024/01/01　14:00）</span>
                            </div>
                            <div className='list-accordion__item__head__btn'>
                                <p className='list-accordion__item__head__btn__btn'>
                                    <a href="#" className='btn01'>承認する</a>
                                </p>
                                <p className='list-accordion__item__head__btn__icn'>
                                    <span className='icn-item'><img
                                        src={require('../../../../assets/icn-edit.png')}
                                        alt="edit"
                                        className="fluid-image"
                                    /></span>
                                    <span className='icn-item'><img
                                        src={require('../../../../assets/icn-close.png')}
                                        alt="close"
                                        className="fluid-image"
                                    /></span>
                                </p>
                            </div>
                        </div>
                        <div className={`list-accordion__item__content ${isActive ? 'is-active' : ''}`}>
                            <div className='list-accordion__item__content__inner'>
                                <div className='list-accordion__item__content__item'>
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
                                    <div className='box-approve'>
                                        <div className='box-approve__inner'>
                                            <p className='box-approve__headding'>承認状況</p>
                                            <ul>
                                                <li>
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span>申</span>
                                                        </div>
                                                        <div className='box-approve__item__content'>
                                                            <p className='box-approve__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='active'>1</span>
                                                        </div>
                                                        <div className='box-approve__item__content'>
                                                            <p className='box-approve__item__content__text'>承認者名：承認者名が入ります</p>
                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                            <p className='box-approve__item__content__btn'>
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
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span>未</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>完</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-red01 color-white'>却</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>下</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>消</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
                <div className='list-accordion__parent' onClick={toggleAccordionParent}>
                    <div className='list-accordion__item'>
                        <div className='list-accordion__item__head'>
                            <div className='list-accordion__item__head__title'>
                                <p className='list-accordion__item__head__title__title'>【申請書名が入ります】</p>
                                <span className='list-accordion__item__head__title__subtitle'>髙崎　亜生（2024/01/01　14:00）</span>
                            </div>
                            <div className='list-accordion__item__head__btn'>
                                <p className='list-accordion__item__head__btn__btn'>
                                    <a href="#" className='bg-yellow01 btn01'>差し戻し</a>
                                </p>
                                <p className='list-accordion__item__head__btn__icn'>
                                    <span className='icn-item'><img
                                        src={require('../../../../assets/icn-edit.png')}
                                        alt="edit"
                                        className="fluid-image"
                                    /></span>
                                    <span className='icn-item'><img
                                        src={require('../../../../assets/icn-close.png')}
                                        alt="close"
                                        className="fluid-image"
                                    /></span>
                                </p>
                            </div>
                        </div>
                        <div className={`list-accordion__item__content ${isActive ? 'is-active' : ''}`}>
                            <div className='list-accordion__item__content__inner'>
                                <div className='list-accordion__item__content__item'>
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
                                    <div className='box-approve'>
                                        <div className='box-approve__inner'>
                                            <p className='box-approve__headding'>承認状況</p>
                                            <ul>
                                                <li>
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span>申</span>
                                                        </div>
                                                        <div className='box-approve__item__content'>
                                                            <p className='box-approve__item__content__text'>申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='active'>1</span>
                                                        </div>
                                                        <div className='box-approve__item__content'>
                                                            <p className='box-approve__item__content__text'>承認者名：承認者名が入ります</p>
                                                            <textarea rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                                            <textarea rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                                            <p className='box-approve__item__content__btn'>
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
                                                    <div className='box-approve__item'>
                                                        <div className='box-approve__item__title'>
                                                            <span>未</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>完</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-red01 color-white'>却</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>下</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='box-approve__item box-approve__item--01'>
                                                        <div className='box-approve__item__title'>
                                                            <span className='bg-blue01 color-white'>消</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
    );
};
