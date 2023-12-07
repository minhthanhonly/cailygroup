import React, { useState, useEffect } from 'react';
import { format, addHours, addMinutes, setHours, setMinutes } from 'date-fns';
import Modal from './Modal';

const TimePickerButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [externalInputValue, setExternalInputValue] = useState('');
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
    const updatedTime = setHours(
      setMinutes(selectedTime, tempMinutes),
      tempHours,
    );
    setSelectedTime(updatedTime);
    setInputValue(format(updatedTime, 'HH:mm'));
    setExternalInputValue(format(updatedTime, 'HH:mm'));
    closeModal();
  };

  const openModal = () => {
    setModalOpen(true);
    setTempHours(selectedTime.getHours());
    setTempMinutes(selectedTime.getMinutes());
    // Lưu trữ giá trị của input bên trong modal
    setExternalInputValue(inputValue);
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
          <div className="modal-setTime">
            <div className="modal-setTime--content">
              <div className="modal-setTime--number">
                <button className="plus" onClick={increaseHour}>
                  <img
                    src={require('../../assets/images/icon-plus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
                <span>{tempHours}</span>
                <button className="minus" onClick={decreaseHour}>
                  <img
                    src={require('../../assets/images/icon-minus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
              </div>
              <div className="modal-setTime--number">
                <button className="plus" onClick={increaseMinute}>
                  <img
                    src={require('../../assets/images/icon-plus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
                <span>{tempMinutes}</span>
                <button className="minus" onClick={decreaseMinute}>
                  <img
                    src={require('../../assets/images/icon-minus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
              </div>
            </div>
            <div className="wrp-button">
              <button className="btn" onClick={handleSetTime}>
                Xác nhận
              </button>
              <button className="btn btn--orange" onClick={closeModal}>
                Hủy
              </button>
            </div>
          </div>
        }
      </Modal>
    </div>
  );
};

export default TimePickerButton;
