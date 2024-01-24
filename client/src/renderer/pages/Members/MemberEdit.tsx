import React, { useEffect, useState } from 'react';
import { Heading2 } from '../../components/Heading';
import { useNavigate, useParams } from 'react-router-dom';
import { isValidUserEdit } from '../../components/Validate';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

function MemberEdit() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState('');
  const [formValue, setFormValue] = useState({
    userid: '',
    password: '',
    realname: '',
  });
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [selectedValue, setSelectedValue] = useState({
    authority: '',
    user_group: '',
  });

  const [message, setMessage] = useState('');

  const handleInput = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue({ ...selectedValue, [event.target.name]: event.target.value });
  }

  const fetchUsersById = async function () {
    const res = await axiosPrivate.get('users/edit/' + id);
    setFormValue(res.data);
    setSelectedValue({...selectedValue, authority: res.data.authority, user_group: res.data.user_group})
  };

  useEffect(() => {
    fetchUsersById();
  }, []);

  const handleCancel = () => {
    fetchUsersById();
    setInitialValue('');
    setPasswordNew(initialValue);
    setPasswordConfirm(initialValue);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const validationErrors = isValidUserEdit({ ...formValue }, passwordNew, passwordConfirm);
    if (validationErrors === true) {
      const formData = {
        id: id,
        userid: formValue.userid,
        password: formValue.password,
        passwordNew: passwordNew,
        realname: formValue.realname,
        authority: selectedValue.authority,
        user_group: selectedValue.user_group,
      };

      const res = await axiosPrivate.post('users/update', formData);
      const res2 = await axiosPrivate.get("users/detail/"+formValue.userid);

      if (res.data.success) {
        setMessage(res.data.success);
        setTimeout(() => {
          navigate('/members');
        }, 2000);
      }
    }
  }

  /*
   *
   * GET DATA FROM AUTHORITY TABLE
   *
   */
  type FieldAuthority = {
    id: string;
    authority_name: string;
  };
  const [listOfAuthority, setListOfAuthority] = useState<FieldAuthority[] | []>(
    [],
  );

  useEffect(() => {
    axiosPrivate
      .get('authority')
      .then((response) => {
        setListOfAuthority(response.data);
      })
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  let DataAuthority: FieldAuthority[] = [];
  for (let i = 0; i < listOfAuthority.length; i++) {
    DataAuthority.push({
      id: `${listOfAuthority[i].id}`,
      authority_name: `${listOfAuthority[i].authority_name}`,
    });
  }

  /*
   *
   * GET DATA FROM GROUPS TABLE
   *
   */
  type FieldGroups = {
    id: string;
    group_name: string;
  };
  const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

  useEffect(() => {
    axiosPrivate
      .get('groups')
      .then((response) => {
        setListOfGroups(response.data);
      })
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  let DataGroups: FieldGroups[] = [];
  for (let i = 0; i < listOfGroups.length; i++) {
    DataGroups.push({
      id: `${listOfGroups[i].id}`,
      group_name: `${listOfGroups[i].group_name}`,
    });
  }

  return (
    <>
      <Heading2 text="Sửa thành viên" />
      {message == '' ? (
        ''
      ) : (
        <div className="box-bg">
          <p className="bg bg-green">{message}</p>
        </div>
      )}
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
                  name="userid"
                  value={formValue.userid}
                  readOnly
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
                  name="realname"
                  value={formValue.realname}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label>
                  Nhóm *
                  <img
                    src={require('../../../../assets/icn-group.png')}
                    alt=""
                    className="fluid-image"
                  />
                </label>
                <div className="select__box group">
                  <select value={selectedValue.user_group} name="user_group" onChange={handleChange}>
                    <option value="-1">
                      --------------------------- Chọn nhóm
                      ---------------------------
                    </option>
                    {DataGroups.map((value, index) => (
                      <option
                        value={value.id}
                        key={index}
                        // selected={value.id == formValue.user_group}
                      >
                        {value.group_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>
                  Quyền truy cập *
                  <img
                    src={require('../../../../assets/authorization.png')}
                    alt=""
                    className="fluid-image"
                  />
                </label>
                <div className="select__box group">
                  <select value={selectedValue.authority} name="authority" onChange={handleChange}>
                    <option value="-1">
                      -------------------- Chọn quyền truy cập
                      --------------------
                    </option>
                    {DataAuthority.map((value, index) => (
                      <option
                        value={value.id}
                        key={index}
                        // selected={value.id == formValue.authority}
                      >
                        {value.authority_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h3 className="hdglv3 left">Thay đổi mật khẩu</h3>
              <div className="form-group">
                <label>
                  Mật khẩu hiện tại
                  <img
                    src={require('../../../../assets/icon-password.jpg')}
                    alt=""
                    className="fluid-image"
                  />
                </label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={formValue.password}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>
                  Mật khẩu mới
                  <img
                    src={require('../../../../assets/icon-password.jpg')}
                    alt=""
                    className="fluid-image"
                  />
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="passwordNew"
                  id="passwordNew"
                  value={passwordNew}
                  onChange={(event) => setPasswordNew(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>
                  Mật khẩu (Xác nhận) *
                  <img
                    src={require('../../../../assets/icon-password.jpg')}
                    alt=""
                    className="fluid-image"
                  />
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="password_confirm"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
              <div className="wrp-button">
                <button
                  className="btn btn--green"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Xác nhận
                </button>
                <button className="btn btn--orange" onClick={handleCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberEdit;
