import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
      const response = await axios.get('https://worldtimeapi.org/api/ip');
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
      const response = await axios.get('https://worldtimeapi.org/api/ip');
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
    setButtonImage(require('../../assets/images/icon-play.png'));
  };

  return (
    <>
      <button className="Dashboard-action--circle" onClick={handleClick}>
        <img src={buttonImage} alt="" className="fluid-image" />
      </button>
      <b>{String(startHours).padStart(2, '0') }:{ String(startMinutes).padStart(2, '0')}</b>
    </>
  );
};

export default TimeDisplayButton;
