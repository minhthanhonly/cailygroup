import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../../components/Button';

export const Sidebar = () => {

  const naviget = useNavigate();
  function logoutSubmit(){
    localStorage.setItem('login', 'false');
    localStorage.setItem('userid', '');
    naviget("/");
  }

  return (
    <div className="sidebar">
      <h1 className="logo">
        <img
          src={require('../../../../../assets/logo-site.png')}
          alt="CAILY"
          className="fluid-image"
        />
      </h1>
      <nav className="nav-global-wrap">
        <ul className="nav-global">
          <li className="nav-global__item">
            <NavLink to="/dashboard">
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
              src={require('../../../../../assets/avatar.jpg')}
              alt=""
              className="fluid-image"
            />
          </figure>
          <div className="acount__info">
            {/* <NavLink to="/users" className="acount__name">
              {user.realname}
            </NavLink>
            <p className="acount__des">Nhóm: {user.group_name}</p> */}
          </div>
        </div>
        <Button color="orange" onButtonClick={logoutSubmit}>Đăng xuất</Button>
      </div>
    </div>
  );
};
