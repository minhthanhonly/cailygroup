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
                            </div>
                          </div>
                          <div className='list-accordion__item__content'>
                            <div className='list-accordion__item__content__inner'>
                              
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
