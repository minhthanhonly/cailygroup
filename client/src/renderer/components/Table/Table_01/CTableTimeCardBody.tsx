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
import Modal from '../../Modal/Modal';
import useAuth from '../../../hooks/useAuth';
import { UserRole } from '../../../components/UserRole';

//sever
type Holiday = {
  id: number;
  name: string;
  days: string;
};
interface SelectMY {
  selectedMonth: string;
  selectedYear: string;
  daysInMonth: Date[];
}
interface Dayoff {
  id: number;
  user_id: string;
  date: string;
  time_start: string;
  time_end: string;
  note: string;
  status: number;
}

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
// Định nghĩa props có kiểu là sự kết hợp của cả hai interfaces DatabaseFile
interface CombinedProps extends SelectMY {
  userID: any;
}

let CTableTimeCardBody = (Props: CombinedProps) => {
  const [daysInMonth, setDaysInMonth] = useState(Props.daysInMonth);

  const selectedMonth = Props.selectedMonth;
  const selectedYear = Props.selectedYear;
  const propsID = Props.userID;
  const [admin, setAdmin] = useState(false);
  // const { auth } = useAuth();
  const [usersID, setUsersID] = useState();
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  useEffect(() => {
    if (users) {
      const isAdmin = users.roles === UserRole.ADMIN;
      const isManager = users.roles === UserRole.MANAGER;
      const isLeader = users.roles === UserRole.LEADER;
      if (isAdmin || isManager || isLeader) {
        setAdmin(true);
      }
    }
    if (propsID) {
      setUsersID(propsID);
    } else {
      setUsersID(users.id);
    }

    fetchTimecardOpen();
    fetchHolidays();
    fetchDayoffs();
  }, [propsID]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showEndButton, setShowEndButton] = useState(false);
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdatingDayoff, setIsUpdatingDayoff] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [shouldUpdateWorkingHours, setShouldUpdateWorkingHours] =
    useState(false);

  const [editingStart, setEditingStart] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<number | undefined>(
    undefined,
  );
  const openModal = (itemId: number, isDayoff: boolean) => {
    setModalOpen(true);
    setCommentText('');
    setCurrentItemId(itemId);
    setIsUpdatingDayoff(isDayoff);
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

  // Hàm xử lý khi click vào nút bắt đầu
  const [isID, setId] = useState(null);
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
        user_id: usersID,
        timecard_month: currentMonth,
        timecard_day: currentDate,
        timecard_date: `${currentDate}-${currentMonth}-${currentYear}`,
        timecard_temp: 0,
        owner: 'admin',
      };
      console.log(dataTimeCard);
      const responseTimeCard = await axios.post(
        'http://cailygroup.com/timecards/add',
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
      const responseTimeCardDetails = await axios.post(
        'http://cailygroup.com/timecarddetails/add',
        { dataTimeCardDetails },
      );

      console.log(responseTimeCardDetails.data);
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
          'http://cailygroup.com/timecarddetails/update',
          { dataTime },
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
  //load ngày lễ
  const [holidays, setHolidays] = useState<Holiday[] | undefined>();
  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://cailygroup.com/holidays');
      if (response.data && Array.isArray(response.data)) {
        setHolidays(response.data);
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const isHoliday = (
    day: Date,
  ): { isHoliday: boolean; id: number; name: string; days: string } => {
    const formattedDay = format(day, 'dd-MM-yyyy');

    const foundHoliday = holidays?.find((holiday) => {
      const holidayDays = holiday.days.split(', ');
      return holidayDays.includes(formattedDay);
    });

    return foundHoliday
      ? {
          isHoliday: true,
          id: foundHoliday.id,
          name: foundHoliday.name,
          days: foundHoliday.days,
        }
      : { isHoliday: false, id: 0, name: '', days: '' };
  };

  //get dayoffs for user

  const [dayoffs, setDayoffs] = useState<Dayoff[] | undefined>();
  const fetchDayoffs = async () => {
    try {
      let $id = usersID;
      const response = await axios.get(
        'http://cailygroup.com/dayoffs/getforuser/' + $id,
      );
      setDayoffs(response.data);
    } catch (error) {
      console.error('Error fetching dayoffs:', error);
    }
  };
  const isDayoff = (
    day: Date,
  ): { isDayoff: boolean; id: number; note: string; status: number } => {
    const formattedDay = format(day, 'dd-MM-yyyy');

    const foundDayoff = dayoffs?.find((dayoff) => {
      return dayoff.date === formattedDay;
    });

    return foundDayoff
      ? {
          isDayoff: true,
          id: foundDayoff.id,
          note: foundDayoff.note,
          status: foundDayoff.status,
        }
      : { isDayoff: false, id: 0, note: '', status: 0 };
  };
  const updateDayoffs = async (id: number) => {
    try {
      const response = await axios.post(
        'http://cailygroup.com/dayoffs/update/' + id,
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };
  const deleteDayoffs = async (id: number) => {
    try {
      const response = await axios.post(
        'http://cailygroup.com/dayoffs/delete/' + id,
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  //tổng số giờ
  const [totalTime, setTotalTime] = useState({ hours: 0, minutes: 0 });
  const calculateTotalTime = () => {
    const rows = document.querySelectorAll('table tr');
    let totalHours = 0;
    let totalMinutes = 0;

    rows.forEach((row) => {
      const div = row.querySelector('.timecard_time div');

      if (div instanceof HTMLElement) {
        const timeString = div.innerText.trim();
        if (timeString && /^\d+:\d+$/.test(timeString)) {
          const [hours, minutes] = timeString.split(':');
          totalHours += parseInt(hours, 10);
          totalMinutes += parseInt(minutes, 10);
        }
      }
    });

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    setTotalTime({ hours: totalHours, minutes: totalMinutes });
  };

  const [accreptLeaves, setAccreptLeave] = useState([new Date(2024, 1, 15)]);
  const accreptLeave = (date: number | Date) =>
    accreptLeaves.some((accrept) => isSameDay(date, accrept));

  const [cancelLeave, setCancelLeave] = useState([new Date(2024, 1, 22)]);
  const isCancelLeave = (date: number | Date) =>
    cancelLeave.some((cancel) => isSameDay(date, cancel));

  const [waiting, setWaiting] = useState([new Date(2023, 11, 25)]);
  const isWaiting = (date: number | Date) =>
    waiting.some((cancel) => isSameDay(date, cancel));

  const formatMinutesToHours = (totalWorkingHours: number) => {
    const hours = Math.floor(totalWorkingHours / 60);
    const minutes = totalWorkingHours % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };

  const currentMonth = new Date().getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const currentYear = new Date().getFullYear();

  const [timecardOpen, setTimecardOpen] = useState<TimecardData[]>([]);
  const fetchTimecardOpen = async () => {
    // console.log(usersID);
    try {
      const response = await axios.get(
        'http://cailygroup.com/timecards/getall/' + usersID,
      );
      if (response.data && Array.isArray(response.data)) {
        setTimecardOpen(response.data);
      } else {
        setTimecardOpen([]);
      }
    } catch (error) {
      console.error('Error fetching timecard_open:', error);
    }
  };
  const handleUpdateComment = async (Id: number) => {
    try {
      const response = await axios.post(
        'http://cailygroup.com/timecarddetails/updatecomment',
        {
          id: Id,
          comment: commentText,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchTimecardOpen();
    closeModal();
  };
  const handleUpdateCommentDayoffs = async (id: number) => {
    try {
      const response = await axios.post(
        'http://cailygroup.com/dayoffs/updatecomment/' + id,
        {
          comment: commentText,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchDayoffs();
    closeModal();
  };

  useEffect(() => {
    fetchTimecardOpen();
    fetchHolidays();
    fetchDayoffs();
    console.log(usersID);
  }, [usersID]);
  useEffect(() => {
    calculateTotalTime();
  }, [dayoffs]);
  return (
    <>
      {allDays.map((day, rowIndex) => (
        <tr
          key={rowIndex}
          className={`
            ${getDayClassName(day)}
            ${isToday(day) ? 'today' : ''}
            ${(() => {
              const holidayInfo = isHoliday(day);
              return holidayInfo.isHoliday && 'bg-purple';
            })()}
            ${(() => {
              const dayoffInfo = isDayoff(day);
              return dayoffInfo.isDayoff
                ? dayoffInfo.status == 0
                  ? 'bg-orange'
                  : 'bg-red '
                : '';
            })()}
            
            ${isWaiting(day) ? 'waiting bg-yellow' : ''}
          `}
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
                {isHoliday(day).isHoliday ? (
                  ''
                ) : timecardOpen.some(
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
                ) : isToday(day) ? (
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

              <td className="timecard_time">
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
                {isHoliday(day).isHoliday ? (
                  isHoliday(day).name
                ) : isDayoff(day).isDayoff ? (
                  <>
                    {isDayoff(day).note}
                    {isDayoff(day).status == 0 ? (
                      <a
                        onClick={(event) => {
                          openModal(isDayoff(day).id, true);
                        }}
                        className="btn btn--green btn--small icon icon--edit"
                      >
                        <img
                          src={require('../../../../../assets/icnedit.png')}
                          alt="edit"
                          className="fluid-image"
                        />
                      </a>
                    ) : (
                      ''
                    )}
                  </>
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
                                onClick={(event) => {
                                  openModal(item.id_groupwaretimecard, false);
                                }}
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
                {isDayoff(day).isDayoff ? (
                  isDayoff(day).status == 0 ? (
                    <>
                      <span
                        onClick={(event) => deleteDayoffs(isDayoff(day).id)}
                        className="btn btn--red btn--medium"
                      >
                        Hủy
                      </span>
                      {admin ? (
                        <span
                          onClick={(event) => updateDayoffs(isDayoff(day).id)}
                          className="btn btn--green btn--medium ml5"
                        >
                          Duyệt
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="btn btn--red btn--green btn--small icon icon--edit">
                      <img
                        src={require('../../../../../assets/check.png')}
                        alt="edit"
                        className="fluid-image"
                      />
                    </span>
                  )
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
        <td>
          {totalTime.hours}:{totalTime.minutes}
        </td>
        <td>00:00</td>
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
                    onClick={() => {
                      if (isUpdatingDayoff) {
                        handleUpdateCommentDayoffs(currentItemId || 0);
                      } else {
                        handleUpdateComment(currentItemId || 0);
                      }
                    }}
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
