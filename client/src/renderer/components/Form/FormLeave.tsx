import { useState } from 'react';
import DatePicker from 'react-datepicker';

import './From.scss';
import 'react-datepicker/dist/react-datepicker.css';
import TimePickerButton from '../Modal/TimeSelect';
import { urlControl } from '../../routes/server';
import { format } from 'date-fns';
import axios from 'axios';

export const FormLeave: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [timeStart, setTimeStart] = useState('07:30');
  const [timeEnd, setTimeEnd] = useState('17:00');

  const handleStartDateChange = (date: Date | null) => {
    if (date !== null) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date !== null) {
      setEndDate(date);
    }
  };

  const handleConfirmClick = () => {
    const group_data = {
      user_id: 1,
      date_start: format(startDate, 'dd-MM-yyyy').toString(),
      date_end: format(endDate, 'dd-MM-yyyy').toString(),
      time_start: timeStart,
      time_end: timeEnd,
      note: note,
      day_number: calculateDayDifference(startDate, endDate),
      status: 0,
      owner: 'admin',
    };
    axios
      .post(urlControl + 'DayoffsController.php', { group_data })
      .then((response) => {
        console.log(response.data);
        // Xử lý thành công nếu cần
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        // Xử lý lỗi nếu cần
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Server error message:', error.response.data);
        }
      });
  };

  const calculateDayDifference = (start: Date, end: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(
      Math.abs((start.getTime() - end.getTime()) / oneDay + 1),
    );
    return diffDays;
  };

  return (
    <div className="form-leave form">
      <div className="form-content">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>
                Ngày bắt đầu
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group form-group--small">
              <label>
                Giờ bắt đầu
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <TimePickerButton
                defaultValue={timeStart}
                onChange={(newValue) => setTimeStart(newValue)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>
                Ngày kết thúc
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDateChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group form-group--small">
              <label>
                Giờ kết thúc
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <TimePickerButton
                defaultValue={timeEnd}
                onChange={(newValue) => setTimeEnd(newValue)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              Lý do nghỉ
              <img
                src={require('../../../../assets/icon-practice.jpg')}
                alt=""
                className="fluid-image"
              />
            </label>
            <textarea
              className="form-input"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
        </div>
        <div className="wrp-button">
          <button className="btn btn--green" onClick={handleConfirmClick}>
            Xác nhận
          </button>
          <button className="btn btn--orange">Hủy</button>
        </div>
      </div>
    </div>
  );
};
