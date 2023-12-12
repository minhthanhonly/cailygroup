import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardTime from '../Card/Card';

interface TimeDisplayButtonProps {
  initialImage: string;
}

const TimeDisplayButton: React.FC<TimeDisplayButtonProps> = ({
  initialImage,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [buttonImage, setButtonImage] = useState(initialImage);
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  // const [endHours, setEndHours] = useState(0);
  // const [endMinutes, setEndMinutes] = useState(0);

  const fetchCurrentTime = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      setCurrentTime(datetime);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian hiện tại:', error);
    }
  };

  useEffect(() => {
    fetchCurrentTime();
  }, []); // useEffect chỉ chạy một lần sau khi component mount

  const handleClick = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const { datetime } = response.data;
      const hours = new Date(datetime).getHours();
      const minutes = new Date(datetime).getMinutes();

      setStartHours(hours);
      setStartMinutes(minutes);

      //  const formattedTime = `${startHours}:${startMinutes}`;
    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }

    // Example: Change the image when the button is clicked
    // setButtonImage(require('../../../../assets/icon-play.png'));
  };

  return (
    <>
      <button className="Dashboard-action--circle" onClick={handleClick}>
        <img src={buttonImage} alt="" className="fluid-image" />
      </button>
      <CardTime hours={startHours} minutes={startMinutes} />
    </>
  );
};

export default TimeDisplayButton;
