import { NavLink } from 'react-router-dom';
import './Menberdetails.scss';

export const Menberdetails = () => {
  return (
    <div className="menberdetails-info">
      <p className="menberdetails-info__avatar">
        <img
          src={require('../../assets/images/avatar.jpg')}
          alt=""
          className="fluid-image"
        />
      </p>
      <div className="menberdetails-info__content">
        <ul>
          <li>
            <p className="menberdetails-info__content__title">ID:</p>
            <p className="menberdetails-info__content__text">tu_web</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icnname">
              Họ tên:
            </p>
            <p className="menberdetails-info__content__text">Phan Ho Tu</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icngroup">
              Nhóm:
            </p>
            <p className="menberdetails-info__content__text">Web</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icnaddress">
              Địa chỉ:
            </p>
            <p className="menberdetails-info__content__text">aaa</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icnphone">
              Điện thoai:
            </p>
            <p className="menberdetails-info__content__text">90909090</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icnemail">
              Email:
            </p>
            <p className="menberdetails-info__content__text">aaa@gmail.com</p>
          </li>
          <li>
            <p className="menberdetails-info__content__title menberdetails-info__content__title--icnskype">
              Skype ID:
            </p>
            <p className="menberdetails-info__content__text">aaa@gmail.com</p>
          </li>
        </ul>
        <NavLink to="/users-edit">
          <div className="center menberdetails-info__btn">
            <button className="btn">Thiết lập cá nhân</button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
