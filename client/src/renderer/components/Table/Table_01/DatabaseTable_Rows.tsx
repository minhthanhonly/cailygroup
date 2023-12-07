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

interface SelectMY {
  selectedMonth: string;
  selectedYear: string;
  daysInMonth: Date[];
}

interface RollAdmin {
  admin?: boolean;
}

// Định nghĩa props có kiểu là sự kết hợp của cả hai interfaces
interface CombinedProps extends SelectMY, RollAdmin { }

let DatabaseTable_Rows = (Props: CombinedProps) => {
  // const [selectedMonth, setSelectedMonth] = useState(Props.selectedMonth);
  // const [selectedYear, setSelectedYear] = useState(Props.selectedYear);
  const [daysInMonth, setDaysInMonth] = useState(Props.daysInMonth);

  const selectedMonth = Props.selectedMonth;
  const selectedYear = Props.selectedYear;
  const admin = Props.admin;

  console.log('admin', admin);

  const [currentTime, setCurrentTime] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showEndButton, setShowEndButton] = useState(false);
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0); // Sửa thành totalWorkingHours
  const [totalWorkingHoursInMonth, setTotalWorkingHoursInMonth] = useState(0);
  const yourDateObject = new Date();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
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

  // Hàm xử lý khi click vào nút bắt đầu
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      const { datetime } = response.data;
      const currentHour = new Date(datetime).getHours();
      const currentMinutes = new Date(datetime).getMinutes();
      setStartHours(currentHour);
      setStartMinutes(currentMinutes);
      setShowEndButton(true);
      setShowStartButton(false);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };
  const handleEndButtonClick = async () => {
    try {
      const response = await axios.get(
        'http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh',
      );
      const { datetime } = response.data;
      const currentHour = new Date(datetime).getHours();
      const currentMinutes = new Date(datetime).getMinutes();

      // Thực hiện các thay đổi trạng thái
      setEndHours(currentHour);
      setEndMinutes(currentMinutes);

      // Ẩn nút "Bắt đầu" và "Kết thúc"
      setShowStartButton(false);
      setShowEndButton(false);

      const updatedWorkingHours = calculateAndSetWorkingHours(
        startHours,
        startMinutes,
        currentHour,
        currentMinutes,
      );

      // Lưu thời gian từ API vào cơ sở dữ liệu hoặc thực hiện các thao tác khác tùy thuộc vào yêu cầu của bạn.
      // Ví dụ: axios.post('/api/saveEndTime', { endTime: datetime });
    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
  };

  // State để theo dõi trạng thái mở rộng của các dòng
  const [expandedRows, setExpandedRows] = useState({});

  // State để lưu trữ ghi chú cho từng ngày
  const [noteByDate, setNoteByDate] = useState({});

  const [holidays, setHolidays] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 11, 11), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const isHoliday = (date: number | Date) =>
    holidays.some((holiday) => isSameDay(date, holiday));

  const [accreptLeaves, setAccreptLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 11, 15), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const accreptLeave = (date: number | Date) =>
    accreptLeaves.some((accrept) => isSameDay(date, accrept));

  const [cancelLeave, setCancelLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 11, 22), // 1/12/2023
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

  // tính thời gian làm việc của ngày hôm đó
  const calculateWorkingHours = (
    startHours: number | undefined,
    startMinutes: number | undefined,
    endHours: number | undefined,
    endMinutes: number | undefined,
  ) => {
    const defaultWorkStart = new Date(0, 0, 0, 7, 30); // Thời gian bắt đầu tính giờ làm việc
    const defaultWorkEnd = new Date(0, 0, 0, 17, 0); // Thời gian kết thúc làm việc
    const start = new Date(0, 0, 0, startHours || 0, startMinutes || 0);
    const end = new Date(0, 0, 0, endHours || 0, endMinutes || 0);
    const workStart = start > defaultWorkStart ? start : defaultWorkStart;
    const workEnd = end < defaultWorkEnd ? end : defaultWorkEnd;

    if (workStart >= defaultWorkStart && workEnd <= defaultWorkEnd) {
      // Nếu thời gian bắt đầu và kết thúc nằm trong khoảng giờ làm việc
      const differenceInMilliseconds = workEnd.getTime() - workStart.getTime();
      const workingMinutes = Math.max(
        1,
        Math.ceil(differenceInMilliseconds / (1000 * 60)),
      );
      const hours = Math.floor(workingMinutes / 60);
      const minutes = workingMinutes % 60;
      return `${hours}:${String(minutes).padStart(2, '0')}`;
    }

    // Nếu không nằm trong khoảng giờ làm việc từ 7 giờ 30 đến 17 giờ 00
    return '0:00';
  };

  // làm thời gian quá giờ.
  const calculateOvertime = (
    startHours: number | undefined,
    startMinutes: number | undefined,
    endHours: number | undefined,
    endMinutes: number | undefined,
  ) => {
    const defaultOvertimeStart = new Date(0, 0, 0, 17, 0); // Thời gian bắt đầu tính giờ làm thêm
    const start = new Date(0, 0, 0, startHours, startMinutes);
    const end = new Date(0, 0, 0, endHours, endMinutes);

    // Nếu thời gian bắt đầu làm thêm sau thời gian kết thúc làm việc, đặt nó là thời gian kết thúc làm việc
    if (defaultOvertimeStart < start) {
      defaultOvertimeStart.setHours(end.getHours());
      defaultOvertimeStart.setMinutes(end.getMinutes());
    }

    if (end >= defaultOvertimeStart) {
      const differenceInMilliseconds =
        end.getTime() - defaultOvertimeStart.getTime();
      const totalOvertimeMinutes = Math.max(
        0,
        differenceInMilliseconds / (1000 * 60),
      ); // Tính giờ làm thêm, không dưới 0
      const hours = Math.floor(totalOvertimeMinutes / 60);
      const minutes = totalOvertimeMinutes % 60;
      return `${hours}:${String(minutes).padStart(2, '0')}`;
    }

    return '0:00';
  };

  const calculateAndSetWorkingHours = (
    startHours: number | undefined,
    startMinutes: number | undefined,
    endHours: number | undefined,
    endMinutes: number | undefined,
  ) => {
    const workingHours = calculateWorkingHours(
      startHours,
      startMinutes,
      endHours,
      endMinutes,
    );
    const totalWorkingMinutes = convertHoursToMinutes(workingHours);

    // Trừ đi thời gian nghỉ trưa (1 giờ 30 phút)
    const adjustedWorkingMinutes = Math.max(0, totalWorkingMinutes);
    setTotalWorkingHours((prevTotal) => prevTotal + adjustedWorkingMinutes);
    setTotalWorkingHoursInMonth(
      (prevTotal) => prevTotal + adjustedWorkingMinutes,
    ); // Cập nhật tổng thời gian làm việc trong tháng
    return formatMinutesToHours(adjustedWorkingMinutes);
  };

  const formatMinutesToHours = (totalWorkingHours: number) => {
    const hours = Math.floor(totalWorkingHours / 60);
    const minutes = totalWorkingHours % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };

  const currentMonth = new Date().getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const currentYear = new Date().getFullYear();
  return (
    <>
      {allDays.map((day, rowIndex) => (
        <tr
          key={rowIndex}
          className={`${getDayClassName(day)}${isToday(day) ? 'today' : ''}${isHoliday(day) ? 'holiday bg-purple' : ''
            }${isWaiting(day) ? 'waiting bg-yellow' : ''}${accreptLeave(day) ? 'accrept bg-green' : ''
            }${isCancelLeave(day) ? 'cancel bg-red' : ''} `}
        >
          {(new Date(day).getMonth() + 1 === parseInt(selectedMonth) &&
            new Date(day).getFullYear() === parseInt(selectedYear)) ||
            (new Date(day).getMonth() + 1 === currentMonth &&
              new Date(day).getFullYear() === currentYear) ? (
            <>
              <td>{format(day, 'dd/MM/yyyy')}</td>
              {otherColumnData.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.format ? column.format(day) : '...'}
                </td>
              ))}
              <td
                className={`${startHours > 7 || (startHours === 7 && startMinutes > 30)
                  ? 'late'
                  : ''
                  }`}
              >
                {isToday(day) && showStartButton ? (
                  <button
                    className="btn btn--medium"
                    onClick={handleButtonClick}
                  >
                    Bắt đầu
                  </button>
                ) : (
                  ''
                )}
                {isToday(day) && showStartButton === false ? (
                  <>{`${startHours}:${String(startMinutes).padStart(
                    2,
                    '0',
                  )}`}</>
                ) : (
                  ''
                )}
              </td>
              <td>
                {isToday(day) && showEndButton ? (
                  <button
                    className="btn btn--orange btn--medium"
                    onClick={handleEndButtonClick}
                  >
                    Kết thúc
                  </button>
                ) : (
                  ''
                )}
                {isToday(day) &&
                  showEndButton === false &&
                  showStartButton === false ? (
                  <>{`${endHours}:${String(endMinutes).padStart(2, '0')}`}</>
                ) : (
                  ''
                )}
              </td>
              <td>
                {isToday(day) && !showStartButton && !showEndButton ? (
                  <>
                    {calculateWorkingHours(
                      startHours,
                      startMinutes,
                      endHours,
                      endMinutes,
                    )}
                  </>
                ) : (
                  ''
                )}
              </td>
              <td>
                {' '}
                {isToday(day) && !showStartButton && !showEndButton ? (
                  <>
                    {calculateOvertime(
                      startHours,
                      startMinutes,
                      endHours,
                      endMinutes,
                    )}
                  </>
                ) : (
                  ''
                )}{' '}
              </td>
              <td>
                {isToday(day) && !showStartButton && !showEndButton ? (
                  <>1:30</>
                ) : (
                  ''
                )}{' '}
              </td>
              <td>
                {accreptLeave(day) ? (
                  'Xác nhận nghỉ phép'
                ) : isCancelLeave(day) ? (
                  <>
                    Không xác nhận nghỉ phép{' '}
                    <a
                      onClick={openModal}
                      className="btn btn--green btn--small icon icon--edit"
                    >
                      <img
                        src={require('../../../assets/images/icnedit.png')}
                        alt="edit"
                        className="fluid-image"
                      />
                    </a>
                  </>
                ) : isHoliday(day) ? (
                  'Ngày Nghỉ lễ'
                ) : (
                  <a
                    onClick={openModal}
                    className="btn btn--green btn--small icon icon--edit"
                  >
                    <img
                      src={require('../../../assets/images/icnedit.png')}
                      alt="edit"
                      className="fluid-image"
                    />
                  </a>
                )}
              </td>
              <td> {admin == true && !isHoliday(day) && !getDayClassName(day) && !accreptLeave(day) ?
                <> <Button href="/" size='medium'>cập nhật</Button> <span className="icon icon--check"><img src={require('../../../assets/images/check.png')} alt="edit" className="fluid-image" /> </span> </> : ""} {isCancelLeave(day) && !admin === true ? <span className='bg-red__btn'><button className='btn btn-white'>Hủy bỏ nghỉ phép</button></span> : ''}</td>
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
          {!showStartButton && !showEndButton ? (
            <>{formatMinutesToHours(totalWorkingHoursInMonth)}</>
          ) : (
            ''
          )}
        </td>
        <td>00:00</td>
        <td></td>
        <td></td>
      </tr>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {
          <>
            <h3 className="hdglv3">Ghi Chú</h3>
            <textarea></textarea>
            <div className="wrp-button">
              <button className="btn">Xác nhận</button>
              <button className="btn btn--orange" onClick={closeModal}>
                Hủy
              </button>
            </div>
          </>
        }
      </Modal>
    </>
  );
};

export default DatabaseTable_Rows;
