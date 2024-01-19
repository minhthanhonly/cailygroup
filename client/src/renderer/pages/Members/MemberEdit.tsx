import { useEffect, useState } from "react";
import { Heading2 } from "../../components/Heading";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { isValidUserEdit } from "../../components/Validate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MemberEdit() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {id} = useParams();
  const [initialValue, setInitialValue] = useState('');
  const [formValue, setFormValue] = useState({userid: '', password: '', passwordNew: '', password_confirm: '', realname: '', authority: '', user_group: '' });
  const [passwordNew, setPasswordNew] =  useState('');
  const [message, setMessage] = useState('');
  const handleInput = (e) => {
		setFormValue({...formValue, [e.target.name]:e.target.value})
	}

  const fetchUsersById = async function() {
    const res = await axiosPrivate.get('users/edit/'+id);
    setFormValue(res.data);
  }

  useEffect(() => {
    fetchUsersById();
  },[])

  const handleCancel = () => {
    fetchUsersById();
    setPasswordNew(initialValue);
  }

  // useEffect(() => {
  //   axios.get('users/edit/'+id).then(response => {
  //     setFormValue(response.data);

  //     console.log(formValue);
  //   })
  // }, [])

  const handleSubmit = async(e) => {
		e.preventDefault();
    const validationErrors = isValidUserEdit({...formValue})
    if(validationErrors === true) {
      const formData = {id: id, userid:formValue.userid, password:formValue.password, passwordNew:formValue.passwordNew, realname:formValue.realname, authority:formValue.authority, user_group:formValue.user_group}
      const res = await axiosPrivate.post("users/update", formData);

      if(res.data.success){
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
		id: string,
		authority_name: string,
	}
	const [listOfAuthority, setListOfAuthority] = useState<FieldAuthority[] | []>([]);

	useEffect(() => {
		axiosPrivate.get('authority').then((response) => {
			setListOfAuthority(response.data);
		}).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
	}, [])

	let DataAuthority: FieldAuthority[] = [];
	for (let i = 0; i < listOfAuthority.length; i++) {
		DataAuthority.push({
			id: `${listOfAuthority[i].id}`,
			authority_name: `${listOfAuthority[i].authority_name}`
		});
	}

  /*
  *
  * GET DATA FROM GROUPS TABLE
  *
  */
	type FieldGroups = {
		id: string,
		group_name: string,
	}
	const [listOfGroups, setListOfGroups] = useState<FieldGroups[] | []>([]);

	useEffect(() => {
		axiosPrivate.get('groups').then((response) => {
			setListOfGroups(response.data);
		}).catch(error => console.error('Lỗi khi lấy dữ liệu:', error))
	}, [])

	let DataGroups: FieldGroups[] = [];
	for (let i = 0; i < listOfGroups.length; i++) {
		DataGroups.push({
			id: `${listOfGroups[i].id}`,
			group_name: `${listOfGroups[i].group_name}`
		});
	}

	return (
		<>
			<Heading2 text="Sửa thành viên" />
			{message=='' ? '' : <div className="box-bg"><p className="bg bg-green">{message}</p></div>}
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
                  value={formValue.userid} readOnly
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
                  value={formValue.realname} onChange={handleInput}
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
                  <select name="user_group" onChange={handleInput}>
                    <option value="-1">--------------------------- Chọn nhóm ---------------------------</option>
                    {DataGroups.map((value, index) => (
                      <option value={value.id} key={index} selected={value.id == formValue.user_group}>{value.group_name}</option>
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
                <div className="select__box group" onChange={handleInput}>
                  <select name="authority">
                    <option value="-1">-------------------- Chọn quyền truy cập --------------------</option>
                    {DataAuthority.map((value, index) => (
                      <option value={value.id} key={index} selected={value.id == formValue.authority}>{value.authority_name}</option>
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
                  value={formValue.password} readOnly
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
                  name="passwordNew" id="passwordNew" defaultValue={passwordNew} onChange={(event) => {(event.target.value)}}
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
										defaultValue={formValue.password_confirm} onChange={handleInput} placeholder="Nhập lại mật khẩu"
									/>
								</div>
              <div className="wrp-button">
                <button className="btn btn--green" type="submit" onClick={handleSubmit}>Xác nhận</button>
                <button className="btn btn--orange" onClick={handleCancel}>Hủy</button>
              </div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default MemberEdit;
