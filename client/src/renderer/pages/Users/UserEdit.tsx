import { useEffect, useState } from "react";
import { Heading2 } from "../../components/Heading";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserEdit() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {id} = useParams();
  const [formValue, setFormValue] = useState({userid: '', password: '', realname: '', authority: '', user_group: '' });
  const [passwordNew, setPasswordNew] = useState('');
  const [message, setMessage] = useState('');
  const handleInput = (e) => {
		setFormValue({...formValue, [e.target.name]:e.target.value})
	}

  useEffect(() => {
    axios.get('http://cailygroup.com/users/edit/'+id).then(response => {
      setFormValue(response.data);
    })
  }, [])

  const handleSubmit = async(e) => {
		e.preventDefault();
		const formData = {id: id, userid:formValue.userid, password:formValue.password, passwordNew:passwordNew, realname:formValue.realname, authority:formValue.authority, user_group:formValue.user_group}
		const res = await axios.post("http://cailygroup.com/users/update", formData);
    const res2 = await axios.get("http://cailygroup.com/users/detail/"+formValue.userid);

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
        }
        localStorage.setItem('users', JSON.stringify(users));
        setAuth({ isLoggedIn, roles, users });
        navigate('/users/detail/'+formValue.userid);
      }, 2000);
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
		axios.get('http://cailygroup.com/authority/').then((response) => {
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
		axios.get('http://cailygroup.com/groups/').then((response) => {
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
										value={passwordNew} onChange={(event) => setPasswordNew(event.target.value)}
									/>
                  <input
										className="form-input"
										type="hidden"
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
