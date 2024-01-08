import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import './From.scss';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function FormLogin(){
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   // Lấy giá trị 'login' từ localStorage
  //   const isLoggedIn = localStorage.getItem('login');

  //    // Kiểm tra giá trị
  //   if (isLoggedIn === 'true') {
  //     // Người dùng đã đăng nhập
  //     navigate ('/dashboard');
  //   }
  //   setTimeout(() => {
  //     setMsg("");
  //   }, 1500);
  // }, [msg]);

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
      const res = await axios.post("http://cailygroup.com/login", formData);
      const res2 = await axios.get("http://cailygroup.com/users/detail/"+userid);
      if(res.data.success === 'Mật khẩu không hợp lệ' || res.data.success === 'Tên đăng nhập không hợp lệ'){
        setError(res.data.success);
      } else {
        setMsg(res.data.success);
        const roles = res2?.data?.authority_name;
        console.log(roles);
        setTimeout(() => {
          localStorage.setItem('login', 'true');
          localStorage.setItem('userid', userid);
          setAuth({ userid, password, roles});
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
            {/* <input type="hidden" value={} /> */}
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
