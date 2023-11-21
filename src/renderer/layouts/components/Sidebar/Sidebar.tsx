import { Link } from 'react-router-dom';
import './Sidebar.scss';

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
            <Link to="/">
              <span className="icn">
                <img
                  src={require('../../../assets/images/icon-home.png')}
                  alt=""
                  className="fluid-image"
                />
              </span>
              Trang chủ
            </Link>
          </li>
          <li className="nav-global__item">
            <Link to="/">
              <span className="icn">
                <img
                  src={require('../../../assets/images/icon-clock.png')}
                  alt=""
                  className="fluid-image"
                />
              </span>
              Thẻ giờ
            </Link>
          </li>
          <li className="nav-global__item">
            <Link to="/">
              <span className="icn">
                <img
                  src={require('../../../assets/images/icon-member.png')}
                  alt=""
                  className="fluid-image"
                />
              </span>
              Thành viên
            </Link>
          </li>
          <li className="nav-global__item">
            <Link to="/">
              <span className="icn">
                <img
                  src={require('../../../assets/images/icon-calendar.png')}
                  alt=""
                  className="fluid-image"
                />
              </span>
              Nghỉ phép
            </Link>
          </li>
          <li className="nav-global__item">
            <Link to="/">
              <span className="icn">
                <img
                  src={require('../../../assets/images/icon-group-manager.png')}
                  alt=""
                  className="fluid-image"
                />
              </span>
              Quản lý nhóm
            </Link>
          </li>
          <li className="nav-global__item">
            <Link to="/module">Module</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
