import React, { useEffect , useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format ,isToday , isSameDay } from 'date-fns';
import { ButtonPrimary, ButtonSecondary ,ButtonThird, ButtonEdited} from '../../Button/Button';



let DatabaseTable_Rows = () => {


  let firstDayOfMonth = startOfMonth(new Date()); // ngày đầu tháng
  let lastDayOfMonth = endOfMonth(new Date());   // ngày cuối cùng của tháng

  let daysOfMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  // Thêm một số ngày vào đầu tiên của danh sách để nó hiển thị ở cột đầu tiên
  let paddingDays = Array.from({ length: firstDayOfMonth.getDay() }, (_, index) =>
    new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), index + 1 - firstDayOfMonth.getDay())
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
 

    // let rows = Array.from({ length: rowCount }, (_, rowIndex) => rowIndex + 1);
    // let Addclass_Rows = ['', '', '', '', '', '', '', '', '', ''];
    // let Addclass_Events = ['', 'sunday', 'holiday', 'accrept', 'cancel', 'saturday', '', '', '', ''];


    const [showStartButton, setShowStartButton] = useState(true);
   const [showEndButton, setShowEndButton] = useState(false);

  const handleEndButtonClick = () => {
    // Xử lý các tác vụ khi click vào nút kết thúc
    // Ví dụ: Ẩn nút kết thúc
     setShowStartButton(false);
    setShowEndButton(false);
  };
	
	 // State để lưu số giờ khi click vào nút
	const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

    const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
	// Hàm xử lý khi click vào nút
	const handleButtonClick = () => {

		setHours(currentHour);
    setMinutes(currentMinutes);

    setShowEndButton(true);
     setShowStartButton(false);

     
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



    const isHoliday = (date: number | Date) => holidays.some((holiday) => isSameDay(date, holiday));
  const [holidays, setHolidays] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 10, 1), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);

  const accreptLeave = (date: number | Date) => accreptLeaves.some((accrept) => isSameDay(date, accrept));
 const [accreptLeaves, setAccreptLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 10, 15), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);

  const isCancelLeave = (date: number | Date) => cancelLeave.some((cancel) => isSameDay(date, cancel));
 const [cancelLeave, setCancelLeave] = useState([
    // Đưa các ngày nghỉ mẫu vào đây, ví dụ:
    new Date(2023, 10, 22), // 1/12/2023
    // new Date(2023, 11, 15), // 15/12/2023
  ]);
  


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
					<td>
            {isToday(day) && showStartButton  ?  <button className="btn btn--medium" onClick={handleButtonClick}>Bắt đầu</button> : ''}

					</td>
					<td>
            {isToday(day) && showEndButton ?  <button className="btn btn--orange btn--medium" onClick={handleEndButtonClick} >Kết thúc</button> : ''}
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