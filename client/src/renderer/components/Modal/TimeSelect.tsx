import React, { useState, useEffect } from 'react';
import { format, addHours, addMinutes, setHours, setMinutes } from 'date-fns';
import Modal from './Modal';

const TimePickerButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [tempHours, setTempHours] = useState(8);
  const [tempMinutes, setTempMinutes] = useState(0);

  useEffect(() => {
    const updatedTime = setHours(
      setMinutes(selectedTime, tempMinutes),
      tempHours,
    );
    if (!selectedTime || updatedTime.getTime() !== selectedTime.getTime()) {
      setSelectedTime(updatedTime);
      setInputValue(format(updatedTime, 'HH:mm'));
    }
  }, [tempHours, tempMinutes, selectedTime]);

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

  const openModal = () => {
    setModalOpen(true);
    setTempHours(selectedTime.getHours());
    setTempMinutes(selectedTime.getMinutes());
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <input
        className="form-input"
        onClick={openModal}
        value={inputValue || '16:00'}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <>
            <div className="">
              <button onClick={decreaseHour}>-</button>
              <span>{tempHours}</span>
              <button onClick={increaseHour}>+</button>
            </div>
            <div>
              <button onClick={decreaseMinute}>-</button>
              <span>{tempMinutes}</span>
              <button onClick={increaseMinute}>+</button>
            </div>
            <button className="btn" onClick={handleSetTime}>
              Save
            </button>
          </>
        }
      </Modal>
    </div>
  );
};

export default TimePickerButton;
