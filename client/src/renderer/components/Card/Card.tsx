import React, { useEffect, useState } from 'react';
import './Card.scss';
import { urlControl } from '../../routes/server';
import axios from 'axios';

interface TimeProps {
  type?: string;
  defaultHours?: string;
  defaultMinutes?: string;
  onChange?: (hours: number, minutes: number) => void;
}

const CardTime: React.FC<TimeProps> = ({ type, defaultHours = '00', defaultMinutes = '00', onChange }) => {
  const [editedHours, setEditedHours] = useState(defaultHours);
  const [editedMinutes, setEditedMinutes] = useState(defaultMinutes);

  useEffect(() => {
    // Cập nhật state khi nhận được dữ liệu mặc định mới từ props
    setEditedHours(defaultHours);
    setEditedMinutes(defaultMinutes);
  }, [defaultHours, defaultMinutes]);

  // const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let newHours = e.target.value.slice(0, 2);
  //   newHours = Math.min(Math.max(parseInt(newHours, 10) || 0, 0), 23).toString();
  //   console.log('New Hours:', newHours);
  //   setEditedHours(newHours);

  //   onChange && onChange(parseInt(newHours, 10) || 0, parseInt(editedMinutes, 10) || 0);
  // };

  // const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let newMinutes = e.target.value.slice(0, 2);
  //   newMinutes = Math.min(Math.max(parseInt(newMinutes, 10) || 0, 0), 59).toString();
  //   console.log('New Minutes:', newMinutes);
  //   setEditedMinutes(newMinutes);

  //   onChange && onChange(parseInt(editedHours, 10) || 0, parseInt(newMinutes, 10) || 0);
  // };



  // setIsTimerActive(true);

  return (
    <div className="card-time">
      <div className="card-time--hour">
        <small>hours</small>
        <input
          value={editedHours} onChange={(e) => (e.target.value)}
        />
      </div>
      :
      <div className="card-time--minute">
        <small>minutes</small>
        <input
          value={editedMinutes} onChange={(e) => (e.target.value)}
        />
      </div>
    </div>
  );
};

export default CardTime;
