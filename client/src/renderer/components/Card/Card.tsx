import './Card.scss';
import React from 'react';

interface TimeProps {
  hours?: number;
  minutes?: number;
}

const CardTime: React.FC<TimeProps> = ({ hours = 0, minutes = 0 }) => {
  return (
    <div className="card-time">
      <div className="card-time--hour">
        <small>hours</small>
        {String(hours).padStart(2, '0')}
      </div>
      :
      <div className="card-time--munite">
        <small>munites</small>
        {String(minutes).padStart(2, '0')}
      </div>
    </div>
  );
};

export default CardTime;
