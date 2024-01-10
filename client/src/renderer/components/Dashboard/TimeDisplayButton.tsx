import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardTime from '../Card/Card';
import { Console } from 'console';
import useTime from '../../hooks/useTime';



interface TimeDisplayButtonProps {
  type: string;
  initialImage: string;
  sHours: string;
  sMinutes: string;
  onButtonClick?: () => void;
}

const TimeDisplayButton: React.FC<TimeDisplayButtonProps> = ({
  type,
  initialImage,
  sHours,
  sMinutes,
  onButtonClick,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [buttonImage, setButtonImage] = useState(initialImage);
  const [startHours, setStartHours] = useState(sHours);
  const [startMinutes, setStartMinutes] = useState(sMinutes);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);

  // const { state } = useTime();





  // onButtonClick = () => {
  //   // renderTime();
  //   // console.log(state.startTimeH);
  // }


  // const fetchCurrentTime = async () => {
  //   try {
  //     const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
  //     const { datetime } = response.data;
  //     setCurrentTime(datetime);
  //   } catch (error) {
  //     console.error('Lỗi khi lấy thời gian hiện tại:', error);
  //   }
  // };

  useEffect(() => {

  }, []); // useEffect chỉ chạy một lần sau khi component mount


  // {state} = useTime();
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);


  return (
    <>
      <button className="Dashboard-action--circle" onClick={onButtonClick} disabled={isButtonActive}>
        <img src={buttonImage} alt="" className="fluid-image" />
      </button>
      <CardTime/>
    </>
  );
};

export default TimeDisplayButton;
