import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import './DefaultLayout.scss';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

export default function DefaultLayout() {
  const { setAuth } = useAuth();

  /*
  *
  * LOGOUT ỨNG DỤNG SAU KHOẢNG THỜI GIAN CHỜ
  *
  */
  // useEffect(() => {
  //   // Lấy thời gian hiện tại
  //   const currentTime = new Date().getTime();

  //   // Đặt khoảng thời gian chờ
  //   const waitTime = 2 * 60 * 1000;

  //   // Tính thời gian khi nào phải xóa dữ liệu
  //   const expirationTime = currentTime + waitTime;
  //   localStorage.setItem('expirationTime', expirationTime.toString());

  //   // Đặt timeout để xóa thông tin đăng nhập sau khoảng thời gian chờ
  //   const timeoutId = setTimeout(() => {
  //     // Lấy thời gian hiện tại
  //     const currentTime = new Date().getTime();

  //     // Lấy thời gian khi nào phải xóa từ localStorage
  //     const storedExpirationTime = localStorage.getItem('expirationTime');

  //     // So sánh với thời gian hiện tại và xóa thông tin đăng nhập nếu đã hết hạn
  //     if (storedExpirationTime && currentTime >= parseInt(storedExpirationTime, 10)) {
  //       localStorage.removeItem('users');
  //       localStorage.setItem('login', 'false');
  //       const isLoggedIn = localStorage.getItem('login');
  //       setAuth({isLoggedIn});
  //       localStorage.removeItem('expirationTime');
  //     }
  //   }, waitTime);
  //   return () => clearTimeout(timeoutId);
  // }, []) // useEffect chỉ chạy một lần sau khi component mount
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="container">
        <div className="content"><Outlet/></div>
      </div>
    </div>
  );
};
