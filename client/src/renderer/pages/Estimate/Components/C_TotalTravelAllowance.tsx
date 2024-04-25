
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';


import '../../Module/moduleSCSS.scss';

const C_TotalTravelAllowance = () => {
    const [total, setTotal] = useState(0);




    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const calculateTotalSum = (array: number[]) => {
        const validValues = array.filter((value) => !isNaN(value)); // Lọc các giá trị không phải là số
        return validValues.reduce((total, value) => total + value, 0);
    };

    // Tính tổng cho monthlyticket và roundtrip


    return (
        <>
            <div className="table ">
                <div className="tbl_custom--04 tbl_width tbl_right">
                    <table>
                        <tbody>
                            <tr>
                                <th className="rowspan" rowSpan={2}>     合計     </th>
                                {/* <td>{totalMonthlyTicket !== 0 ? formatNumberWithCommas(totalMonthlyTicket) : '0'}</td> */}
                                <td>0</td>
                            </tr>
                            <tr>
                                {/* <td>{totalRoundtrip !== 0 ? formatNumberWithCommas(totalRoundtrip) : '0'}  </td> */}
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default C_TotalTravelAllowance;
