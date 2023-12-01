import './Card.scss';

export const CardTime = () => {
  return (
    <div className="card-time">
      <div className="card-time--hour">
        <small>hours</small>0
      </div>
      :
      <div className="card-time--munite">
        <small>munites</small>00
      </div>
    </div>
  );
};
