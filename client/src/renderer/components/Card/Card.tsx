import React from 'react';
import { useTimeContext } from '../../context/TimeProvider';
import './Card.scss';



const CardTime: React.FC<{ type: string }> = ({type}) => {
  const { state, dispatch } = useTimeContext();
  const isStart = state.type === type;

  return (
    <>
      {isStart && <div className="card-time">
        <div className="card-time--hour">
          <p>{type}</p>

          <small>hours</small>
          <input
            value={state.sHours} onChange={(e) => (e.target.value)}
          />
        </div>
        :
        <div className="card-time--minute">
          <small>minutes</small>
          <input
            value={state.sMinutes} onChange={(e) => (e.target.value)}
          />
        </div>
      </div>}
    </>
  );
};

export default CardTime;
