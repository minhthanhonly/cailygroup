import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.scss';
import TimeDisplayButton from './TimeDisplayButton';

export const Dashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentHour, setCurrentHour] = useState<number>(0); // Đổi kiểu thành số
  const [currentMinute, setCurrentMinute] = useState<number>(0); // Đổi kiểu thành số
  const [currentSecond, setCurrentSecond] = useState<number>(0); // Đổi kiểu thành số
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await axios.get(
          'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
        );
        const data = response.data;

        // Tạo một đối tượng Date từ chuỗi thời gian
        const dateObject = new Date(data.datetime);

        // Trích xuất thứ, giờ, phút và giây
        const weekdays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        const formattedDay = weekdays[dateObject.getDay()];
        const formattedHour = dateObject.getHours();
        const formattedMinute = dateObject.getMinutes();
        const formattedSecond = dateObject.getSeconds();

        setCurrentDay(formattedDay);
        setCurrentHour(formattedHour);
        setCurrentMinute(formattedMinute);
        setCurrentSecond(formattedSecond);

        // Định dạng thời gian để hiển thị
        const formattedDateTime = `${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;

        setCurrentDateTime(formattedDateTime);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchTime();
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="Dashboard">
      <div className="Dashboard-content">
        <div className="Dashboard-time">
          <div className="Dashboard-time--content">
            <p>
              {/* {currentDateTime} */}

              {currentDay}
              <span>day</span>
            </p>
            :
            <p>
              {/* {currentHour} */}
              {String(currentHour).padStart(2, '0')}

              <span>hour</span>
            </p>
            :
            <p>
              {String(currentMinute).padStart(2, '0')}
              <span>munite</span>
            </p>
            :
            <p>
              {String(currentSecond).padStart(2, '0')}
              <span>second</span>
            </p>
          </div>
        </div>
        <h4>Thời gian làm việc hôm nay</h4>
        <div className="Dashboard-action">
          <div className="Dashboard-action--start">
            <p>Bắt đầu</p>
            <TimeDisplayButton
              initialImage={require('../../../../assets/icon-play.png')}
            />
          </div>
          <div className="Dashboard-action--pause">
            <p>Tạm ngưng</p>
            <TimeDisplayButton
              initialImage={require('../../../../assets/icon-pause.png')}
            />
            {/* <button className="Dashboard-action--circle">
              <img
                src={require('../../../../assets/icon-pause.png')}
                alt=""
                className="fluid-image"
              />
            </button> */}
          </div>
          <div className="Dashboard-action--end">
            <p>Kết thúc</p>
            <TimeDisplayButton
              initialImage={require('../../../../assets/icon-check.png')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
