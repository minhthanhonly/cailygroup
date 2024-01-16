import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import './From.scss';
import 'react-datepicker/dist/react-datepicker.css';
import TimePickerButton from '../Modal/TimeSelect';
import { urlControl } from '../../routes/server';
import { format } from 'date-fns';
import axios from '../../api/axios';
import Modaldelete from '../Modal/Modaldelete';
import { useNavigate } from 'react-router-dom';

export const FormLeave: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [timeStart, setTimeStart] = useState('07:30');
  const [timeEnd, setTimeEnd] = useState('17:00');
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [usersID, setUsersID] = useState();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const [noteErr, setNoteErr] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setUsersID(users.id);
  }, []);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openModaldelete = () => {
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };
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

  const handleLeaveDateChange = (date: Date | null) => {
    if (date !== null) {
      setLeaveDate(date);
    }
  };

  const handleConfirmClick = () => {
    console.log(timeStart, timeEnd);
    const group_data = {
      user_id: usersID,
      date: format(leaveDate, 'dd-MM-yyyy').toString(),
      // date_start: format(startDate, 'dd-MM-yyyy').toString(),
      // date_end: format(endDate, 'dd-MM-yyyy').toString(),
      time_start: timeStart,
      time_end: timeEnd,
      note: note,
      // day_number: calculateDayDifference(startDate, endDate),
      day_number: 1,
      status: 0,
      owner: 'admin',
    };
    if (note) {
      setNoteErr(false);
      axios
        .post('dayoffs/add', { group_data })
        .then((response) => {
          console.log(response.data);
          navigate('/dayoffs');
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Server error message:', error.response.data);
          }
        });
    } else {
      setNoteErr(true);
    }
    closeModaldelete();
  };

  const calculateDayDifference = (start: Date, end: Date) => {
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      Math.abs((start.getTime() - end.getTime()) / oneDay) + 1,
    );

    return diffDays;
  };

  return (
    <div className="form-leave form">
      <div className="form-content">
        <div className="row">
          {/* <div className="col-6">
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
          </div> */}
          <div className="col-12">
            <div className="form-group">
              <label>
                Ngày nghỉ phép
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <DatePicker
                selected={leaveDate}
                onChange={(date) => handleLeaveDateChange(date)}
                // selectsStart
                // startDate={startDate}
                // endDate={endDate}
              />
            </div>
          </div>
          <div className="col-12">
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
          {/* <div className="col-6">
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
          </div> */}
          <div className="col-12">
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
          <div className="col-12">
            <div className="form-group">
              <label>
                Lý do nghỉ
                <img
                  src={require('../../../../assets/icon-practice.jpg')}
                  alt=""
                  className="fluid-image"
                />
              </label>
              <div>
                <textarea
                  className="form-input"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
                {noteErr ? (
                  <p className="text-error">* Phải nhập lý do nghỉ!</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="wrp-button">
          <button
            className="btn btn--green"
            onClick={(event) => {
              openModaldelete();
            }}
          >
            Xác nhận
          </button>
          <button className="btn btn--orange">Hủy</button>
        </div>
      </div>
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <>
          <h2 className="mb15">Xác nhận xin nghỉ phép:</h2>
          <table className="table-modal">
            <tbody>
              <tr>
                <td>Ngày xin nghỉ</td>
                <td>{format(leaveDate, 'dd-MM-yyyy').toString()}</td>
              </tr>
              <tr>
                <td>Giờ bắt đầu</td>
                <td>{timeStart}</td>
              </tr>
              <tr>
                <td>Giờ kết thúc</td>
                <td>{timeEnd}</td>
              </tr>
              <tr>
                <td>Lý do nghỉ</td>
                <td>{note}</td>
              </tr>
            </tbody>
          </table>
          <div className="wrp-button">
            <button className="btn btn--green" onClick={handleConfirmClick}>
              Đồng ý
            </button>
            <button className="btn btn--orange" onClick={closeModaldelete}>
              Hủy
            </button>
          </div>
        </>
      </Modaldelete>
    </div>
  );
};
