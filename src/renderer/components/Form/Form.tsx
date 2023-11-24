import './from.scss';

export const FormLogin = () => {
  return (
    <div className="form-login">
      <div className="form-content">
        <h2 className="form-login--title">Đăng Nhập</h2>
        <div className="form-group">
          <input className="form-input" type="text" placeholder="Tài Khoản" />
        </div>
        <div className="form-group">
          <input className="form-input" type="text" placeholder="Mật Khẩu" />
        </div>
        <div className="center">
          <button className="btn">Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};

export const FormUser = () => {
  return (
    <div className="form-user">
      <div className="form-content">
        <div className="form-group">
          <label>
            Họ và tên *
            <img
              src={require('../../assets/images/icon-user.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" placeholder="Tài Khoản" />
        </div>
        <div className="form-group">
          <label>
            Địa chỉ *
            <img
              src={require('../../assets/images/icon-address.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" placeholder="Địa chỉ" />
        </div>
        <div className="form-group">
          <label>
            Số Điện Thoại *
            <img
              src={require('../../assets/images/icon-phone.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Số Điện Thoại"
          />
        </div>
        <div className="form-group">
          <label>
            Email *
            <img
              src={require('../../assets/images/icon-email.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>
            Spyke ID *
            <img
              src={require('../../assets/images/icon-email.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" placeholder="ID Skype" />
        </div>
        <h3>Thay đổi mật khẩu: </h3>
        <div className="form-group">
          <label>
            Mật khẩu hiện tại
            <img
              src={require('../../assets/images/icon-password.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Mật khẩu hiện tại"
          />
        </div>
        <div className="form-group">
          <label>
            Mật Khẩu Mới
            <img
              src={require('../../assets/images/icon-newpassword.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Mật Khẩu Mới"
          />
        </div>
        <div className="form-group">
          <label>
            Mật Khẩu Mới
            <br /> (xác nhận)
            <img
              src={require('../../assets/images/icon-conpassword.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Xác nhận lại mật khẩu"
          />
        </div>
        <div className="center">
          <button className="btn">Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};
export const FormLeave = () => {
  return (
    <div className="form-leave">
      <div className="form-content">
        <div className="form-group">
          <label>
            Ngày bắt đầu
            <img
              src={require('../../assets/images/icon-user.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" />
        </div>
        <div className="form-group">
          <label>
            Ngày kết thúc
            <img
              src={require('../../assets/images/icon-address.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" />
        </div>
        <div className="form-group">
          <label>
            Số Điện Thoại *
            <img
              src={require('../../assets/images/icon-phone.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input
            className="form-input"
            type="text"
            placeholder="Số Điện Thoại"
          />
        </div>
        <div className="form-group">
          <label>
            Email *
            <img
              src={require('../../assets/images/icon-email.jpg')}
              alt=""
              className="fluid-image"
            />
          </label>
          <input className="form-input" type="text" placeholder="Email" />
        </div>
        <div className="center">
          <button className="btn">Đăng Nhập</button>
        </div>
      </div>
    </div>
  );
};
