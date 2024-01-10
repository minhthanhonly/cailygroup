import { useTimeContext } from "../../context/TimeProvider";
import './Card.scss';

function CardEndTime(){
  const { endTime, setEndTime } = useTimeContext();
  return(
    <div className="card-time">
      <div className="card-time--hour">
        <small>hours</small>
        <input
          value={endTime.eHours} onChange={(e) => (e.target.value)}
        />
      </div>
      :
      <div className="card-time--minute">
        <small>minutes</small>
        <input
          value={endTime.eMinutes} onChange={(e) => (e.target.value)}
        />
      </div>
    </div>
  )
}

export default CardEndTime;
