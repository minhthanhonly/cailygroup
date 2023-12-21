import { useState } from "react";
import { AddEditMember } from "../../components/Form/Form";
import { Heading2 } from "../../components/Heading";
import { SelectCustom } from "../../components/Table/SelectCustom";
import axios from "axios";

export const UserAdd = () => {
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [realname, setRealname] = useState('');
  const [authority, setAuthority] = useState('');
  const [user_group, setUserGroup] = useState('');
  const [addSuccess, setAddSuccess] = useState<boolean | null>(null);

  const handleAddData = () => {
    // Gọi API để thêm dữ liệu vào PHP bằng axios
    axios.post('http://cailygroup.com/users/add', { userid, password, realname, authority, user_group })
      .then(response => setAddSuccess(response.data.success))
      .catch(error => console.error('Lỗi khi thêm dữ liệu:', error));
  };

  return (
    <>
      <Heading2 text="Thêm thành viên" />
      <div className="form-user form">
        <div className="form-content">
          <div className="row">
            <div className="col-6">
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
                  value={userid} onChange={(e) => setUserId(e.target.value)}
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
                <SelectCustom />
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
                <SelectCustom />
              </div>
              <div className="wrp-button">
                <button className="btn btn--green" onClick={handleAddData}>Xác nhận</button>
                <button className="btn btn--orange">Hủy</button>
              </div>
              {addSuccess !== null && (
                <p>{addSuccess ? 'Dữ liệu đã được thêm thành công' : 'Lỗi khi thêm dữ liệu'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};
