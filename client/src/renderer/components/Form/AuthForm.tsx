import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import './From.scss';
import { ChangeEvent, useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function FormLogin(){
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    switch(type){
      case "userid":
        setError("");
        setUserId(e.target.value);
        if(e.target.value === ''){
          setError("Vui lòng điền tên đăng nhập");
        }
        break;
      case "password":
        setError("");
        setPassword(e.target.value);
        if(e.target.value === ''){
          setError("Vui lòng điền mật khẩu đăng nhập");
        }
        break;
      default:
    }
  }

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(userid !== "" && password !== ""){
      const formData = {userid:userid, password:password}
      const res = await axios.post("login", formData);
      const res2 = await axios.get("users/detail/"+userid);
      if(res.data.success === 'error'){
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
      } else {
        setMsg('Đăng nhập thành công. Đang chuyển hướng...');
        setTimeout(() => {
          localStorage.setItem('login', 'true');
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
          navigate('/dashboard', { replace: true });
        }, 1500);
      }
    } else if(userid !== "") {
      setError("Vui lòng điền mật khẩu đăng nhập");
    } else if(password !== "") {
      setError("Vui lòng điền tên đăng nhập");
    } else {
      setError("Vui lòng điền tên và mật khẩu đăng nhập");
    }
  }

  return (
    <div className="form-login">
      <div className="form">
        <div className="form-login--logo">
          <img
            src={require('../../../../assets/logo-site.png')}
            alt=""
            className="fluid-image"
          />
          <h3>SMART IDEAS FOR A BETTER LIFE </h3>
        </div>
        <form onSubmit={handleSubmit} method="POST">
          <div className="form-content">
            {error=='' ? '' : <div className="box-bg mb20"><p className="bg bg-red">{error}</p></div>}
            {msg=='' ? '' : <div className="box-bg mb20"><p className="bg bg-green">{msg}</p></div>}
            <h2 className="form-login--title">Đăng Nhập</h2>
            <div className="form-group">
              <input className="form-input" name="userid" type="text" placeholder="Tài Khoản" onChange={(e) => handleInput(e, "userid")} />
            </div>
            <div className="form-group">
              <input className="form-input" name="password" type="password" placeholder="Mật Khẩu" onChange={(e) => handleInput(e, "password")}/>
            </div>
            <div className="center">
              <button className="btn" type="submit">Đăng Nhập</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin
