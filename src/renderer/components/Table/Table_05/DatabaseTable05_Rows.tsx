import React, { useEffect , useState } from 'react';
import MonthYearSelector from '../SelectMonthYears';

let DatabaseTable05_Rows = () => {


    return(
        <>
		<tr>
			<td>Huỳnh Thị Thanh Tuyền</td>
			<td>Năng Lương</td>
			<td>Thành Viên</td>
			<td><MonthYearSelector /></td>
			<td><button className="btn">Xem thẻ giờ</button></td>
			<td><button className="btn btn--green">Xuất thẻ giờ</button></td>
		</tr>
          <tr>
			<td>Huỳnh Thị Thanh Tuyền</td>
			<td>Năng Lương</td>
			<td>Thành Viên</td>
			<td><MonthYearSelector /></td>
			<td><button className="btn">Xem thẻ giờ</button></td>
			<td><button className="btn btn--green">Xuất thẻ giờ</button></td>
		</tr>
        </>
    )
} 

export default DatabaseTable05_Rows;


