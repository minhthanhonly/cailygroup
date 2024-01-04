import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  isSameDay,
  differenceInMinutes,
  startOfDay,
} from 'date-fns';
import { Button } from '../../Button';
import Modal from '../../Modal/Modal';

//sever
import { urlControl } from '../../../routes/server/';

interface SelectMY {
  selectedMonth: string;
  selectedYear: string;
  daysInMonth: Date[];
}

interface RollAdmin {
  admin?: boolean;
}

// Định nghĩa props có kiểu là sự kết hợp của cả hai interfaces DatabaseFile
interface CombinedProps extends SelectMY, RollAdmin {}

let CTableTimeCardBody = (Props: CombinedProps) => {
  const [daysInMonth, setDaysInMonth] = useState(Props.daysInMonth);

  const selectedMonth = Props.selectedMonth;
  const selectedYear = Props.selectedYear;
  const admin = Props.admin;

  const [currentTime, setCurrentTime] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showEndButton, setShowEndButton] = useState(false);
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const [shouldUpdateWorkingHours, setShouldUpdateWorkingHours] =
    useState(false);

  const [editingStart, setEditingStart] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<number | undefined>(
    undefined,
  );
  const openModal = (itemId: number) => {
    setCurrentItemId(itemId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentItemId(undefined);
    setModalOpen(false);
  };

  useEffect(() => {
    // Nếu selectedMonth hoặc selectedYear chưa được chọn, gán giá trị mặc định là tháng và năm hiện tại
    if (!selectedMonth || !selectedYear) {
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1); // Tháng trong JavaScript bắt đầu từ 0
      const currentYear = String(currentDate.getFullYear());

      // Gọi hàm update với tháng và năm hiện tại
      updateDaysInMonth(currentMonth, currentYear);
    } else {
      // Nếu đã có giá trị cho selectedMonth và selectedYear, thì gọi hàm update như bình thường
      updateDaysInMonth(selectedMonth, selectedYear);
    }
  }, [
    selectedMonth,
    selectedYear,
    startHours,
    startMinutes,
    endHours,
    endMinutes,
    showStartButton,
    showEndButton,
    shouldUpdateWorkingHours,
  ]);

  const updateDaysInMonth = (month: string, year: string) => {
    const firstDayOfMonth = startOfMonth(
      new Date(parseInt(year), parseInt(month) - 1),
    );
    const lastDayOfMonth = endOfMonth(
      new Date(parseInt(year), parseInt(month) - 1),
    );

    if (firstDayOfMonth <= lastDayOfMonth) {
      const daysOfMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
      });
      setDaysInMonth(daysOfMonth);
    } else {
      console.error('Invalid interval: start date is after end date');
      // Xử lý lỗi hoặc thông báo cho người dùng về sự cố này.
    }
  };

  const convertHoursToMinutes = (hours: string) => {
    const [hoursPart, minutesPart] = hours.split(':');
    return parseInt(hoursPart, 10) * 60 + parseInt(minutesPart, 10);
  };

  const [timeTracking, setTimeTracking] = useState({
    startHours: 0,
    startMinutes: 0,
    endHours: 0,
    endMinutes: 0,
  });

  const fetchCurrentTime = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      const { datetime } = response.data;
      setCurrentTime(datetime);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian hiện tại:', error);
    }
  };

  const year = '2023';
  const month = '0';

  const firstDayOfMonth = startOfMonth(
    new Date(parseInt(year), parseInt(month) - 1),
  );
  const lastDayOfMonth = endOfMonth(
    new Date(parseInt(year), parseInt(month) - 1),
  );

  let daysOfMonth = eachDayOfInterval({
    start: startOfMonth(new Date(parseInt(year), parseInt(month) - 1)),
    end: endOfMonth(new Date(parseInt(year), parseInt(month) - 1)),
  });

  // Thêm một số ngày vào đầu tiên của danh sách để nó hiển thị ở cột đầu tiên
  let paddingDays = Array.from(
    { length: firstDayOfMonth.getDay() },
    (_, index) =>
      new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth(),
        index + 1 - firstDayOfMonth.getDay(),
      ),
  );

  let allDays = [...paddingDays, ...daysInMonth];

  const getDayClassName = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return 'sunday';
    if (dayOfWeek === 6) return 'saturday';
    // Các class khác nếu cần
    return '';
  };

  const otherColumnData = [
    { format: (date: number | Date) => format(startOfDay(date), 'EEEE') }, // Định dạng ngày thành thứ
  ];

  const [isID, setId] = useState(null);
  // Hàm xử lý khi click vào nút bắt đầu
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      let { datetime } = response.data;
      let currentHour = new Date(datetime).getHours();
      let currentMinutes = new Date(datetime).getMinutes();
      let currentYear = new Date(datetime).getFullYear();
      let currentMonth = String(new Date(datetime).getMonth() + 1).padStart(
        2,
        '0',
      );
      let currentDate = String(new Date(datetime).getDate()).padStart(2, '0');
      let timecard_open_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;

      const dataTimeCard = {
        timecard_year: currentYear,
        user_id: 39,
        timecard_month: currentMonth,
        timecard_day: currentDate,
        timecard_date: `${currentDate}-${currentMonth}-${currentYear}`,
        timecard_temp: 0,
        owner: 'admin',
      };
      const responseTimeCard = await axios.post(
        urlControl + 'TimecardsController.php',
        { dataTimeCard },
      );

      console.log(responseTimeCard.data);
      console.log(responseTimeCard.data.id_timecard);

      setId(responseTimeCard.data.id_timecard);
      const dataTimeCardDetails = {
        id_groupwaretimecard: responseTimeCard.data.id_timecard,
        timecard_open: timecard_open_time,
        timecard_originalopen: timecard_open_time,
        timecard_timeinterval: '1:30',
        timecard_comment: '',
      };
      console.log(dataTimeCardDetails);
      const responseTimeCardDetails = await axios.post(
        urlControl + 'TimecardDetailsController.php',
        { dataTimeCardDetails },
      );

      console.log(responseTimeCardDetails.data);
      // Nếu lưu thành công, cập nhật state và hiển thị nút "Kết thúc"
      // setStartHours(currentHour);
      // setStartMinutes(currentMinutes);
      // setShowEndButton(true);
      // setShowStartButton(false);

      fetchTimecardOpen();
    } catch (error) {
      console.error(
        'Lỗi khi lấy thời gian từ API hoặc gửi dữ liệu lên server:',
        error,
      );
    }
  };

  // nhấn nút kết thúc mỗi ngày
  const handleEndButtonClick = async (
    timecardID: any,
    timecardStart: string,
    event: { preventDefault: () => void } | undefined,
  ) => {
    if (event) {
      event.preventDefault();
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      let { datetime } = response.data;
      let currentHour = new Date(datetime).getHours();
      let currentMinutes = new Date(datetime).getMinutes();
      let timecard_open_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;
      const dataTime = {
        id: timecardID,
        timecard_open: timecardStart,
        timecard_now: timecard_open_time,
      };

      try {
        const response = await axios.post(
          urlControl + 'TimecardDetailsController.php',
          {
            method: 'UPDATE_TIMECARD',
            dataTime,
          },
        );
        console.log(response.data);
        fetchTimecardOpen();
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);

        // Kiểm tra và chuyển đổi kiểu dữ liệu
        if (axios.isAxiosError(error) && error.response) {
          console.log('Error response data:', error.response.data);
        } else {
          console.log('Unknown error:', error);
        }
      }
    }
  };
  const [holidays, setHolidays] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 11, 12), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const isHoliday = (date: number | Date) =>
    holidays.some((holiday) => isSameDay(date, holiday));

  const [accreptLeaves, setAccreptLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2024, 1, 15), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const accreptLeave = (date: number | Date) =>
    accreptLeaves.some((accrept) => isSameDay(date, accrept));

  const [cancelLeave, setCancelLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2024, 1, 22), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const isCancelLeave = (date: number | Date) =>
    cancelLeave.some((cancel) => isSameDay(date, cancel));

  const [waiting, setWaiting] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 11, 25), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const isWaiting = (date: number | Date) =>
    waiting.some((cancel) => isSameDay(date, cancel));

  const formatMinutesToHours = (totalWorkingHours: number) => {
    const hours = Math.floor(totalWorkingHours / 60);
    const minutes = totalWorkingHours % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };

  const currentMonth = new Date().getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const currentYear = new Date().getFullYear();

  // admin
  const handleStartEditClick = () => {
    setEditingStart(true);
  };

  const handleSaveTimeClick = () => {
    setEditingStart(false);
    setShouldUpdateWorkingHours(true);
    console.log('shouldUpdateWorkingHours', shouldUpdateWorkingHours);
  };

  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':');
    setStartHours(parseInt(hours, 10) || 0);
    setStartMinutes(parseInt(minutes, 10) || 0);
  };

  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':');
    setEndHours(parseInt(hours, 10) || 0);
    setEndMinutes(parseInt(minutes, 10) || 0);
  };

  const [commentText, setCommentText] = useState('');
  const handleUpdateComment = async (Id: number) => {
    try {
      const response = await axios.post(
        urlControl + 'TimecardDetailsController.php',
        {
          method: 'UPDATE_COMMENT',
          id: Id,
          comment: commentText,
        },
      );
      console.log(response.data);
      setCommentText('');
      fetchTimecardOpen();
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    closeModal();
  };

  interface TimecardData {
    timecard_date: string;
    timecard_id: string;
    timecard_open: string;
    timecard_close: string;
    id_groupwaretimecard: number;
    timecard_time: string;
    timecard_timeover: string;
    timecard_timeinterval: String;
    timecard_comment: string;
  }

  const [tableRefresh, setTableRefresh] = useState(0);
  const [timecardOpen, setTimecardOpen] = useState<TimecardData[]>([]);
  const fetchTimecardOpen = async () => {
    try {
      const response = await axios.get(urlControl + 'TimecardsController.php');
      if (response.data && Array.isArray(response.data)) {
        setTimecardOpen(response.data);
      }
    } catch (error) {
      console.error('Error fetching timecard_open:', error);
    }
  };
  useEffect(() => {
    fetchTimecardOpen();
  }, [tableRefresh]);
  // console.log(timecardOpen);
  return (
    <>
      {allDays.map((day, rowIndex) => (
        <tr
          key={rowIndex}
          className={`${getDayClassName(day)}${isToday(day) ? 'today' : ''}${
            isHoliday(day) ? 'holiday bg-purple' : ''
          }${isWaiting(day) ? 'waiting bg-yellow' : ''}${
            accreptLeave(day) ? 'accrept bg-green' : ''
          }${isCancelLeave(day) ? 'cancel bg-red' : ''} `}
        >
          {(new Date(day).getMonth() + 1 === parseInt(selectedMonth) &&
            new Date(day).getFullYear() === parseInt(selectedYear)) ||
          (new Date(day).getMonth() + 1 === currentMonth &&
            new Date(day).getFullYear() === currentYear) ? (
            <>
              <td>{format(day, 'dd-MM-yyyy')}</td>
              {otherColumnData.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.format ? column.format(day) : '...'}
                </td>
              ))}
              <td
                className={`${
                  startHours > 7 || (startHours === 7 && startMinutes > 30)
                    ? 'late'
                    : ''
                }`}
              >
                {timecardOpen.some(
                  (item) => item.timecard_date === format(day, 'dd-MM-yyyy'),
                ) ? (
                  <>
                    {timecardOpen
                      .filter(
                        (item) =>
                          item.timecard_date === format(day, 'dd-MM-yyyy'),
                      )
                      .map((item, index) => (
                        <div key={index}>{item.timecard_open}</div>
                      ))}
                  </>
                ) : isToday(day) && showStartButton ? (
                  <button
                    className="btn btn--medium"
                    onClick={handleButtonClick}
                  >
                    Bắt đầu
                  </button>
                ) : (
                  ''
                )}
              </td>
              <td>
                {timecardOpen.some(
                  (item) => item.timecard_date === format(day, 'dd-MM-yyyy'),
                ) ? (
                  <>
                    {timecardOpen
                      .filter(
                        (item) =>
                          item.timecard_date === format(day, 'dd-MM-yyyy'),
                      )
                      .map((item, index) => (
                        <div key={index}>
                          {item.timecard_close !== null &&
                          item.timecard_close !== '' ? (
                            item.timecard_close
                          ) : isToday(day) ? (
                            <button
                              className="btn btn--medium"
                              onClick={(event) =>
                                handleEndButtonClick(
                                  item.id_groupwaretimecard,
                                  item.timecard_open,
                                  event,
                                )
                              }
                            >
                              Kết thúc
                            </button>
                          ) : null}
                        </div>
                      ))}
                  </>
                ) : null}
              </td>

              <td>
                {timecardOpen.some(
                  (item) => item.timecard_date === format(day, 'dd-MM-yyyy'),
                ) ? (
                  <>
                    {timecardOpen
                      .filter(
                        (item) =>
                          item.timecard_date === format(day, 'dd-MM-yyyy'),
                      )
                      .map((item, index) => (
                        <div key={index}>
                          {item.timecard_close !== null &&
                          item.timecard_close !== ''
                            ? item.timecard_time
                            : null}
                        </div>
                      ))}
                  </>
                ) : null}
              </td>
              <td>
                {timecardOpen.some(
                  (item) => item.timecard_date === format(day, 'dd-MM-yyyy'),
                ) ? (
                  <>
                    {timecardOpen
                      .filter(
                        (item) =>
                          item.timecard_date === format(day, 'dd-MM-yyyy'),
                      )
                      .map((item, index) => (
                        <div key={index}>
                          {item.timecard_close !== null &&
                          item.timecard_close !== ''
                            ? item.timecard_timeover
                            : null}
                        </div>
                      ))}
                  </>
                ) : null}
              </td>
              <td>
                {timecardOpen.some(
                  (item) => item.timecard_date === format(day, 'dd-MM-yyyy'),
                ) ? (
                  <>
                    {timecardOpen
                      .filter(
                        (item) =>
                          item.timecard_date === format(day, 'dd-MM-yyyy'),
                      )
                      .map((item, index) => (
                        <div key={index}>
                          {item.timecard_close !== null &&
                          item.timecard_close !== ''
                            ? item.timecard_timeinterval
                            : null}
                        </div>
                      ))}
                  </>
                ) : null}
              </td>
              <td>
                {accreptLeave(day) ? (
                  'Xác nhận nghỉ phép'
                ) : isCancelLeave(day) ? (
                  <>
                    Không xác nhận nghỉ phép
                    <a className="btn btn--green btn--small icon icon--edit">
                      <img
                        src={require('../../../../../assets/icnedit.png')}
                        alt="edit"
                        className="fluid-image"
                      />
                    </a>
                  </>
                ) : isHoliday(day) ? (
                  'Ngày Nghỉ lễ'
                ) : (
                  <>
                    {timecardOpen.some(
                      (item) =>
                        item.timecard_date === format(day, 'dd-MM-yyyy'),
                    ) ? (
                      <>
                        {timecardOpen
                          .filter(
                            (item) =>
                              item.timecard_date === format(day, 'dd-MM-yyyy'),
                          )
                          .map((item, index) => (
                            <div key={index}>
                              {item.timecard_comment}
                              <a
                                onClick={(event) =>
                                  openModal(item.id_groupwaretimecard)
                                }
                                className="btn btn--green btn--small icon icon--edit"
                              >
                                <img
                                  src={require('../../../../../assets/icnedit.png')}
                                  alt="edit"
                                  className="fluid-image"
                                />
                              </a>
                            </div>
                          ))}
                      </>
                    ) : null}
                  </>
                )}
              </td>
              <td>
                {admin == true &&
                !isHoliday(day) &&
                !getDayClassName(day) &&
                !accreptLeave(day) ? (
                  <>
                    {!editingStart ? (
                      <>
                        <Button onButtonClick={handleStartEditClick}>
                          cập nhật
                        </Button>
                      </>
                    ) : (
                      <>
                        <button onClick={handleSaveTimeClick}>
                          <span className="icon icon--check">
                            <img
                              src={require('../../../../../assets/check.png')}
                              alt="edit"
                              className="fluid-image"
                            />
                          </span>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  ''
                )}
                {isCancelLeave(day) && admin !== true ? (
                  <span className="bg-red__btn">
                    <button className="btn btn-white">Hủy bỏ nghỉ phép</button>
                  </span>
                ) : (
                  ''
                )}
              </td>
            </>
          ) : null}
        </tr>
      ))}

      <tr>
        <td> Tổng số giờ</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {
              <>
                <h3 className="hdglv3">Ghi Chú</h3>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div className="wrp-button">
                  <button
                    className="btn"
                    onClick={() => handleUpdateComment(currentItemId || 0)}
                  >
                    Xác nhận
                  </button>
                  <button className="btn btn--orange" onClick={closeModal}>
                    Hủy
                  </button>
                </div>
              </>
            }
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default CTableTimeCardBody;
