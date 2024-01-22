import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
  startOfDay,
} from 'date-fns';
import Modal from '../../Modal/Modal';
import { UserRole } from '../../../components/UserRole';
import Modaldelete from '../../Modal/Modaldelete';
import { vi } from 'date-fns/locale';

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
  id: number;
  timecard_open: string;
  timecard_close: string;
  id_groupwaretimecard: number;
  timecard_time: string;
  timecard_timeover: string;
  timecard_timeinterval: string;
  timecard_comment: string;
  editor: string;
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false); //a
  const [isUpdatingDayoff, setIsUpdatingDayoff] = useState(false);
  const [commentText, setCommentText] = useState('');

  const [currentItemId, setCurrentItemId] = useState<number | undefined>(
    undefined,
  );
  const openModal = (itemId: number, comment: string, isDayoff: boolean) => {
    setModalOpen(true);
    setCommentText(comment || '');
    setCurrentItemId(itemId);
    setIsUpdatingDayoff(isDayoff);
  };

  const closeModal = () => {
    setCurrentItemId(undefined);
    setModalOpen(false);
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [timecardID, setTimecardID] = useState<number>(0);
  const [timecardDate, setTimecardDate] = useState<string>();
  const [timecard_open_time, settimecard_open_time] = useState<string>();
  const [timecardEnd, setTimecardEnd] = useState<string>();
  const [timecardTime, setTimecardTime] = useState<string>();
  const [timecardOvertime, setTimecardOvertime] = useState<string>();
  const [timecardInterval, setTimecardInterval] = useState<string>();
  const [timecardNote, setTimecardNote] = useState<string>();
  const [timecardDateEdit, setTimecardDateEdit] = useState<string | null>(null);
  const openModaldelete = (
    id: number,
    timecards_date: string,
    timecards_open: string,
    timecards_close: string,
    timecards_time: string,
    timecards_timeover: string,
    timecard_timeinterval: string,
    timecards_comment: string,
    isTimecards: boolean,
    date: string,
  ) => {
    setTimecardID(id);
    setTimecardDate(timecards_date);
    settimecard_open_time(timecards_open);
    setTimecardEnd(timecards_close);
    setTimecardTime(timecards_time);
    setTimecardOvertime(timecards_timeover);
    setTimecardInterval(timecard_timeinterval);
    setTimecardNote(timecards_comment);
    setOpenModal(isTimecards);
    setDeleteModalOpen(true);
    setTimecardDateEdit(date);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };
  useEffect(() => {
    if (!selectedMonth || !selectedYear) {
      const currentDate = new Date();
      const currentMonth = String(currentDate.getMonth() + 1);
      const currentYear = String(currentDate.getFullYear());
      updateDaysInMonth(currentMonth, currentYear);
    } else {
      updateDaysInMonth(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

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
    {
      format: (date: number | Date) =>
        format(startOfDay(date), 'EEEE', { locale: vi }),
    }, // Định dạng ngày thành thứ
  ];

  const formatTimeDigit = (digit: number): string => {
    return digit < 10 ? `0${digit}` : `${digit}`;
  };

  const [timecardOpen, setTimecardOpen] = useState<TimecardData[]>([]);
  const fetchTimecardOpen = async () => {
    try {
      const response = await axios.get('timecards/getall/' + usersID);
      if (response.data && Array.isArray(response.data)) {
        setTimecardOpen(response.data);
      } else {
        setTimecardOpen([]);
      }
    } catch (error) {
      console.error('Error fetching timecard_open:', error);
    }
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

  // Hàm xử lý khi click vào nút bắt đầu
  const [startClick, setStartClick] = useState(true);
  const handleButtonClick = async () => {
    setStartClick(false);
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
      let timecard_close_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;

      const dataTimeCard = {
        timecard_year: currentYear,
        user_id: usersID,
        timecard_month: currentMonth,
        timecard_day: currentDate,
        timecard_date: `${currentDate}-${currentMonth}-${currentYear}`,
        timecard_temp: 0,
        owner: '',
      };
      const responseTimeCard = await axios.post('timecards/add', {
        dataTimeCard,
      });

      console.log(responseTimeCard.data);
      const responseConfig = await axios.post('config');
      const configData = responseConfig.data;
      const openlunchValue = findConfigValue(configData, 'openlunch');
      const closelunchValue = findConfigValue(configData, 'closelunch');
      let resut = calculateTime(openlunchValue, closelunchValue);
      const dataTimeCardDetails = {
        id_groupwaretimecard: responseTimeCard.data.id_timecard,
        timecard_open: timecard_close_time,
        timecard_originalopen: timecard_close_time,
        timecard_timeinterval: resut,
      };
      const responseTimeCardDetails = await axios.post('timecarddetails/add', {
        dataTimeCardDetails,
      });

      console.log(responseTimeCardDetails.data);
      fetchTimecardOpen();
      setTimeout(() => {
        calculateTotalTime();
      }, 400);
    } catch (error) {
      console.error(
        'Lỗi khi lấy thời gian từ API hoặc gửi dữ liệu lên server:',
        error,
      );
    }
  };
  function findConfigValue(configArray: any[], key: string) {
    const configItem = configArray.find((item) => item.config_key === key);
    return configItem ? configItem.config_value : null;
  }
  // nhấn nút kết thúc mỗi ngày
  const handleEndButtonClick = async (
    timecardID: any,
    timecard_open_time: string,
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
      let timecard_close_time = `${currentHour}:${String(
        currentMinutes,
      ).padStart(2, '0')}`;
      let timecard_time = '';
      const responseConfig = await axios.post('config');
      const configData = responseConfig.data;
      const opentimeValue = findConfigValue(configData, 'opentime');
      const closetimeValue = findConfigValue(configData, 'closetime');
      const openlunchValue = findConfigValue(configData, 'openlunch');
      const closelunchValue = findConfigValue(configData, 'closelunch');
      if (compareTime(timecard_open_time, timecard_close_time) == 0) {
        timecard_time = '00:00';
      } else if (compareTime(timecard_open_time, opentimeValue) != 1) {
        // bắt đầu trước 7:30
        if (compareTime(timecard_close_time, opentimeValue) != 1) {
          timecard_time = '00:00';
        } else if (compareTime(timecard_close_time, openlunchValue) != 1) {
          timecard_time = calculateTime(opentimeValue, timecard_close_time);
        } else if (compareTime(timecard_close_time, closelunchValue) != 1) {
          timecard_time = calculateTime(opentimeValue, openlunchValue);
        } else if (compareTime(timecard_close_time, closetimeValue) != 1) {
          timecard_time = addTimes(
            calculateTime(opentimeValue, openlunchValue),
            calculateTime(closelunchValue, timecard_close_time),
          );
        } else {
          timecard_time = addTimes(
            calculateTime(opentimeValue, openlunchValue),
            calculateTime(closelunchValue, closetimeValue),
          );
        }
      } else {
        //bắt đầu sau 7:30
        if (compareTime(timecard_open_time, openlunchValue) != 1) {
          // bắt đầu trước 11:30
          if (compareTime(timecard_close_time, openlunchValue) != 1) {
            timecard_time = calculateTime(
              timecard_open_time,
              timecard_close_time,
            );
          } else if (compareTime(timecard_close_time, closelunchValue) != 1) {
            timecard_time = calculateTime(timecard_open_time, openlunchValue);
          } else if (compareTime(timecard_close_time, closetimeValue) != 1) {
            timecard_time = addTimes(
              calculateTime(timecard_open_time, openlunchValue),
              calculateTime(closelunchValue, timecard_close_time),
            );
          } else {
            timecard_time = addTimes(
              calculateTime(timecard_open_time, openlunchValue),
              calculateTime(closelunchValue, closetimeValue),
            );
          }
        } else if (compareTime(timecard_open_time, closelunchValue) == 1) {
          // bắt đầu sau 13:00
          if (compareTime(timecard_open_time, closetimeValue) == 1) {
            timecard_time = '00:00';
          } else if (compareTime(timecard_close_time, closetimeValue) != 1) {
            timecard_time = calculateTime(
              timecard_open_time,
              timecard_close_time,
            );
          } else {
            timecard_time = calculateTime(timecard_open_time, closetimeValue);
          }
        } else {
          // bắt đầu trong khoảng 11:30-13:00
          if (compareTime(timecard_close_time, closelunchValue) != 1) {
            timecard_time = '00:00';
          } else if (compareTime(timecard_close_time, closetimeValue) != 1) {
            timecard_time = calculateTime(closelunchValue, timecard_close_time);
          } else {
            timecard_time = calculateTime(closelunchValue, closetimeValue);
          }
        }
      }
      let timecard_timeover = '00:00';
      if (compareTime(timecard_close_time, closetimeValue) == 1) {
        timecard_timeover = calculateTime(closetimeValue, timecard_close_time);
      }
      const dataTime = {
        id: timecardID,
        timecard_open: timecard_open_time,
        timecard_now: timecard_close_time,
        timecard_time: timecard_time,
        timecard_timeover: timecard_timeover,
      };

      try {
        const response = await axios.post('timecarddetails/update', {
          dataTime,
        });
        console.log(response.data);
        fetchTimecardOpen();
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };
  //load ngày lễ
  const [holidays, setHolidays] = useState<Holiday[] | undefined>();
  const fetchHolidays = async () => {
    try {
      const response = await axios.get('holidays');
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
      const response = await axios.get('dayoffs/getalluser/' + usersID);
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
      const response = await axios.post('dayoffs/update/' + id);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchDayoffs();
  };
  const deleteDayoffs = async (id: number) => {
    try {
      const response = await axios.post('dayoffs/delete/' + id);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchDayoffs();
  };

  //tổng số giờ
  const [totalTime, setTotalTime] = useState({ hours: '0', minutes: '0' });
  const [overTime, setOverTime] = useState({ hours: '0', minutes: '0' });
  const calculateTotalTime = () => {
    const timeDivs = document.querySelectorAll('.timecard_time');
    let totalHours = 0;
    let totalMinutes = 0;

    timeDivs.forEach((div) => {
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
    const formattedHours = totalHours.toString().padStart(2, '0');
    const formattedMinutes = totalMinutes.toString().padStart(2, '0');
    setTotalTime({ hours: formattedHours, minutes: formattedMinutes });

    const timeOver = document.querySelectorAll('.timecard_overtime');
    const timeOvers = document.querySelectorAll('.timecard_overtime');
    let overMinutes = 0;

    timeOver.forEach((div) => {
      if (div instanceof HTMLElement) {
        const timeStrings = div.innerText.trim();
        if (timeStrings && /^\d+:\d+$/.test(timeStrings)) {
          const [hourss, minutess] = timeStrings.split(':');
          const totalMinutesForRow =
            parseInt(hourss, 10) * 60 + parseInt(minutess, 10);

          // Làm tròn về phía dưới đến 30 phút gần nhất
          const roundedMinutes = Math.floor(totalMinutesForRow / 30) * 30;

          // Nếu số phút là 30, chuyển thành 0 và thêm 1 giờ
          if (roundedMinutes === 30 && totalMinutesForRow >= 60) {
            overMinutes += 60;
          } else {
            overMinutes += roundedMinutes;
          }
        }
      }
    });

    overMinutes = Math.floor(overMinutes / 30) * 30;
    const overHours = Math.floor(overMinutes / 60);
    overMinutes %= 60;
    const formattedOverHours = overHours.toString().padStart(2, '0');
    const formattedOverMinutes = overMinutes.toString().padStart(2, '0');
    setOverTime({ hours: formattedOverHours, minutes: formattedOverMinutes });
  };
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const handleUpdateComment = async (Id: number) => {
    try {
      const response = await axios.post('timecarddetails/updatecomment', {
        id: Id,
        comment: commentText,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchTimecardOpen();
    setTimeout(() => {
      calculateTotalTime();
    }, 400);
    closeModal();
  };
  const handleUpdateCommentDayoffs = async (id: number) => {
    try {
      const response = await axios.post('dayoffs/updatecomment/' + id, {
        comment: commentText,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
    fetchDayoffs();
    closeModal();
  };
  const handleChangeTimecards = async (id: number) => {
    const response = await axios.post('timecarddetails/updateall', {
      id: timecardID,
      timecard_open: timecard_open_time,
      timecard_close: timecardEnd,
      timecard_time: timecardTime,
      timecard_timeover: timecardOvertime,
      timecard_comment: timecardNote,
      editor: users.realname,
    });
    console.log(response.data);
    fetchTimecardOpen();
    setTimeout(() => {
      calculateTotalTime();
    }, 400);
    closeModaldelete();
  };
  const handleNewTimeCard = async () => {
    let day, month, year;
    if (timecardDateEdit !== null) {
      const dateParts = timecardDateEdit.split('-');
      day = dateParts[0];
      month = dateParts[1];
      year = dateParts[2];
    }
    const dataTimeCard = {
      timecard_year: year,
      user_id: usersID,
      timecard_month: month,
      timecard_day: day,
      timecard_date: timecardDateEdit,
      timecard_temp: 0,
      owner: users.realname,
    };
    const responseTimeCard = await axios.post('timecards/add', {
      dataTimeCard,
    });
    console.log(responseTimeCard.data);
    const dataTimeCardDetails = {
      id_groupwaretimecard: responseTimeCard.data.id_timecard,
      timecard_open: timecard_open_time,
      timecard_close: timecardEnd,
      timecard_time: timecardTime,
      timecard_timeover: timecardOvertime,
      timecard_timeinterval: timecardInterval,
      timecard_comment: timecardNote,
      editor: users.realname,
    };
    const responseTimeCardDetails = await axios.post('timecarddetails/addnew', {
      dataTimeCardDetails,
    });

    console.log(responseTimeCardDetails.data);
    fetchTimecardOpen();
    setTimeout(() => {
      calculateTotalTime();
    }, 400);
    closeModaldelete();
  };

  const [isload, setIsLoad] = useState(false);
  useEffect(() => {
    const isAdmin = users.roles === UserRole.ADMIN;
    const isManager = users.roles === UserRole.MANAGER;
    const isLeader = users.roles === UserRole.LEADER;
    if (isAdmin || isManager || isLeader) {
      setAdmin(true);
    }
  }, []);
  useEffect(() => {
    if (propsID) {
      setUsersID(propsID);
    } else {
      setUsersID(users.id);
    }
    setTimeout(() => {
      setIsLoad(true);
    }, 200);
  }, [propsID]);
  useEffect(() => {
    if (isload) {
      const fetchData = async () => {
        await Promise.all([
          fetchHolidays(),
          fetchDayoffs(),
          fetchTimecardOpen(),
        ]);
        setTimeout(() => {
          calculateTotalTime();
        }, 200);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        await Promise.all([
          fetchHolidays(),
          fetchDayoffs(),
          fetchTimecardOpen(),
        ]);
        setTimeout(() => {
          calculateTotalTime();
        }, 200);
      };
      fetchData();
    }
    setIsLoad(false);
  }, [isload]);
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
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
          `}
        >
          {(new Date(day).getMonth() + 1 === parseInt(selectedMonth) &&
            new Date(day).getFullYear() === parseInt(selectedYear)) ||
          (new Date(day).getMonth() + 1 === currentMonth &&
            new Date(day).getFullYear() === currentYear) ? (
            <>
              <td>
                {format(day, 'dd/MM')} ({weekdays[day.getDay()]})
              </td>
              <td>
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
                  startClick ? (
                    <button
                      className="btn btn--medium"
                      onClick={handleButtonClick}
                    >
                      Bắt đầu
                    </button>
                  ) : null
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
                        <div key={index} className="timecard_time">
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
                        <div key={index} className="timecard_overtime">
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
                    {isDayoff(day).status ? (
                      <a
                        onClick={(event) => {
                          openModal(isDayoff(day).id, isDayoff(day).note, true);
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
                                  openModal(
                                    item.id_groupwaretimecard,
                                    item.timecard_comment,
                                    false,
                                  );
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
                {isHoliday(day).isHoliday ? null : isDayoff(day).isDayoff ? (
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
                        <div key={index}>
                          {item.timecard_open !== null &&
                          item.timecard_open !== '' ? (
                            admin ? (
                              <>
                                <span
                                  className="btn btn--green btn--medium"
                                  onClick={(event) => {
                                    openModaldelete(
                                      item.id,
                                      item.timecard_date,
                                      item.timecard_open,
                                      item.timecard_close,
                                      item.timecard_time,
                                      item.timecard_timeover,
                                      item.timecard_timeinterval,
                                      item.timecard_comment,
                                      false,
                                      '',
                                    );
                                  }}
                                >
                                  Sửa giờ
                                </span>
                                <p>{item.editor}</p>
                              </>
                            ) : null
                          ) : null}
                        </div>
                      ))}
                  </>
                ) : admin ? (
                  <>
                    <span
                      className="btn btn--green btn--medium"
                      onClick={(event) => {
                        openModaldelete(
                          0,
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          '',
                          true,
                          format(day, 'dd-MM-yyyy'),
                        );
                      }}
                    >
                      Sửa giờ
                    </span>
                  </>
                ) : null}
              </td>
            </>
          ) : null}
        </tr>
      ))}

      <tr>
        <td> Tổng số giờ</td>
        <td></td>
        <td></td>
        <td>
          {totalTime.hours}:{totalTime.minutes}
        </td>
        <td>
          {overTime.hours}:{overTime.minutes}
        </td>
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
          <Modaldelete
            isOpen={isDeleteModalOpen}
            onRequestClose={closeModaldelete}
          >
            <h2 className="mb15">
              Sửa thẻ giờ ngày: {timecardDate}
              {timecardDateEdit}
            </h2>
            <table className="table-modal">
              <tbody>
                <tr>
                  <td>Giờ bắt đầu</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={timecard_open_time}
                      onChange={(e) => settimecard_open_time(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giờ kết thúc</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={timecardEnd}
                      onChange={(e) => setTimecardEnd(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giờ làm việc</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={timecardTime}
                      onChange={(e) => setTimecardTime(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Ngoài giờ</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={timecardOvertime}
                      onChange={(e) => setTimecardOvertime(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Giờ nghỉ trưa</td>
                  <td>
                    <input
                      type="text"
                      defaultValue={timecardInterval}
                      onChange={(e) => setTimecardInterval(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Ghi chú</td>
                  <td>
                    <textarea
                      defaultValue={timecardNote}
                      onChange={(e) => setTimecardNote(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="wrp-button">
              <button
                className="btn btn--green"
                onClick={(event) => {
                  isOpenModal
                    ? handleNewTimeCard()
                    : handleChangeTimecards(timecardID);
                }}
              >
                Đồng ý
              </button>
              <button className="btn btn--orange" onClick={closeModaldelete}>
                Hủy
              </button>
            </div>
          </Modaldelete>
        </td>
      </tr>
    </>
  );
};

export default CTableTimeCardBody;
