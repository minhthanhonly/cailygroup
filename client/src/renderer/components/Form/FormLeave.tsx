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
  const formatTimeDigit = (digit: number): string => {
    return digit < 10 ? `0${digit}` : `${digit}`;
  };
  const calculateTime = (timestart: string, timeend: string): string => {
    const normalizeTime = (time: string): string => {
      return time.length === 4 ? `0${time}` : time;
    };
    const startTime = new Date(`2000-01-01T${normalizeTime(timestart)}`);
    const endTime = new Date(`2000-01-01T${normalizeTime(timeend)}`);
    const timeDiff: number = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const formattedHours = formatTimeDigit(hours);
    const formattedMinutes = formatTimeDigit(minutes);

    return `${formattedHours}:${formattedMinutes}`;
  };
  const compareTime = (time1: string, time2: string): number => {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    if (hour1 > hour2) {
      return 1;
    } else if (hour1 < hour2) {
      return 2;
    } else {
      // Nếu giờ bằng nhau, so sánh phút
      if (minute1 > minute2) {
        return 1;
      } else if (minute1 < minute2) {
        return 2;
      } else {
        // Nếu cả giờ và phút đều bằng nhau
        return 0;
      }
    }
  };
  const addTimes = (time1: string, time2: string): string => {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    let totalHours = hour1 + hour2;
    let totalMinutes = minute1 + minute2;

    // Xử lý nếu tổng phút vượt quá 60
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    // Định dạng kết quả để đảm bảo có 2 chữ số
    const formattedHours = totalHours < 10 ? `0${totalHours}` : `${totalHours}`;
    const formattedMinutes =
      totalMinutes < 10 ? `0${totalMinutes}` : `${totalMinutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  };
  function findConfigValue(configArray: any[], key: string) {
    const configItem = configArray.find((item) => item.config_key === key);
    return configItem ? configItem.config_value : null;
  }
  const handleConfirmClick = async () => {
    let timeLeave = '';
    const responseConfig = await axios.post('config');
    const configData = responseConfig.data;
    const opentimeValue = findConfigValue(configData, 'opentime');
    const closetimeValue = findConfigValue(configData, 'closetime');
    const openlunchValue = findConfigValue(configData, 'openlunch');
    const closelunchValue = findConfigValue(configData, 'closelunch');
    if (compareTime(timeStart, timeEnd) == 0) {
      timeLeave = '00:00';
    } else if (compareTime(timeStart, opentimeValue) != 1) {
      // bắt đầu trước 7:30
      if (compareTime(timeEnd, opentimeValue) != 1) {
        timeLeave = '00:00';
      } else if (compareTime(timeEnd, openlunchValue) != 1) {
        timeLeave = calculateTime(opentimeValue, timeEnd);
      } else if (compareTime(timeEnd, closelunchValue) != 1) {
        timeLeave = calculateTime(opentimeValue, openlunchValue);
      } else if (compareTime(timeEnd, closetimeValue) != 1) {
        timeLeave = addTimes(
          calculateTime(opentimeValue, openlunchValue),
          calculateTime(closelunchValue, timeEnd),
        );
      } else {
        timeLeave = addTimes(
          calculateTime(opentimeValue, openlunchValue),
          calculateTime(closelunchValue, closetimeValue),
        );
      }
    } else {
      //bắt đầu sau 7:30
      if (compareTime(timeStart, openlunchValue) != 1) {
        // bắt đầu trước 11:30
        if (compareTime(timeEnd, openlunchValue) != 1) {
          timeLeave = calculateTime(timeStart, timeEnd);
        } else if (compareTime(timeEnd, closelunchValue) != 1) {
          timeLeave = calculateTime(timeStart, openlunchValue);
        } else if (compareTime(timeEnd, closetimeValue) != 1) {
          timeLeave = addTimes(
            calculateTime(timeStart, openlunchValue),
            calculateTime(closelunchValue, timeEnd),
          );
        } else {
          timeLeave = addTimes(
            calculateTime(timeStart, openlunchValue),
            calculateTime(closelunchValue, closetimeValue),
          );
        }
      } else if (compareTime(timeStart, closelunchValue) == 1) {
        // bắt đầu sau 13:00
        if (compareTime(timeStart, closetimeValue) == 1) {
          timeLeave = '00:00';
        } else if (compareTime(timeEnd, closetimeValue) != 1) {
          timeLeave = calculateTime(timeStart, timeEnd);
        } else {
          timeLeave = calculateTime(timeStart, closetimeValue);
        }
      } else {
        if (compareTime(timeEnd, closelunchValue) != 1) {
          timeLeave = '00:00';
        } else if (compareTime(timeEnd, closetimeValue) != 1) {
          timeLeave = calculateTime(closelunchValue, timeEnd);
        } else {
          timeLeave = calculateTime(closelunchValue, closetimeValue);
        }
      }
    }
    const group_data = {
      user_id: usersID,
      date: format(leaveDate, 'dd-MM-yyyy').toString(),
      time_start: timeStart,
      time_end: timeEnd,
      note: note,
      day_number: timeLeave,
      status: 0,
      owner: '',
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
