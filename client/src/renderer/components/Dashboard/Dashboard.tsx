import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.scss';
import { useTimeContext } from '../../context/TimeProvider';
import DashboardTime from './DashboardTime';
import CardStartTime from '../Card/CardStartTime';
import CardDelayTime from '../Card/CardDelayTime';
import CardEndTime from '../Card/CardEndTime';

function Dashboard() {
  const { startTime, setStartTime } = useTimeContext();
  const { delayTime, setDelayTime } = useTimeContext();
  const { endTime, setEndTime } = useTimeContext();

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  /*
  *
  * BẤM GIỜ BẮT ĐẦU
  *
  */
  const handleStart = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      const hours = new Date(datetime).getHours();
      const minutes = new Date(datetime).getMinutes();
      const sHours = String(hours).padStart(2, '0');
      const sMinutes = String(minutes).padStart(2, '0');

      setStartTime({sHours, sMinutes});

    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };

  /*
  *
  * BẤM GIỜ TẠM NGƯNG
  *
  */
  const handleDelay = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      const hours = new Date(datetime).getHours();
      const minutes = new Date(datetime).getMinutes();
      const dHours = String(hours).padStart(2, '0');
      const dMinutes = String(minutes).padStart(2, '0');

      setDelayTime({dHours, dMinutes});

    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };

  /*
  *
  * BẤM GIỜ KẾT THÚC
  *
  */
  const handleEnd = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      const hours = new Date(datetime).getHours();
      const minutes = new Date(datetime).getMinutes();
      const eHours = String(hours).padStart(2, '0');
      const eMinutes = String(minutes).padStart(2, '0');

      setEndTime({eHours, eMinutes});

    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <DashboardTime/>
        <h4>Thời gian làm việc hôm nay</h4>
          <div className="Dashboard-action">
            <div className="Dashboard-action--start">
              <p>Bắt đầu</p>
              <button className="Dashboard-action--circle" onClick={handleStart}>
                <img src={require('../../../../assets/icon-play.png')} alt="" className="fluid-image" />
              </button>
              <CardStartTime/>
            </div>
            <div className="Dashboard-action--pause">
              <p>Tạm ngưng</p>
              <button className="Dashboard-action--circle" onClick={handleDelay}>
                <img src={require('../../../../assets/icon-pause.png')} alt="" className="fluid-image" />
              </button>
              <CardDelayTime/>
            </div>
            <div className="Dashboard-action--end">
              <p>Kết thúc</p>
              <button className="Dashboard-action--circle" onClick={handleEnd}>
                <img src={require('../../../../assets/icon-check.png')} alt="" className="fluid-image" />
              </button>
              <CardEndTime/>
            </div>
          </div>
      </div>
    </div>
  );
};


export default Dashboard;
