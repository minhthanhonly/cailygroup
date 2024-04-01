import axios, { axiosPrivate } from '../../api/axios';
import { useEffect, useState } from 'react';
import editIcon from '../../../../assets/icn-edit.png';
import closeIcon from '../../../../assets/icn-close.png';

export const TabContent = ({ id }) => {
  const [accordionItems, setAccordionItems] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [approve, setApprove] = useState({
    approveTexts: '',
    approveClass: '',
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const Load = async () => {
      try {
        const response = await axiosPrivate.get('application/getforid/' + id);
        setAccordionItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Load();
  }, [id]);
  useEffect(() => {
    if (accordionItems.status == 0) {
      setApprove({
        approveTexts: '承認待ち',
        approveClass: 'lbl01 lbl-blue',
      });
    } else if (accordionItems.status == 1) {
      setApprove({
        approveTexts: '差し戻し',
        approveClass: 'lbl01 lbl-yellow',
      });
    } else if (accordionItems.status == 2) {
      setApprove({
        approveTexts: '下書き',
        approveClass: 'lbl01 lbl-brown',
      });
    } else if (accordionItems.status == 3) {
      setApprove({
        approveTexts: '却下',
        approveClass: 'lbl01 lbl-red',
      });
    } else if (accordionItems.status == 4) {
      setApprove({
        approveTexts: '完了',
        approveClass: 'lbl01 lbl-white',
      });
    } else {
      setApprove({
        approveTexts: '取り消し',
        approveClass: 'lbl01',
      });
    }
  }, [accordionItems]);
  return (
    <>
      <div className="list-accordion__parent">
        <div className={`list-accordion__item ${isOpen ? 'open' : ''}`}>
          <div className="list-accordion__item__head" onClick={toggleAccordion}>
            <div className="list-accordion__item__head__title">
              <p className="list-accordion__item__head__title__title">
                {accordionItems.name}
              </p>
              <span className="list-accordion__item__head__title__subtitle">
                {accordionItems.realname} ({accordionItems.date}
                {accordionItems.time}）
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
                  <div className="box-register">
                    <ul>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            期間
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.date}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            行先
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.destination}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            事由
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.destination}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="box-register__item">
                          <span className="box-register__item__title">
                            備考
                          </span>
                          <span className="box-register__item__content">
                            {accordionItems.note}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
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
                                申請者名：申請者名が入ります（申請日時：2024/00/00　00：00：00）
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
                                承認者名：承認者名が入ります
                              </p>
                              <textarea
                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                value={textValue}
                                onChange={(event) =>
                                  setTextValue(event.target.value)
                                }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a href="#" className="btncomment btn02">
                                    コメントする
                                  </a>
                                </span>
                              </p>
                              <p className="list-btn">
                                <span className="list-btn__item">
                                  <span className="lbl01"></span>
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
                                承認者名：承認者名が入ります
                              </p>
                              <textarea
                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                value={textValue}
                                onChange={(event) =>
                                  setTextValue(event.target.value)
                                }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a href="#" className="btncomment btn02">
                                    コメントする
                                  </a>
                                </span>
                              </p>
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
                                承認者名：承認者名が入ります
                              </p>
                              <textarea
                                placeholder="コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。"
                                value={textValue}
                                onChange={(event) =>
                                  setTextValue(event.target.value)
                                }
                              />
                              <p className="box-approves__item__content__btn">
                                <span>
                                  <a href="#" className="btncomment btn02">
                                    コメントする
                                  </a>
                                </span>
                              </p>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
