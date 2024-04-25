
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';


import '../../Module/moduleSCSS.scss';

const C_TotalExpenseReport = () => {
    const [total, setTotal] = useState(0);
    const [totalPriceNotTax, setTotalPriceNotTax] = useState<number>(0);
    const [totalpriceTax, setTotalPriceTax] = useState(0);


    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--04 table_custom'>
                    <table>
                        <tbody>
                            <tr>
                                <th className='rowspan'>小計</th>
                                <td>{totalPriceNotTax.toLocaleString()}</td>
                                <td>{totalpriceTax.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th className='rowspan'>合計（税込）</th>
                                <td colSpan={2}>{(totalPriceNotTax + totalpriceTax).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default C_TotalExpenseReport;
