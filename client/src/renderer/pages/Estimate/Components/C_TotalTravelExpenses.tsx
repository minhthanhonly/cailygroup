
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';


import '../../Module/moduleSCSS.scss';

const C_TotalTravelExpenses = () => {
    const [total, setTotal] = useState(0);


    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--04 tbl_width tbl_right'>
                    <table>
                        <tbody>
                            <tr>
                                <th>合計金額</th>
                                <td>{formatNumberWithCommas(total)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default C_TotalTravelExpenses;
