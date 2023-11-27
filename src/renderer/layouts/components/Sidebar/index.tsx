import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsProgress,
  faCalendarDays,
  faClock,
  faGear,
  faHouse,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../components/Button';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="logo">
        <img
          src={require('../../../assets/images/logo-site.png')}
          alt="CAILY"
          className="fluid-image"
        />
      </h1>
      <nav className="nav-global-wrap">
        <ul className="nav-global">
          <li className="nav-global__item">
            <NavLink to="/">
              <span className="icn">
                <FontAwesomeIcon icon={faHouse} />
              </span>
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/timecard">
              <span className="icn">
                <FontAwesomeIcon icon={faClock} />
              </span>
              Thẻ giờ
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/users">
              <span className="icn">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              Thành viên
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/day-off">
              <span className="icn">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              Nghỉ phép
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/group">
              <span className="icn">
                <FontAwesomeIcon icon={faBarsProgress} />
              </span>
              Quản lý nhóm
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/module">
              <span className="icn">
                <FontAwesomeIcon icon={faGear} />
              </span>
              Module
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="acount">
        <div className="acount__inner">
          <figure className="acount__avatar">
            <img
              src={require('../../../assets/images/avatar.jpg')}
              alt=""
              className="fluid-image"
            />
          </figure>
          <div className="acount__info">
            <p className="acount__name">Phan Ho Tu</p>
            <p className="acount__des">Nhóm: Web</p>
          </div>
        </div>
        <NavLink to="/login">Đăng xuất</NavLink>
      </div>
    </div>
  );
};
