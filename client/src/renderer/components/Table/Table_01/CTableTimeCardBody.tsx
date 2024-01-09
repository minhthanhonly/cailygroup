import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
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
type Holiday = {
  name: string;
  days: string;
};
interface SelectMY {
  selectedMonth: string;
  selectedYear: string;
  daysInMonth: Date[];
}

interface RollAdmin {
  admin?: boolean;
}
interface Dayoff {
  allDates: any;
  id: string;
  user_id: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  note: string;
  status: number;
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
  ): { isHoliday: boolean; name: string; days: string } => {
    const formattedDay = format(day, 'dd-MM-yyyy');

    const foundHoliday = holidays?.find((holiday) => {
      const holidayDays = holiday.days.split(', ');
      return holidayDays.includes(formattedDay);
    });

    return foundHoliday
      ? { isHoliday: true, name: foundHoliday.name, days: foundHoliday.days }
      : { isHoliday: false, name: '', days: '' };
  };

  //get dayoffs for user
  const [dayoffs, setDayoffs] = useState<Dayoff[] | undefined>(undefined); // Đặt kiểu là Dayoff[] hoặc undefined
  const [allDatesByItem, setAllDatesByItem] = useState({});
  const timeDefault = '8:00';
  const fetchDayoffs = async () => {
    try {
      let $id = 39;
      const response = await axios.get(
        'http://cailygroup.com/dayoffs/getforuser/' + $id,
      );
      setDayoffs(response.data);
      if (response.data && Array.isArray(response.data)) {
        const allDatesArray: string[] = response.data.reduce(
          (accumulator, dayoff) => {
            const startDate = moment(dayoff.date_start, 'DD-MM-YYYY').toDate();
            const endDate = moment(dayoff.date_end, 'DD-MM-YYYY').toDate();

            const allDates = getDatesBetween(startDate, endDate);
            const formattedAllDates = allDates.map((date) =>
              moment(date).format('DD/MM/YYYY'),
            );

            // Hợp nhất mỗi mảng formattedAllDates vào mảng chính
            return [...accumulator, ...formattedAllDates];
          },
          [],
        );

        setAllDatesByItem(allDatesArray);
        // console.log('allDatesByItem:', allDatesArray);
      }
    } catch (error) {
      console.error('Error fetching dayoffs:', error);
    }
  };

  const getDatesBetween = (start: Date, end: Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate.toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const isCancelLeaveDay = (day: string): boolean => {
    const formattedDay = format(new Date(day), 'dd/MM/yyyy');
    return (
      Array.isArray(allDatesByItem) && allDatesByItem.includes(formattedDay)
    );
  };
  // const subtractDates = (date1Str: string, date2Str: string) => {
  //   const date1 = new Date(date1Str);
  //   const date2 = new Date(date2Str);

  //   // Chuyển đổi thành số ngày
  //   const timeDifferenceInMilliseconds = date1 - date2;
  //   const timeDifferenceInDays =
  //     timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

  //   // Làm tròn kết quả và chuyển đổi thành số nguyên
  //   const result = Math.round(timeDifferenceInDays);

  //   return result;
  // };
  // const calculateDuration = (end: string, start: string) => {
  //   const parseTime = (time: string) => {
  //     const [hours, minutes] = time.split(':').map(Number);
  //     return { hours, minutes };
  //   };
  //   const startTime = parseTime(start);
  //   const endTime = parseTime(end);
  //   let diffHours = endTime.hours - startTime.hours - 1;
  //   let diffMinutes = endTime.minutes - startTime.minutes - 30;
  //   if (diffMinutes < 0) {
  //     if (diffMinutes < 60) {
  //       diffHours -= 2;
  //       diffMinutes += 120;
  //     } else {
  //       diffHours -= 1;
  //       diffMinutes += 60;
  //     }
  //   }
  //   diffHours = Math.max(0, diffHours);
  //   diffMinutes = Math.max(0, Math.min(diffMinutes, 59));

  //   return `${diffHours}:${diffMinutes}`;
  // };
  // const compareTime = (time1: string, time2: string) => {
  //   const [hours1, minutes1] = time1.split(':').map(Number);
  //   const [hours2, minutes2] = time2.split(':').map(Number);
  //   const totalMinutes1 = hours1 * 60 + minutes1;
  //   const totalMinutes2 = hours2 * 60 + minutes2;
  //   return totalMinutes1 > totalMinutes2;
  // };
  // const subtractTime = (time1: string, time2: string) => {
  //   const [hours1, minutes1] = time1.split(':').map(Number);
  //   const [hours2, minutes2] = time2.split(':').map(Number);
  //   const totalMinutes1 = hours1 * 60 + minutes1;
  //   const totalMinutes2 = hours2 * 60 + minutes2;
  //   let timeDifferenceInMinutes;
  //   if (totalMinutes1 >= totalMinutes2) {
  //     timeDifferenceInMinutes = totalMinutes1 - totalMinutes2;
  //   } else {
  //     timeDifferenceInMinutes = totalMinutes2 - totalMinutes1;
  //   }
  //   const resultHours = Math.floor(timeDifferenceInMinutes / 60);
  //   const resultMinutes = timeDifferenceInMinutes % 60;
  //   const sign = totalMinutes1 >= totalMinutes2 ? '' : '-';
  //   return `${sign}${resultHours}:${
  //     resultMinutes < 10 ? '0' : ''
  //   }${resultMinutes}`;
  // };

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
        } else {
          console.error(`Chuỗi thời gian không hợp lệ hoặc trống.`);
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
        'http://cailygroup.com/timecarddetails/updatecomment',
        {
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

  const [timecardOpen, setTimecardOpen] = useState<TimecardData[]>([]);
  const fetchTimecardOpen = async () => {
    try {
      const response = await axios.get('http://cailygroup.com/timecards');
      if (response.data && Array.isArray(response.data)) {
        setTimecardOpen(response.data);
      }
    } catch (error) {
      console.error('Error fetching timecard_open:', error);
    }
  };
  useEffect(() => {
    fetchTimecardOpen();
    fetchHolidays();
    fetchDayoffs();
  }, []);
  useEffect(() => {
    console.log('allDatesByItem:', allDatesByItem);
    // console.log('dayoffs: ', dayoffs);
    // console.log('holidays: ', holidays);
    calculateTotalTime();
  }, [allDatesByItem, dayoffs]);
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
              return holidayInfo.isHoliday && 'holiday bg-purple';
            })()}
            ${isWaiting(day) ? 'waiting bg-yellow' : ''}
            ${accreptLeave(day) ? 'accrept bg-green' : ''}
            
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
                ) : isHoliday(day).isHoliday ? (
                  isHoliday(day).name
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
