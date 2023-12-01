import React, { useEffect, useState } from 'react';
import MonthYearSelector from '../SelectMonthYears';


interface tableRows {
    Rows_count: number;
}

const handleDateChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
};


let CTable_Row = (Props: tableRows) => {


    let Count_Rows = Props.Rows_count;
    const rows = Array.from({ length: Count_Rows }, (_, colIndex) => colIndex + 1);


    return (
        <>
            <tr>
                {rows.map((item, index) => (
                    <>
                        {/* <td key={index}>{item}</td> */}

                    </>

                ))}
                <td><a className="btn btn--green btn--small icon icon--edit"><img src={require('../../../assets/images/icnedit.png')} alt="edit" className="fluid-image" /></a></td>
                <td><button className="btn btn--orange btn--small">huỷ</button> </td>
                <td><button className="btn btn--medium">xác nhận</button></td>
                <td><button className="btn btn--medium">cập nhật</button></td>
                <td><button className="btn btn--medium">Đăng Ký Nghỉ Phép</button></td>
                <td><span className='bg-red__btn'><button className='btn btn-white'>Hủy bỏ nghỉ phép</button></span></td>
                <td><p className="icon icon--edit"><img src={require('../../../assets/images/check.png')} alt="edit" className="fluid-image" /></p></td>
                <td> <div className='grid-row icon-flex' >
                    <p className="icon icon--save"><img src={require('../../../assets/images/diskette.png')} alt="edit" className="fluid-image" /></p><p className="icon icon--deleted"><img src={require('../../../assets/images/icndelete.png')} alt="edit" className="fluid-image" /></p>

                </div>
                </td>
            </tr>
            <tr>
                <td><input className='input__edit' type="text" value='12:12' /></td>
                <td><input className='input__edit' disabled type="text" value='12:12' /></td>
                <td><input className='input__edit' type="text" /></td>
                <td><input className='input__edit' type="text" /></td>

                <td><input className='input__edit' type="text" /></td>
                <td><MonthYearSelector onChange={handleDateChange} /></td>
                <td><input className='input__edit' type="text" /></td>
                <td><input className='input__edit' type="text" /></td>


            </tr>
        </>
    )
}

export default CTable_Row;



function setSelectedMonth(month: string) {
    throw new Error('Function not implemented.');
}

function setSelectedYear(year: string) {
    throw new Error('Function not implemented.');
}

