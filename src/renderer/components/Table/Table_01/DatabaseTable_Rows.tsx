import React, { useEffect , useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format ,isToday , isSameDay , differenceInMinutes } from 'date-fns';



let DatabaseTable_Rows = () => {
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

    const [showStartButton, setShowStartButton] = useState(true);
   const [showEndButton, setShowEndButton] = useState(false);


	
	 // State để lưu số giờ khi click vào nút
   const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);

 


	// Hàm xử lý khi click vào nút bắt đầu 
  const handleButtonClick = () => {

		{startHours > 7 || (startHours === 7 && startMinutes > 30) ? ( <span className="red-text">(Late)</span> ) : null}
		const currentHour = new Date().getHours();
		const currentMinutes = new Date().getMinutes();

		
		
		setStartHours(currentHour);
		setStartMinutes(currentMinutes);

		setShowEndButton(true);
		setShowStartButton(false);
    };
  const handleEndButtonClick = () => {
    // Xử lý các tác vụ khi click vào nút kết thúc
    // Ví dụ: Ẩn nút kết thúc
       const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();



    setEndHours(currentHour);
    setEndMinutes(currentMinutes);
     setShowStartButton(false);
    setShowEndButton(false);



  };
 

    // State để theo dõi trạng thái mở rộng của các dòng
  const [expandedRows, setExpandedRows] = useState({});

  // State để lưu trữ ghi chú cho từng ngày
  const [noteByDate, setNoteByDate] = useState({});

  // Hàm để xử lý khi click vào nút "Ghi chú"
  // const handleNoteClick = (rowIndex, date) => {
  //   setExpandedRows((prevRows) => ({ ...prevRows, [rowIndex]: !prevRows[rowIndex] }));

  //   console.log("đã click ngày " + date);

  //   // Nếu bạn có dữ liệu hiện tại của ghi chú, bạn có thể set nó cho biến noteContent
  //   // setNoteContent(getCurrentNoteForDate(date));
  // };

  // Hàm để xử lý khi submit ghi chú mới
  // const handleNoteSubmit = (date) => {
  //   setExpandedRows({});
  //   // Xử lý logic để lưu ghi chú mới cho ngày
  //   // saveNewNoteForDate(date, noteContent);
  // };



   
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
						{isToday(day) && showEndButton === false && showStartButton === false  ?  <>{`${endHours}:${endMinutes}`}</> : ''}
					</td>
					<td> 8:00 </td>
					<td> </td>
					<td> </td>
					<td> <a className="btn btn--green btn--small icon icon--edit"><img src={require('../../../assets/images/icnedit.png')}  alt="edit" className="fluid-image" /></a></td>
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
            <td>72:00</td>
            <td>00:00</td>
            <td></td>
            <td></td>
          </tr>
        </>
    )
} 

export default DatabaseTable_Rows;

/* cất code
//  <>
//           {rows.map((index) => (
//             <tr key={index} className={Addclass_Events[index]} >
//                  {Database_Fake.map((object) => (
//                     <td className={Addclass_Rows[index]}>{object.data_Rows}</td>
//                     ))}
//             </tr>
//               ))}
//         </>








 const currentDate = new Date();
  	const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
	let current_day = currentDate.getDay();
	const rows = [];




	for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
	const dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString('en-US', { weekday: 'long' });

    rows.push(
		<>
		<tr key={day}>
			<td>{formattedDate}</td>
			<td>{dayOfWeek}</td>
			<td><input type="submit" name="timecard_close" value="Kết thúc" /></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>

	  </>
    );
  }


*/
