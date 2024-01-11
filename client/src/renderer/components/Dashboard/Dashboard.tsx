import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import './Dashboard.scss';
import { useTimeContext } from '../../context/TimeProvider';
import DashboardTime from './DashboardTime';

function Dashboard() {
  const { startTime, setStartTime } = useTimeContext();

  const [isID, setId] = useState(null);
  const handleStart = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      let { datetime } = response.data;
      let currentHour = new Date(datetime).getHours();
      let currentMinutes = new Date(datetime).getMinutes();
      let currentYear = new Date(datetime).getFullYear();
      let currentMonth = String(new Date(datetime).getMonth() + 1).padStart(
        2,
        '0',
      );
      let currentDate = String(new Date(datetime).getDate()).padStart(2, '0');
      let timecard_open_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;

      const dataTimeCard = {
        timecard_year: currentYear,
        user_id: usersID,
        timecard_month: currentMonth,
        timecard_day: currentDate,
        timecard_date: `${currentDate}-${currentMonth}-${currentYear}`,
        timecard_temp: 0,
        owner: 'admin',
      };
      console.log(dataTimeCard);
      const responseTimeCard = await axios.post(
        'http://cailygroup.com/timecards/add',
        { dataTimeCard },
      );

      console.log(responseTimeCard.data);
      console.log(responseTimeCard.data.id_timecard);

      setId(responseTimeCard.data.id_timecard);
      const dataTimeCardDetails = {
        id_groupwaretimecard: responseTimeCard.data.id_timecard,
        timecard_open: timecard_open_time,
        timecard_originalopen: timecard_open_time,
        timecard_timeinterval: '1:30',
        timecard_comment: '',
      };
      const responseTimeCardDetails = await axios.post(
        'http://cailygroup.com/timecarddetails/add',
        { dataTimeCardDetails },
      );

      console.log(responseTimeCardDetails.data);
    } catch (error) {
      console.error(
        'Lỗi khi lấy thời gian từ API hoặc gửi dữ liệu lên server:',
        error,
      );
    }
    const handleDelay = async () => {
      try {
      } catch (error) {}
    };
    const handleEnd = async () => {
      try {
      } catch (error) {}
    };
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <DashboardTime />
        <h4>Thời gian làm việc hôm nay</h4>
        <div className="Dashboard-action">
          <div className="Dashboard-action--start">
            <p>Bắt đầu</p>
            <button className="Dashboard-action--circle" onClick={handleStart}>
              <img
                src={require('../../../../assets/icon-play.png')}
                alt=""
                className="fluid-image"
              />
            </button>
            <div className="card-time">
              <div className="card-time--hour">
                <small>hours</small>
                <input
                  value={startTime.sHours}
                  onChange={(e) => e.target.value}
                />
              </div>
              :
              <div className="card-time--minute">
                <small>minutes</small>
                <input
                  value={startTime.sMinutes}
                  onChange={(e) => e.target.value}
                />
              </div>
            </div>
          </div>
          <div className="Dashboard-action--pause">
            <p>Tạm ngưng</p>
            <button className="Dashboard-action--circle">
              <img
                src={require('../../../../assets/icon-pause.png')}
                alt=""
                className="fluid-image"
              />
            </button>
            <div className="card-time">
              <div className="card-time--hour">
                <small>hours</small>
                <input
                  value={startTime.sHours}
                  onChange={(e) => e.target.value}
                />
              </div>
              :
              <div className="card-time--minute">
                <small>minutes</small>
                <input
                  value={startTime.sMinutes}
                  onChange={(e) => e.target.value}
                />
              </div>
            </div>
          </div>
          <div className="Dashboard-action--end">
            <p>Kết thúc</p>
            <button className="Dashboard-action--circle">
              <img
                src={require('../../../../assets/icon-check.png')}
                alt=""
                className="fluid-image"
              />
            </button>
            <div className="card-time">
              <div className="card-time--hour">
                <small>hours</small>
                <input
                  value={startTime.sHours}
                  onChange={(e) => e.target.value}
                />
              </div>
              :
              <div className="card-time--minute">
                <small>minutes</small>
                <input
                  value={startTime.sMinutes}
                  onChange={(e) => e.target.value}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
