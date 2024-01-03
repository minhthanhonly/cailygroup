import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInput = (e, type) => {
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(userid !== "" && password !== ""){
      const formData = {userid:userid, password:password}
      const res = await axios.post("http://cailygroup.com/login", formData);
      if(res.data.success === 'Mật khẩu không hợp lệ' || res.data.success === 'Tên đăng nhập không hợp lệ'){
        setError(res.data.success);
      } else {
        setTimeout(() => {
          navigate('/dashboard', { state: userid });
        }, 1000);
      }
    } else {
      setError("Vui lòng điền tên và mật khẩu đăng nhập");
    }
  }

  return (
  <>
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
            <h2 className="form-login--title">Đăng Nhập</h2>
            <div className="form-group">
              <input className="form-input" name="userid" type="text" placeholder="Tài Khoản" onChange={(e) => handleInput(e, "userid")} />
            </div>
            <div className="form-group">
              <input className="form-input" name="password" type="text" placeholder="Mật Khẩu" onChange={(e) => handleInput(e, "password")}/>
            </div>
            <div className="center">
              <button className="btn" type="submit">Đăng Nhập</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};
