
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';


import '../../Module/moduleSCSS.scss';

const C_TotalPriceBusinessReport = () => {
    const [total, setTotal] = useState(0);
    const [inputValue, setInputValue] = useState<number>(0);
    const [inputDate, setInputDate] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value.replace(/,/g, ''));
        setInputValue(isNaN(newValue) ? 0 : newValue);

    };
    const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue1 = parseFloat(event.target.value.replace(/,/g, ''));
        setInputDate(isNaN(newValue1) ? 0 : newValue1);

    };

    // tính tổng
    const calculatedPrice = inputDate * 3000;
    const finalPayment = totalSum - inputValue;

    const finalTotalPrice = finalPayment + calculatedPrice;
    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--04 tbl_width tbl_right'>
                    <table>
                        <tbody>
                            <tr>
                                <th>仮払金差引合計</th>
                                <td>{formatNumberWithCommas(finalPayment)}</td>

                            </tr>
                            <tr>
                                <th>仮払金</th>
                                <td><input className='input_noboder numberInput' type="text" placeholder='金額を入力' value={formatNumberWithCommas(inputValue)} onChange={handleInputValueChange} /></td>
                            </tr>
                            <tr>
                                <th>出張手当</th>
                                <td><span>日当 3,000 × </span><input className='input_noboder w100 numberInput' type="text" placeholder='日数を入力' value={inputDate} onChange={handleInputPrice} /><span>日</span><span className="price">{formatNumberWithCommas(calculatedPrice)}</span> </td>
                            </tr>
                            <tr>
                                <th>精算額</th>
                                <td>{formatNumberWithCommas(finalTotalPrice)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default C_TotalPriceBusinessReport;
