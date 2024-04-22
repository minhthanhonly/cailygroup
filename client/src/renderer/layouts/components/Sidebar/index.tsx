import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBarsProgress,
  faCalendarDays,
  faClock,
  faFileClipboard,
  faFileLines,
  faGear,
  faHouse,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from '../../../api/axios';
import { Button } from '../../../components/Button';
import useAuth from '../../../hooks/useAuth';
import { UserRole } from '../../../components/UserRole';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export const Sidebar = () => {
  const axiosPrivate = useAxiosPrivate();
  const naviget = useNavigate();
  const { auth } = useAuth();

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  const isAdmin = users.roles === UserRole.ADMIN;
  const isManager = users.roles === UserRole.MANAGER;
  const isLeader = users.roles === UserRole.LEADER;

  function logoutSubmit() {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('users');
    localStorage.removeItem('token');
    naviget('/');
  }


  const [formValue, setFormValue] = useState({ realname: '', group_name: '' });
  useEffect(() => {
    axios.get('users/detail/' + users.userid).then((response) => {
      setFormValue(response.data);
    });
  }, []);


  const [countIdStatusOne, setCountIdStatusOne] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('search/data');
        const data = response.data;
        const countIdStatusOne = data.reduce((total: number, item: { id_status: any; }) => {
          return Number(item.id_status) === 1 ? total + 1 : total;
        }, 0);
        setCountIdStatusOne(countIdStatusOne);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Cập nhật dữ liệu mỗi 5 giây

    return () => {
      clearInterval(interval); // Xóa interval khi component unmount
    };
  }, []);


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
            <NavLink to="/dayoffs">
              <span className="icn">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              Nghỉ phép
            </NavLink>
          </li>
          {isAdmin || isManager ? (
            <li className="nav-global__item">
              <NavLink to="/members">
                <span className="icn">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
                Thành viên
              </NavLink>
            </li>
          ) : (
            ''
          )}
          {isAdmin || isManager ? (
            <li className="nav-global__item">
              <NavLink to="/group">
                <span className="icn">
                  <FontAwesomeIcon icon={faBarsProgress} />
                </span>
                Quản lý nhóm
              </NavLink>
            </li>
          ) : (
            ''
          )}
          <li className="nav-global__item">
            <NavLink to="/module">
              <span className="icn">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              module
            </NavLink>
          </li>
          <li className="nav-global__item">
            {/* <NavLink to="/tabs/tab2"> */}
            <NavLink to="/application">申請状況</NavLink> <span className='boder_count'>{countIdStatusOne}</span>
          </li>
          <li className="nav-global__item">
            <NavLink to="/estimate">
              <span className="icn">
                {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
              </span>
              新規申請
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/field">
              <span className="icn">
                <FontAwesomeIcon icon={faCalendarDays} />
              </span>
              Field
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/form/add">
              <span className="icn">
                <FontAwesomeIcon icon={faFileLines} />
              </span>
              Add New Form
            </NavLink>
          </li>
          <li className="nav-global__item">
            <NavLink to="/form/detail/2">
              <span className="icn">
                <FontAwesomeIcon icon={faFileLines} />
              </span>
              Form Detail
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="acount">
        <div className="acount__inner">
          <figure className="acount__avatar">
            <img
              src="https://placehold.jp/50x50.png"
              alt=""
              className="fluid-image"
            />
          </figure>
          <div className="acount__info">
            <NavLink
              to={'/users/detail/' + users.userid}
              className="acount__name"
            >
              {users.realname}
            </NavLink>
            <p className="acount__des">Nhóm: {users.user_group}</p>
          </div>
        </div>
        <Button color="orange" onButtonClick={logoutSubmit}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};
