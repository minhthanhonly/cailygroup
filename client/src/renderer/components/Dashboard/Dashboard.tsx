import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from '../../api/axios';
import './Dashboard.scss';
import DashboardTime from './DashboardTime';

function Dashboard() {
  const [usersID, setUsersID] = useState();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users) {
    useEffect(() => {
      setUsersID(users.id);
      loadStart();
    }, [usersID]);
  }
  const [startTime, setStartTime] = useState<
    { hours: string; minutes: string } | undefined
  >(undefined);
  const [endTime, setEndTime] = useState<
    { hours: string; minutes: string } | undefined
  >(undefined);
  const [checkStart, setCheckStart] = useState(false);
  const [checkPause, setCheckPause] = useState(false);
  const [checkEnd, setCheckEnd] = useState(false);

  const loadStart = async () => {
    try {
      const response = await axios.get('timecards/load/' + usersID);
      console.log(response.data);

      if (response.data && response.data.timecard_close) {
        const timecardClose = response.data.timecard_close;
        console.log(response.data.timecard_close);
        const [hours, minutes] = timecardClose.split(':');
        setEndTime({ hours, minutes });
        setCheckEnd(true);
      }
      if (response.data && response.data.timecard_open) {
        const timecardOpen = response.data.timecard_open;
        const [hours, minutes] = timecardOpen.split(':');
        setStartTime({ hours, minutes });
        setCheckStart(true);
      } else {
        console.log('No timecard data found.');
      }
    } catch (error) {
      console.error('Error fetching timecards:', error);
    }
  };
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
      const responseTimeCard = await axios.post('timecards/add', {
        dataTimeCard,
      });
      const dataTimeCardDetails = {
        id_groupwaretimecard: responseTimeCard.data.id_timecard,
        timecard_open: timecard_open_time,
        timecard_originalopen: timecard_open_time,
        timecard_timeinterval: '1:30',
        timecard_comment: '',
      };
      const responseTimeCardDetails = await axios.post('timecarddetails/add', {
        dataTimeCardDetails,
      });
      loadStart();
      setCheckStart(true);
    } catch (error) {
      console.error(
        'Lỗi khi lấy thời gian từ API hoặc gửi dữ liệu lên server:',
        error,
      );
    }
  };
  const handleDelay = async () => {
    try {
    } catch (error) { }
  };
  const handleEnd = async () => {
    try {
      const res = await axios.get('timecards/load/' + usersID);
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      let { datetime } = response.data;
      let currentHour = new Date(datetime).getHours();
      let currentMinutes = new Date(datetime).getMinutes();
      let timecard_open_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;
      const dataTime = {
        id: res.data.id_groupwaretimecard,
        timecard_open: res.data.timecard_open,
        timecard_now: timecard_open_time,
      };
      const re = await axios.post('timecarddetails/update', { dataTime });
      console.log(re.data);

      loadStart();
      setCheckEnd(true);
    } catch (error) { }
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <DashboardTime />
        <h4>Thời gian làm việc hôm nay</h4>
        <div className="Dashboard-action">
          <div className="Dashboard-action--start">
            <p>Bắt đầu</p>
            {checkStart ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>Giờ</small>
                  <input
                    value={startTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>Phút</small>
                  <input
                    value={startTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <button
                className="Dashboard-action--circle"
                onClick={handleStart}
              >
                <img
                  src={require('../../../../assets/icon-play.png')}
                  alt=""
                  className="fluid-image"
                />
              </button>
            )}
          </div>
          <div className="Dashboard-action--pause">
            <p>Tạm ngưng</p>
            {checkPause ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>Giờ</small>
                  <input
                    value={endTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>Phút</small>
                  <input
                    value={endTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <button
                className="Dashboard-action--circle"
                onClick={handleDelay}
              >
                <img
                  src={require('../../../../assets/icon-pause.png')}
                  alt=""
                  className="fluid-image"
                />
              </button>
            )}
          </div>
          <div className="Dashboard-action--end">
            <p>Kết thúc</p>
            {checkEnd ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>Giờ</small>
                  <input
                    value={endTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>Phút</small>
                  <input
                    value={endTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <button className="Dashboard-action--circle" onClick={handleEnd}>
                <img
                  src={require('../../../../assets/icon-check.png')}
                  alt=""
                  className="fluid-image"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
