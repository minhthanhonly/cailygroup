import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import TimeDisplayButton from './TimeDisplayButton';

export const Dashboard = () => {
  const [currentHour, setCurrentHour] = useState(getFormattedHour());
  const [currentMinute, setCurrentMinute] = useState(getFormattedMinute());
  const [currentSecond, setCurrentSecond] = useState(getFormattedSecond());
  const [currentDay, setCurrentDay] = useState(getDayOfWeek());

  function getFormattedHour() {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, '0');
    return hours;
  }

  function getFormattedMinute() {
    const today = new Date();
    const mins = today.getMinutes().toString().padStart(2, '0');
    return mins;
  }

  function getFormattedSecond() {
    const today = new Date();
    const secs = today.getSeconds().toString().padStart(2, '0');
    return secs;
  }

  function getDayOfWeek() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const dayOfWeek = today.getUTCDay();
    return daysOfWeek[dayOfWeek];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(getFormattedHour());
      setCurrentMinute(getFormattedMinute());
      setCurrentSecond(getFormattedSecond());
      setCurrentDay(getDayOfWeek());
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <div className="Dashboard-time">
          <div className="Dashboard-time--content">
            <p>
              {currentDay}
              <span>day</span>
            </p>
            :
            <p>
              {currentHour}
              <span>hour</span>
            </p>
            :
            <p>
              {currentMinute}
              <span>munite</span>
            </p>
            :
            <p>
              {currentSecond}
              <span>second</span>
            </p>
          </div>
        </div>
        <h4>Thời gian làm việc hôm nay</h4>
        <div className="Dashboard-action">
          <div className="Dashboard-action--start">
            <p>Bắt đầu</p>
            <TimeDisplayButton
              initialImage={require('../../assets/images/icon-play.png')}
            />
          </div>
          <div className="Dashboard-action--pause">
            <p>Tạm ngưng</p>
            <button className="Dashboard-action--circle">
              <img
                src={require('../../assets/images/icon-pause.png')}
                alt=""
                className="fluid-image"
              />
            </button>
          </div>
          <div className="Dashboard-action--end">
            <p>Kết thúc</p>
            <TimeDisplayButton
              initialImage={require('../../assets/images/icon-check.png')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
