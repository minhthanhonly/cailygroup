import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
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
      const response = await axios.get(
        'http://cailygroup.com/timecards/load/' + usersID,
      );
      console.log(response.data);
      if (response.data && response.data.timecard_open) {
        const timecardClose = response.data.timecard_close;
        if (response.data.timecard_close) {
          console.log(response.data.timecard_close);
          const [hours, minutes] = timecardClose.split(':');
          setEndTime({ hours, minutes });
          setCheckEnd(true);
        }
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
      const responseTimeCard = await axios.post(
        'http://cailygroup.com/timecards/add',
        { dataTimeCard },
      );
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
      setCheckStart(true);
      loadStart();
    } catch (error) {
      console.error(
        'Lỗi khi lấy thời gian từ API hoặc gửi dữ liệu lên server:',
        error,
      );
    }
  };
  const handleDelay = async () => {
    try {
    } catch (error) {}
  };
  const handleEnd = async () => {
    try {
      const res = await axios.get(
        'http://cailygroup.com/timecards/load/' + usersID,
      );
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
      const re = await axios.post(
        'http://cailygroup.com/timecarddetails/update',
        { dataTime },
      );
      console.log(re.data);
      const timecardClose = res.data.timecard_Close;
      const [hours, minutes] = timecardClose.split(':');
      setEndTime({ hours, minutes });
      setCheckEnd(true);
      loadStart();
    } catch (error) {}
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <DashboardTime />
        <h4>Thời gian làm việc hôm nay</h4>
        <div className="Dashboard-action">
          <div className="Dashboard-action--start">
            {checkStart ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>hours</small>
                  <input
                    value={startTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>minutes</small>
                  <input
                    value={startTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <>
                <p>Bắt đầu</p>
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
              </>
            )}
          </div>
          <div className="Dashboard-action--pause">
            {checkPause ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>hours</small>
                  <input
                    value={endTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>minutes</small>
                  <input
                    value={endTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <>
                <p>Tạm ngưng</p>
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
              </>
            )}
          </div>
          <div className="Dashboard-action--end">
            {checkEnd ? (
              <div className="card-time">
                <div className="card-time--hour">
                  <small>hours</small>
                  <input
                    value={endTime?.hours || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
                :
                <div className="card-time--minute">
                  <small>minutes</small>
                  <input
                    value={endTime?.minutes || '00:00'}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
            ) : (
              <>
                <p>Kết thúc</p>
                <button
                  className="Dashboard-action--circle"
                  onClick={handleEnd}
                >
                  <img
                    src={require('../../../../assets/icon-check.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
