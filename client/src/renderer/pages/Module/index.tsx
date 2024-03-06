import {
  FormUser,
  AddGroup,
  AddEditMember,
} from '../../components/Form/Form';
import { FormLeave } from '../../components/Form/FormLeave';
import Dashboard from '../../components/Dashboard/Dashboard';
import { Button } from '../../components/Button/';
import TablePage from '../../components/Table/Table';
import TableCalendar from '../../components/Dashboard/date';
import { Heading2, Heading3 } from '../../components/Heading';
import { Search } from '../../components/Search';
import { Pagination } from '../../components/Pagination';
import { InputQuantity } from '../../components/InputQuantity';
import { Menberdetails } from '../../components/Menberdetails';
import CardTime from '../../components/Card/Card';
import {
  SelectCustom,
  SelectCustomName,
} from '../../components/Table/SelectCustom';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import ButtonEdit from '../../components/Button/ButtonEdit';
import FormLogin from '../../components/Form/AuthForm';

export const Module = () => {
  return (
    <div>
      <div className="wrp-container">
        module
        {/* Hiếu */}
        



        {/* Thủy */}
        {/* tab */}
        <div className='box-tab'>
            <div className='tab01 tab-head'>
              <div className="tab-head__item is-active"><a href="#"><span>進行中</span></a></div>
              <div className='tab-head__item'><a href="#"><span>すべて</span></a></div>
              <div className='tab-head__item'><a href="#"><span>差し戻し</span></a></div>
              <div className='tab-head__item'><a href="#"><span>却下</span></a></div>
              <div className='tab-head__item'><a href="#"><span>完了</span></a></div>
              <div className='tab-head__item'><a href="#"><span>下書き</span></a></div>
              <div className='tab-head__item'><a href="#"><span>取り消し</span></a></div>
            </div>
            <div className="tab01 tab-content">
              <div>
                <div className="is-active">
                  <div className='list-accordion'>
                    <div className='list-accorditon__inner'>
                      <div className='list-accordion__parent'>
                        <div className='list-accordion__item'>
                          <div className='list-accordion__item__head'>
                            <div className='list-accordion__item__head__title'>
                              <p className='list-accordion__item__head__title__title'>【申請書名が入ります】</p>
                              <span className='list-accordion__item__head__title__subtitle'>髙崎　亜生（2024/01/01　14:00）</span>
                            </div>
                            <div className='list-accordion__item__head__btn'>
                              <p className='list-accordion__item__head__btn__btn'>
                                <a href="#">承認する</a>
                              </p>
                              <p className='list-accordion__item__head__btn__icn'>
                                <span className='icn-edit'><img
                                    src={require('../../../../assets/icn-edit.png')}
                                    alt="edit"
                                    className="fluid-image"
                                /></span>
                                <span className='icn-close'><img
                                    src={require('../../../../assets/icn-close.png')}
                                    alt="close"
                                    className="fluid-image"
                                /></span>
                              </p>
                            </div>
                          </div>
                          <div className='list-accordion__item__content'>
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
                                        <span className='box-register__item__content'>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります<br/>備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります備考が入ります</span>
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
                                              <textarea  rows="4" cols="50">コメント入力者の名前：（2024/00/00　00：00：00）コメントが入ります。コメントが入ります。コメントが入ります。</textarea>
                                              <textarea  rows="4" cols="50">コメントを入力（任意1000文字以内）</textarea>
                                              <p className='box-approve__item__content__btn'><a href="#" className='btncomment'>コメントする</a></p>
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
                                              <span className='bg-blue color-white'>完</span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className='box-approve__item box-approve__item--01'>
                                            <div className='box-approve__item__title'>
                                              <span className='bg-red'>却</span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className='box-approve__item box-approve__item--01'>
                                            <div className='box-approve__item__title'>
                                            <span className='bg-blue color-white'>下</span>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className='box-approve__item box-approve__item--01'>
                                            <div className='box-approve__item__title'>
                                            <span className='bg-blue color-white'>消</span>
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
                </div>
              </div>
		        </div>
        </div>



        {/* Thịnh */}




      </div>
    </div>
  );
};
