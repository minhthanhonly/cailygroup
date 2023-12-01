import { useState } from 'react';
import DatePicker from 'react-datepicker';

import './From.scss';
import 'react-datepicker/dist/react-datepicker.css';
import TimeSelect from '../Modal/TimeSelect';

export const FormLogin = () => {
  return (
    <div className="form-login">
      <div className="form">
        <div className="form-login--logo">
          <img
            src={require('../../assets/images/logo-site.png')}
            alt=""
            className="fluid-image"
          />
          <h3>SMART IDEAS FOR A BETTER LIFE </h3>
        </div>
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
    </div>
  );
};

export const FormUser = () => {
  return (
    <div className="form-user form">
      <div className="form-content">
        <h2 className="hdglv2">
          <span>Thiết lập cá nhân</span>
        </h2>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>
                Họ và tên *
                <img
                  src={require('../../assets/images/icon-user.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Tài Khoản"
              />
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
                  src={require('../../assets/images/icon-skype.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="ID Skype"
              />
            </div>
            <h4>Thay đổi mật khẩu: </h4>
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
            <div className="wrp-button">
              <button className="btn">Xác nhận</button>
              <button className="btn btn--orange">Hủy</button>
            </div>
          </div>
          <div className="col-6">
            <div className="user-image">
              <img
                src={require('../../assets/images/avatar.jpg')}
                alt=""
                className="fluid-image"
              />
              <button className="btn btn--orange">Sửa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FormLeave = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date !== null) {
      setEndDate(date);
    }
  };
  return (
    <div className="form-leave form">
      <div className="form-content">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>
                Ngày bắt đầu
                <img
                  src={require('../../assets/images/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group form-group--small">
              <label>
                Giờ bắt đầu
                <img
                  src={require('../../assets/images/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <TimeSelect />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>
                Ngày kết thúc
                <img
                  src={require('../../assets/images/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDateChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group form-group--small">
              <label>
                Giờ kết thúc
                <img
                  src={require('../../assets/images/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <TimeSelect />
            </div>
          </div>
          <div className="form-group">
            <label>
              Lý do nghỉ
              <img
                src={require('../../assets/images/icon-practice.jpg')}
                alt=""
                className="fluid-image"
              />
            </label>
            <textarea className="form-input"></textarea>
          </div>
        </div>
        <div className="">
          <button className="btn btn--green">Xác nhận</button>
          <button className="btn btn--orange">Hủy</button>
        </div>
      </div>
    </div>
  );
};

export const AddGroup = () => {
  return (
    <div className="form-group form-addgroup">
      <label>Nhập Tên Nhóm:</label>
      <img
        src={require('../../assets/images/icn-group.png')}
        alt=""
        className="fluid-image form-addgroup__image"
      />
      <input
        className="form-input"
        type="text"
        placeholder="Tên nhóm muốn thêm"
      />
      <button className="btn">Thêm</button>
    </div>
  );
};
