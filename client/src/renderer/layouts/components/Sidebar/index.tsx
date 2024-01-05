import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
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

export const Sidebar = () => {
  // const {id} = useParams();
  // console.log(id);
  // type FieldUsers = {
  //   realname: string,
  //   group_name: string,
  // }
  // const [user, setUser] = useState<FieldUsers>({realname: '', group_name: ''});
  // const { state } = useLocation();
  // const userid = state;
  // useEffect(() => {
  //   axios.get('http://cailygroup.com/users/detail/'+userid).then((response) => {
  //     setUser(response.data);
  //   }).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
  // })

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
            <NavLink to="/timecards">
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
            <NavLink to="/users" className="acount__name">
              {/* {user.realname} */}
            </NavLink>
            {/* <p className="acount__des">Nhóm: {user.group_name}</p> */}
          </div>
        </div>
        <NavLink to="/login" className="btn btn--orange">
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
};
