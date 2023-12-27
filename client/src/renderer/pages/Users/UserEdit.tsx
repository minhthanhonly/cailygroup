import { useEffect, useState } from "react";
import { Heading2 } from "../../components/Heading";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserEdit() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [values, setValues] = useState({
    id: id,
    userid: '',
    password: '',
    realname: '',
    authority: '',
    user_group: ''
  });

  useEffect(() => {
    axios.get('http://cailygroup.com/users/edit/'+id).then(response => {
      setValues({...values, userid: response.data.userid, password: response.data.password, realname: response.data.realname, authority: response.data.authority, user_group: response.data.user_group});
      console.log(response.data);
    })
  }, [])

	return (
		<>
			<Heading2 text="Thêm thành viên" />
			{/* {message=='' ? '' : <div className="box-bg"><p className="bg bg-green">{message}</p></div>} */}
			<div className="form-user form">
				<div className="form-content">
					<div className="row">
						<div className="col-6">
							<form method="POST">
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
										value={values.userid} onChange={e => setValues({...values, userid: e.target.value})}
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
										name="password"
										value={values.password} onChange={e => setValues({...values, userid: e.target.value})}
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
										value={values.realname} onChange={e => setValues({...values, userid: e.target.value})}
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
										<select name="user_group" value={values.user_group} onChange={e => setValues({...values, userid: e.target.value})}>
											<option value="-1">--------------------------- Chọn nhóm ---------------------------</option>
											{/* {DataGroups.map((value, index) => (
												<option value={value.id} key={index}>{value.group_name}</option>
											))} */}
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
										<select name="authority" value={values.authority} onChange={e => setValues({...values, userid: e.target.value})}>
											<option value="-1">-------------------- Chọn quyền truy cập --------------------</option>
											{/* {DataAuthority.map((value, index) => (
												<option value={value.id} key={index}>{value.authority_name}</option>
											))} */}
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
