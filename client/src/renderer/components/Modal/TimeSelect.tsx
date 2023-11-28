import React, { useState, useEffect } from 'react';
import { format, addHours, addMinutes, setHours, setMinutes } from 'date-fns';

const TimePickerButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [inputValue, setInputValue] = useState('08:00'); // Giá trị mặc định
  const [tempHours, setTempHours] = useState(8); // Giá trị giờ tạm thời
  const [tempMinutes, setTempMinutes] = useState(0); // Giá trị phút tạm thời

  useEffect(() => {
    const updatedTime = setHours(
      setMinutes(selectedTime, tempMinutes),
      tempHours,
    );
    if (!selectedTime || updatedTime.getTime() !== selectedTime.getTime()) {
      setSelectedTime(updatedTime);
    }
  }, [tempHours, tempMinutes, selectedTime]);

  const openModal = () => {
    setModalOpen(true);
    setTempHours(selectedTime.getHours());
    setTempMinutes(selectedTime.getMinutes());
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increaseHour = () => {
    setTempHours((prevHours) => prevHours + 1);
  };

  const decreaseHour = () => {
    setTempHours((prevHours) => prevHours - 1);
  };

  const increaseMinute = () => {
    const newMinutes = tempMinutes + 5;
    setTempMinutes(newMinutes >= 60 ? newMinutes - 60 : newMinutes);
  };

  const decreaseMinute = () => {
    const newMinutes = tempMinutes - 5;
    setTempMinutes(newMinutes < 0 ? newMinutes + 60 : newMinutes);
  };

  const handleSetTime = () => {
    setInputValue(
      format(
        setHours(setMinutes(selectedTime, tempMinutes), tempHours),
        'HH:mm',
      ),
    );
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>{inputValue}</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div>
              <button onClick={decreaseHour}>-</button>
              <span>{tempHours}</span>
              <button onClick={increaseHour}>+</button>
            </div>
            <div>
              <button onClick={decreaseMinute}>-</button>
              <span>{tempMinutes}</span>
              <button onClick={increaseMinute}>+</button>
            </div>
            <button onClick={handleSetTime}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerButton;
