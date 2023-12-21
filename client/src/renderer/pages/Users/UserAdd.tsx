import { useState } from "react";
import { AddEditMember } from "../../components/Form/Form";
import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import axios from "axios";

export const UserAdd = () => {
  const [formValue, setFormValue] = useState({userid: '', password: '', realname: '', authority: '', user_group: ''})
  const handleInput = (e) => {
    setFormValue({...formValue, [e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formValue);
    const formData = {userid:formValue.userid, password:formValue.password, realname:formValue.realname, authority:formValue.authority, user_group:formValue.user_group}
    const res = await axios.post("http://cailygroup.com/users/add", formData);
  }

  return (
    <>
      <Heading2 text="Thêm thành viên" />
      <div className="form-user form">
        <div className="form-content">
          <div className="row">
            <div className="col-6">
              <form onSubmit={handleSubmit} method="POST">
                <div className="form-group">
                  <label>
                    ID User *
                    <img
                      src={require('../../../../assets/icn-id.png')}
                      alt=""
                      className="fluid-image"
                    />
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Tài Khoản"
                    name="userid"
                    value={formValue.userid} onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Mật khẩu *
                    <img
                      src={require('../../../../assets/icon-password.jpg')}
                      alt=""
                      className="fluid-image"
                    />
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Mật khẩu"
                    name="password"
                    value={formValue.password} onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Họ và tên *
                    <img
                      src={require('../../../../assets/icon-user.jpg')}
                      alt=""
                      className="fluid-image"
                    />
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Tài Khoản"
                    name="realname"
                    value={formValue.realname} onChange={handleInput}
                  />
                </div>
                <div className="form-group box-group__item left">
                  <label>
                    Nhóm *
                    <img
                      src={require('../../../../assets/icn-group.png')}
                      alt=""
                      className="fluid-image"
                    />
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Nhóm"
                    name="user_group"
                    value={formValue.user_group} onChange={handleInput}
                  />
                  {/* <SelectCustom /> */}
                </div>
                <div className="form-group box-group__item left">
                  <label>
                    Quyền Truy cập *
                    <img
                      src={require('../../../../assets/authorization.png')}
                      alt=""
                      className="fluid-image"
                    />
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Quyền Truy cập"
                    name="authority"
                    value={formValue.authority} onChange={handleInput}
                  />

                  {/* <SelectCustom /> */}
                </div>
                <div className="wrp-button">
                  <button className="btn btn--green" type="submit">Xác nhận</button>
                  <button className="btn btn--orange">Hủy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
