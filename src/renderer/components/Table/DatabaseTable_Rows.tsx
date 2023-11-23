import React, { useEffect , useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';




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

  // Giả sử dữ liệu cho các cột khác
  const otherColumnData = [
    // Dữ liệu tương ứng với mỗi ngày
	 { format: (date: number | Date) => format(date, 'EEEE') }, // Định dạng ngày thành thứ
    // Ví dụ: [{ value: 'Data1' }, { value: 'Data2' }, ...]
  ];
  const Btnclick = [
	  <button className="btn btn--medium">Bắt đầu</button>
    // Dữ liệu tương ứng với mỗi ngày
	//  { format: (date: number | Date) => format(date, 'EEEE') }, // Định dạng ngày thành thứ
    // Ví dụ: [{ value: 'Data1' }, { value: 'Data2' }, ...]
  ];



    // let rows = Array.from({ length: rowCount }, (_, rowIndex) => rowIndex + 1);
    let Addclass_Rows = ['', '', '', '', '', '', '', '', '', ''];
    let Addclass_Events = ['', 'sunday', 'holiday', 'accrept', 'cancel', 'saturday', '', '', '', ''];
  


	
	 // State để lưu số giờ khi click vào nút
	const [hours, setHours] = useState(0);

	// Hàm xử lý khi click vào nút
	const handleButtonClick = () => {
		const currentHour = new Date().getHours();
		setHours(currentHour);
	};
	
    return(
        <>
    	 {allDays.map((day, rowIndex) => (
            <tr key={rowIndex} className={getDayClassName(day)}>
              {new Date(day).getMonth() === firstDayOfMonth.getMonth() ? (
                <>
                  <td>{format(day, 'dd/MM/yyyy')}</td>
                  {otherColumnData.map((column, colIndex) => (
					<td key={colIndex}>
						{column.format ? column.format(day) : '...'} {/* Sử dụng hàm định dạng nếu có */}
					</td>
					))}
					<td>
						<button className="btn btn--medium" onClick={handleButtonClick}>Bắt đầu</button>
						<span>{hours} giờ</span>
					</td>
					<td> </td>
					<td> </td>
					<td> </td>
					<td> </td>
					<td> </td>
					<td> </td>
                </>
              ) : null}
            </tr>
          ))}
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