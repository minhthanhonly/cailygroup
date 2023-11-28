import React, { useEffect , useState } from 'react';


let DatabaseTable02_Rows = () => {


    return(
        <>
		<tr>
			<td>Huỳnh Thị Thanh Tuyền</td>
			<td>1</td>
			<td>7:30 - 16/11/2023</td>
			<td>17:00 - 16/11/2023</td>
			<td>Nghỉ Phép Năm</td>
			<td><button className="btn btn--orange btn--small">huỷ</button></td>
		</tr>
		<tr>
			<td>Huỳnh Thị Thanh Tuyền</td>
			<td>1</td>
			<td>7:30 - 16/11/2023</td>
			<td>17:00 - 16/11/2023</td>
			<td>Nghỉ Phép Năm</td>
			<td> <p className="icon icon--edit"><img src={require('../../../assets/images/check.png')}  alt="edit" className="fluid-image" /></p></td>
		</tr>
        </>
    )
} 

export default DatabaseTable02_Rows;



