import React, { useState, useEffect, useCallback } from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import Modal from './Modal';

interface TimeSelectProps {
  defaultValue?: string;
}

const TimePickerButton: React.FC<TimeSelectProps> = ({ defaultValue }) => {
  const initialTime = setHours(setMinutes(new Date(), 0), 8);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [inputValue, setInputValue] = useState('');
  const [tempHours, setTempHours] = useState(8);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [tempInputValue, setTempInputValue] = useState('');

  useEffect(() => {
    const updatedTime = setHours(
      setMinutes(selectedTime, tempMinutes),
      tempHours,
    );
    const newInputValue = format(updatedTime, 'HH:mm');
    setTempInputValue(newInputValue);
  }, [tempHours, tempMinutes, selectedTime]);

  useEffect(() => {
    if (defaultValue) {
      setTempHours(parseInt(defaultValue.split(':')[0], 10));
      setTempMinutes(parseInt(defaultValue.split(':')[1], 10));
    }
  }, [defaultValue]);

  const increaseHour = () => {
    setTempHours((prevHours) => prevHours + 1);
  };

  const decreaseHour = () => {
    setTempHours((prevHours) => prevHours - 1);
  };

  const increaseMinute = () => {
    setTempMinutes((prevMinutes) => (prevMinutes + 5) % 60);
  };

  const decreaseMinute = () => {
    setTempMinutes((prevMinutes) => (prevMinutes - 5 + 60) % 60);
  };

  const handleSetTime = useCallback(() => {
    if (
      !isNaN(tempHours) &&
      !isNaN(tempMinutes) &&
      tempHours >= 0 &&
      tempHours <= 23 &&
      tempMinutes >= 0 &&
      tempMinutes <= 59
    ) {
      const updatedTime = setHours(
        setMinutes(selectedTime, tempMinutes),
        tempHours,
      );
      setSelectedTime(updatedTime);
      setTempInputValue(format(updatedTime, 'HH:mm')); // Cập nhật tempInputValue
      closeModal();
    } else {
      console.error('Giá trị thời gian không hợp lệ.');
    }
  }, [tempHours, tempMinutes, selectedTime, setTempInputValue]);

  const openModal = () => {
    setModalOpen(true);

    if (inputValue) {
      setTempHours(parseInt(inputValue.split(':')[0], 10));
      setTempMinutes(parseInt(inputValue.split(':')[1], 10));
    } else {
      setTempHours(8);
      setTempMinutes(0);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <input
        className="form-input"
        onFocus={openModal}
        defaultValue={tempInputValue || defaultValue || '08:00'}
        readOnly
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <div className="modal-setTime">
            <div className="modal-setTime--content">
              <div className="modal-setTime--number">
                <button className="plus" onClick={increaseHour}>
                  <img
                    src={require('../../../../assets/icon-plus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
                <span>{tempHours}</span>
                <button className="minus" onClick={decreaseHour}>
                  <img
                    src={require('../../../../assets/icon-minus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
              </div>
              <div className="modal-setTime--number">
                <button className="plus" onClick={increaseMinute}>
                  <img
                    src={require('../../../../assets/icon-plus.png')}
                    alt=""
                    className="fluid-image"
                  />
                </button>
                <span>{tempMinutes}</span>
                <button className="minus" onClick={decreaseMinute}>
                  <img
                    src={require('../../../../assets/icon-minus.png')}
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
