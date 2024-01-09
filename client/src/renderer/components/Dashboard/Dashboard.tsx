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
  const [startHours, setStartHours] = useState('');
  const [startMinutes, setStartMinutes] = useState('');

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

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);
  const handleStart = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      const hours = new Date(datetime).getHours();
      const minutes = new Date(datetime).getMinutes();

      const timecard_open = {
        "hours": String(hours).padStart(2, '0'),
        "minutes": String(minutes).padStart(2, '0'),
      }
      localStorage.setItem('timecard_open', JSON.stringify(timecard_open));
      const getTimecardOpen = JSON.parse(localStorage.getItem('timecard_open') || '{}');

      setStartHours(getTimecardOpen.hours);
      setStartMinutes(getTimecardOpen.minutes);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };

  useEffect(() => {
    // if (startHours > 22) {
    //   localStorage.removeItem('timecard_open');
    //   setIsButtonActive(false);
    // }

    const getTimecardOpen = JSON.parse(localStorage.getItem('timecard_open') || '{}');
    if(getTimecardOpen) {
      setStartHours(getTimecardOpen.hours);
      setStartMinutes(getTimecardOpen.minutes);
    }
    console.log('y');
  }, [isButtonActive])

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
            <TimeDisplayButton type='start' onButtonClick={handleStart} sHours={startHours} sMinutes={startMinutes}
              initialImage={require('../../../../assets/icon-play.png')}
            />
          </div>
          <div className="Dashboard-action--pause">
            <p>Tạm ngưng</p>
            <TimeDisplayButton sHours='' sMinutes=''
              initialImage={require('../../../../assets/icon-pause.png')}
            />
          </div>
          <div className="Dashboard-action--end">
            <p>Kết thúc</p>
            <TimeDisplayButton sHours='' sMinutes=''
              initialImage={require('../../../../assets/icon-check.png')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
