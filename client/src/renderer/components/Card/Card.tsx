import React, { useState } from 'react';
import './Card.scss';

interface TimeProps {
  hours?: number;
  minutes?: number;
  onChange?: (hours: number, minutes: number) => void;
}

const CardTime: React.FC<TimeProps> = ({ hours = 0, minutes = 0, onChange }) => {
  const [editedHours, setEditedHours] = useState<string>(String(hours).padStart(2, '0'));
  const [editedMinutes, setEditedMinutes] = useState<string>(String(minutes).padStart(2, '0'));

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHours = e.target.value.slice(0, 2);
    newHours = Math.min(Math.max(parseInt(newHours, 10) || 0, 0), 23).toString();
    setEditedHours(newHours);

    if (onChange) {
      onChange(parseInt(newHours, 10) || 0, parseInt(editedMinutes, 10) || 0);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinutes = e.target.value.slice(0, 2);
    newMinutes = Math.min(Math.max(parseInt(newMinutes, 10) || 0, 0), 59).toString();
    setEditedMinutes(newMinutes);

    if (onChange) {
      onChange(parseInt(editedHours, 10) || 0, parseInt(newMinutes, 10) || 0);
    }
  };

  return (
    <div className="card-time">
      <div className="card-time--hour">
        <small>hours</small>
        <input
          value={editedHours}
          onChange={handleHoursChange}
        />
      </div>
      :
      <div className="card-time--minute">
        <small>minutes</small>
        <input
          value={editedMinutes}
          onChange={handleMinutesChange}
        />
      </div>
    </div>
  );
};

export default CardTime;