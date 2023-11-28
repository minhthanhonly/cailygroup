import React, { useState } from 'react';

interface TimeDisplayButtonProps {
  initialImage: string;
}

const TimeDisplayButton: React.FC<TimeDisplayButtonProps> = ({
  initialImage,
}) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [buttonImage, setButtonImage] = useState(initialImage);

  const handleClick = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    setCurrentTime(formattedTime);

    // Example: Change the image when the button is clicked
    setButtonImage(require('../../assets/images/icon-play.png'));
  };

  return (
    <>
      <button className="Dashboard-action--circle" onClick={handleClick}>
        <img src={buttonImage} alt="" className="fluid-image" />
      </button>
      <b>{currentTime}</b>
    </>
  );
};

export default TimeDisplayButton;
