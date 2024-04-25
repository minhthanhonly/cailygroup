
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker, { DateObject } from 'react-multi-date-picker';


import '../../Module/moduleSCSS.scss';

interface Row {
    id: number;
    date: string;
    railwayName: string;
    router: string;
    startroad: string;
    endroad: string;
    monthlyticket: number;
    roundtrip: number;
    note: string;
}

const C_TravelAllowance = () => {
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState([{ date: '', id: 0, railwayName: '', router: '', startroad: '', endroad: '', monthlyticket: 0, roundtrip: 0, note: '', },]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [monthlyticket, setmonthlyticket] = useState<string[]>(
        new Array(rows.length).fill(''),
    );
    const [roundtrip, setroundtrip] = useState<string[]>(
        new Array(rows.length).fill(''),
    );


    const handleLeaveDateChange = (_date: DateObject | DateObject[] | null) => {
        const newRows = [...rows];
        setRows(newRows);
    };
    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row,
    ) => {
        const { value } = event.target; setRows((prevRows) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });

        //   validateInput(value, field, index); // Truyền index vào hàm validateInput
    };
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: 'monthlyticket' | 'roundtrip',) => {
        let inputValue = event.target.value;
        // Loại bỏ các ký tự không phải số
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Kiểm tra xem giá trị sau khi loại bỏ ký tự không phải số có là chuỗi rỗng không
        if (inputValue === '') {
            // Nếu là chuỗi rỗng, có thể gán giá trị là 0 hoặc bất kỳ giá trị mặc định khác tùy theo yêu cầu của bạn
            inputValue = '0';
        }
    }
    const addRow = () => {
        const newRow = { id: rows.length, date: '', railwayName: '', router: '', startroad: '', endroad: '', monthlyticket: 0, roundtrip: 0, note: '', };
        setRows([...rows, newRow]);
    };
    return (
        <>
            <div className="table ">
                <div className="tbl_custom--03 boder-input">
                    <table>
                        <thead>
                            <tr>
                                <th>鉄道名</th>
                                <th>路線名</th>
                                <th className="w500">利用区間</th>
                                <th> 1ヵ月の定期代 <br />  (普通運賃往復の場合)</th>
                                <th>備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr>
                                    <td> {showDatePicker && (<DatePicker onChange={(_date) => handleLeaveDateChange(_date)} value={date} format="YYYY-MM-DD HH:mm:ss" />)}
                                        <input type="text" value={row.railwayName} onChange={(e) => handleInputChange(e, index, 'railwayName')} />
                                    </td>
                                    <td> <input type="text" value={row.router} onChange={(e) => handleInputChange(e, index, 'router')} />  </td>
                                    <td> {' '}
                                        <p className="grid-row grid--flex">
                                            {' '}<input className="width_auto" type="text" value={row.startroad} onChange={(e) => handleInputChange(e, index, 'startroad')} />{' '} ↔{' '} <input className="width_auto" type="text" value={row.endroad} onChange={(e) => handleInputChange(e, index, 'endroad')} />
                                        </p>
                                    </td>
                                    <td>
                                        <input className="numberInput" type="text" placeholder="税率を入力" value={monthlyticket[index]} onChange={(e) => handleNumberChange(e, index, 'monthlyticket')} />
                                        <input className="numberInput" type="text" placeholder="税率を入力" value={roundtrip[index]} onChange={(e) => handleNumberChange(e, index, 'roundtrip')} />
                                    </td>
                                    <td>
                                        <input className="input_noboder " value={row.note} onChange={(e) => handleInputChange(e, index, 'note')} placeholder="入力してください" type="text" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p onClick={addRow} className="plus-row"> 行を追加する </p>
                </div>
                {/* <div className="tbl_custom--04 tbl_width tbl_right">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="rowspan" rowSpan={2}>     合計     </th>
                                    <td>        {totalMonthlyTicket !== 0 ? formatNumberWithCommas(totalMonthlyTicket) : '0'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>   {totalRoundtrip !== 0 ? formatNumberWithCommas(totalRoundtrip) : '0'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
            </div>

        </>
    );
};

export default C_TravelAllowance;
