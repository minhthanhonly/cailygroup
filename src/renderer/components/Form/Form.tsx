import './From.scss';

export const FromLogin = () => {
  return (
    <div className="from-login">
      <div className="from-content">
        <h2 className="from-login--title">Đăng Nhập</h2>
        <div className="from-group">
          <input className="from-input" type="text" placeholder="Tài Khoản" />
        </div>
        <div className="from-group">
          <input className="from-input" type="text" placeholder="Mật Khẩu" />
        </div>
        <div className="center">
          <button className="btn">Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};

export const FromUser = () => {
  return (
    <div className="from-user">
      <div className="from-content">
        <div className="from-group">
          <label>
            Họ và tên *
            <img
              src={require('../../assets/images/icon-user.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="from-input" type="text" placeholder="Tài Khoản" />
        </div>
        <div className="from-group">
          <label>
            Địa chỉ *
            <img
              src={require('../../assets/images/icon-address.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="from-input" type="text" placeholder="Địa chỉ" />
        </div>
        <div className="center">
          <button className="btn">Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};
