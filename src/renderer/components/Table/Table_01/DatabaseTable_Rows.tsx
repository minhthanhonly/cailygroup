import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { startOfMonth, endOfMonth, eachDayOfInterval, format ,isToday , isSameDay , differenceInMinutes } from 'date-fns';



let DatabaseTable_Rows = () => {

  const [currentTime, setCurrentTime] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showEndButton, setShowEndButton] = useState(false);
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);

   const fetchCurrentTime = async () => {
    try {
      const response = await axios.get('https://worldtimeapi.org/api/ip');
      const { datetime } = response.data;
      setCurrentTime(datetime);
    } catch (error) {
      console.error('Lỗi khi lấy thời gian hiện tại:', error);
    }
  };


  useEffect(() => {
    // Kiểm tra xem có dữ liệu trạng thái đã lưu trong localStorage không
   
    fetchCurrentTime();
  }, []); // useEffect chỉ chạy một lần sau khi component mount
  useEffect(() => {

    
    // Xử lý các hoạt động không đồng bộ ở đây
    // Cập nhật trạng thái theo cách cần thiết
  }, [/* dependencies */]);


  let firstDayOfMonth = startOfMonth(new Date()); // ngày đầu tháng
  let lastDayOfMonth = endOfMonth(new Date()); // ngày cuối cùng của tháng

  let daysOfMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
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

  let allDays = [...paddingDays, ...daysOfMonth];

  const getDayClassName = (date: Date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return 'sunday';
    if (dayOfWeek === 6) return 'saturday';
    // Các class khác nếu cần
    return '';
  };
 
 
  const otherColumnData = [
    { format: (date: number | Date) => format(date, 'EEEE') }, // Định dạng ngày thành thứ
  ];

  

	// useEffect(() => {
  //   calculateAndSetWorkingHours(startHours, startMinutes, endHours, endMinutes);
  //   calculateAndSetOvertime(startHours, startMinutes, endHours, endMinutes);
  // }, [startHours, startMinutes, endHours, endMinutes]);
	 // State để lưu số giờ khi click vào nút



	// Hàm xử lý khi click vào nút bắt đầu 
  const handleButtonClick = async () => {

     try {
      const response = await axios.get('https://worldtimeapi.org/api/ip');
      const { datetime } = response.data;
      const currentHour = new Date(datetime).getHours();
      const currentMinutes = new Date(datetime).getMinutes();
      
      console.log('currentMinutes', currentMinutes);
      console.log('currentHour', currentHour);
      
      setStartHours(currentHour);
      setStartMinutes(currentMinutes);
      setShowEndButton(true);
      setShowStartButton(false);

 

    // Lưu thời gian từ API vào cơ sở dữ liệu hoặc thực hiện các thao tác khác tùy thuộc vào yêu cầu của bạn.
    // Ví dụ: axios.post('/api/saveEndTime', { endTime: datetime });
    } catch (error) {
      console.error('Lỗi khi lấy thời gian từ API:', error);
    }
		
  };
  const handleEndButtonClick = async  () => {

    try {
    const response = await axios.get('https://worldtimeapi.org/api/ip');
    const { datetime } = response.data;
    const currentHour = new Date(datetime).getHours();
    const currentMinutes = new Date(datetime).getMinutes();

    // Thực hiện các thay đổi trạng thái
    setEndHours(currentHour);
    setEndMinutes(currentMinutes);

    // Ẩn nút "Bắt đầu" và "Kết thúc"
    setShowStartButton(false);
    setShowEndButton(false);

 

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
    new Date(2023, 10, 1), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
 const isHoliday = (date: number | Date) => holidays.some((holiday) => isSameDay(date, holiday));
  
 const [accreptLeaves, setAccreptLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 10, 15), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const accreptLeave = (date: number | Date) => accreptLeaves.some((accrept) => isSameDay(date, accrept));




 const [cancelLeave, setCancelLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 10, 22), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  const isCancelLeave = (date: number | Date) => cancelLeave.some((cancel) => isSameDay(date, cancel));
  



 // tính thời gian làm việc của ngày hôm đó 
const calculateWorkingHours = (startHours: number | undefined, startMinutes: number | undefined, endHours: number | undefined, endMinutes: number | undefined) => {
  const defaultWorkStart = new Date(0, 0, 0, 7, 30); // Thời gian bắt đầu tính giờ làm việc
  const defaultWorkEnd = new Date(0, 0, 0, 17, 0); // Thời gian kết thúc làm việc
  const lunchBreakStart = new Date(0, 0, 0, 11, 30); // Thời gian bắt đầu nghỉ trưa
  const lunchBreakEnd = new Date(0, 0, 0, 13, 0); // Thời gian kết thúc nghỉ trưa

  const start = new Date(0, 0, 0, startHours || 0, startMinutes || 0);
  const end = new Date(0, 0, 0, endHours || 0, endMinutes || 0);

  const workStart = start > defaultWorkStart ? start : defaultWorkStart;
  const workEnd = end < defaultWorkEnd ? end : defaultWorkEnd;

  if (workStart >= defaultWorkStart && workEnd <= defaultWorkEnd) {
    // Nếu thời gian bắt đầu và kết thúc nằm trong khoảng giờ làm việc
    const lunchBreakMinutes = (lunchBreakEnd.getTime() - lunchBreakStart.getTime()) / (1000 * 60);
    const differenceInMilliseconds = workEnd.getTime() - workStart.getTime() - lunchBreakMinutes * 60 * 1000;
     const workingMinutes = Math.max(1, Math.ceil(differenceInMilliseconds / (1000 * 60)));


    const hours = Math.floor(workingMinutes / 60);
    const minutes = workingMinutes % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}`;
  }

  // Nếu không nằm trong khoảng giờ làm việc từ 7 giờ 30 đến 17 giờ 00
  return '0:00';
};
 



// làm thời gian quá giờ.
const calculateOvertime = (startHours: number | undefined, startMinutes: number | undefined, endHours: number | undefined, endMinutes: number | undefined) => {
  const defaultOvertimeStart = new Date(0, 0, 0, 17, 0); // Thời gian bắt đầu tính giờ làm thêm

  const start = new Date(0, 0, 0, startHours, startMinutes);
  const end = new Date(0, 0, 0, endHours, endMinutes);

  // Nếu thời gian bắt đầu làm thêm sau thời gian kết thúc làm việc, đặt nó là thời gian kết thúc làm việc
  if (defaultOvertimeStart < start) {
    defaultOvertimeStart.setHours(end.getHours());
    defaultOvertimeStart.setMinutes(end.getMinutes());
  }

  if (end >= defaultOvertimeStart) {
    const differenceInMilliseconds = end.getTime() - defaultOvertimeStart.getTime();
    const totalOvertimeMinutes = Math.max(0, differenceInMilliseconds / (1000 * 60)); // Tính giờ làm thêm, không dưới 0

    const hours = Math.floor(totalOvertimeMinutes / 60);
    const minutes = totalOvertimeMinutes % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}`;
  }

  return '0:00';
};



// ------
 const calculateAndSetWorkingHours = (startHours: number | undefined, startMinutes: number | undefined, endHours: number | undefined, endMinutes: number | undefined) => {
  const workingHours = calculateWorkingHours(startHours, startMinutes, endHours, endMinutes);
  const totalWorkingMinutes = convertHoursToMinutes(workingHours);

  // Trừ đi thời gian nghỉ trưa (1 giờ 30 phút) 
  const adjustedWorkingMinutes = Math.max(0, totalWorkingMinutes - 90); 

  setTotalWorkingHours((prevTotal) => prevTotal + adjustedWorkingMinutes); 

  return formatMinutesToHours(adjustedWorkingMinutes);
  };  

  // làm thời gian quá giờ và cập nhật tổng
  const calculateAndSetOvertime = (startHours: number | undefined, startMinutes: number | undefined, endHours: number | undefined, endMinutes: number | undefined) => {
    const overtime = calculateOvertime(startHours, startMinutes, endHours, endMinutes);
    setTotalWorkingHours((prevTotal) => prevTotal + convertHoursToMinutes(overtime));
    return overtime;
  };

  // hàm chuyển đổi giờ thành phút để tính tổng
  const convertHoursToMinutes = (hours: string) => {
    const [hoursPart, minutesPart] = hours.split(':');
    return parseInt(hoursPart, 10) * 60 + parseInt(minutesPart, 10);
  };
  
  const formatMinutesToHours = (totalWorkingHours: number) => {
    const hours = Math.floor(totalWorkingHours / 60);  
    const minutes = totalWorkingHours % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  };


   

    return(
        <>
    	 {allDays.map((day, rowIndex) => (
            <tr key={rowIndex} className={`${getDayClassName(day)}${isToday(day) ? 'today' : '' } ${isHoliday(day) ? 'holiday' : ''} ${accreptLeave(day) ? 'accrept' : ''} ${isCancelLeave(day) ? 'cancel' : ''}`}>
              {new Date(day).getMonth() === firstDayOfMonth.getMonth() ? (
                <>
                  <td>{format(day, 'dd/MM/yyyy')}</td>
                  {otherColumnData.map((column, colIndex) => (
					<td key={colIndex}>
						{column.format ? column.format(day) : '...'} {/* Sử dụng hàm định dạng nếu có */}
					</td>
					))}
					<td className={`${startHours > 7 || (startHours === 7 && startMinutes > 30) ? 'late' : '' }`}>
						{isToday(day) && showStartButton  ?  <button className="btn btn--medium" onClick={handleButtonClick}>Bắt đầu</button> : ''}
						{isToday(day) && showStartButton === false ? <>{`${startHours}:${String(startMinutes).padStart(2, '0')}`}</> : ''}
                    
					</td>
					<td >
						{isToday(day) && showEndButton  ?  <button className="btn btn--orange btn--medium" onClick={handleEndButtonClick} >Kết thúc</button> : ''}
						{isToday(day) && showEndButton === false && showStartButton === false  ?  <>{`${endHours}:${String(endMinutes).padStart(2, '0')}`}</> : ''}
					</td>
					<td> 
						{isToday(day) && !showStartButton && !showEndButton ? (<>{calculateWorkingHours(startHours, startMinutes, endHours, endMinutes)}</> ) : ( '' )} 
						</td>
					<td> {isToday(day) && !showStartButton && !showEndButton ? (<>{calculateOvertime(startHours, startMinutes, endHours, endMinutes)}</> ) : ( '')} </td>
					<td>{isToday(day) && !showStartButton && !showEndButton ? (<>1:30</>) : ( '')} </td>
					<td><a className="btn btn--green btn--small icon icon--edit"><img src={require('../../../assets/images/icnedit.png')}  alt="edit" className="fluid-image" /></a></td>
					<td> </td>
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
                    {!showStartButton && !showEndButton ? (<>{formatMinutesToHours(totalWorkingHours)}</> ) : ( '')} </td>
            <td>00:00</td>
            <td></td>
            <td></td>
          </tr>
        </>
    )
} 

export default DatabaseTable_Rows;
