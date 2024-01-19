import { useEffect, useState } from "react";
import { Heading2 } from "../../components/Heading";
import axios from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { isValidUserEdit } from "../../components/Validate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UserEdit() {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {id} = useParams();
  const [formValue, setFormValue] = useState({userid: '', password: '', passwordNew: '', password_confirm: '', realname: '', authority: '', user_group: '' });
  // const [passwordNew, setPasswordNew] = useState('');
  const [message, setMessage] = useState('');
  const handleInput = (e) => {
		setFormValue({...formValue, [e.target.name]:e.target.value})
	}

  useEffect(() => {
    axiosPrivate.get('users/edit/'+id).then(response => {
      setFormValue(response.data);
    })
  }, [])

  const handleSubmit = async(e) => {
		e.preventDefault();
    const validationErrors = isValidUserEdit({...formValue})
    if(validationErrors === true) {
      const formData = {id: id, userid:formValue.userid, password:formValue.password, passwordNew:formValue.passwordNew, realname:formValue.realname, authority:formValue.authority, user_group:formValue.user_group}
		const res = await axiosPrivate.post("users/update", formData);
    const res2 = await axiosPrivate.get("users/detail/"+formValue.userid);

    if(res.data.success){
      setMessage(res.data.success);
      setTimeout(() => {
        const isLoggedIn = localStorage.getItem('login');
        const roles = res2.data.authority_name;
        const users = {
          "id": res2.data.id,
          "userid": res2.data.userid,
          "realname": res2.data.realname,
          "roles": res2.data.authority_name,
          "user_group": res2.data.group_name,
          "user_group_id": res2.data.user_group,
        }
        localStorage.setItem('users', JSON.stringify(users));
        setAuth({ isLoggedIn, roles, users });
        navigate('/users/detail/'+formValue.userid);
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
		axiosPrivate.get('authority/').then((response) => {
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
		axiosPrivate.get('groups/').then((response) => {
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
										name="userid"
										value={formValue.userid} onChange={handleInput}
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
                  value={formValue.passwordNew} onChange={handleInput}
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
										value={formValue.password_confirm} onChange={handleInput} placeholder="Nhập lại mật khẩu"
									/>
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
