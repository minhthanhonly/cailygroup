
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from 'react-multi-date-picker';

import '../../Module/moduleSCSS.scss';

interface Row {
    id: number;
    route: string;
    paymentDestination: string;
    priceNotax: number;
    tax: number;
    check: number;
    note: string;
}

const C_ExpenseReport = () => {
    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState<Row[]>([{ id: 0, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: 0, note: '' }]);
    const [priceNotax, setPriceNotax] = useState<string[]>(new Array(rows.length).fill(''));
    const [tax, setTax] = useState<string[]>(new Array(rows.length).fill(''));
    const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(0));
    const [totalPriceNotTax, setTotalPriceNotTax] = useState<number>(0);
    const [totalpriceTax, setTotalPriceTax] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });

        // validateInput(value, field, index); // Truyền index vào hàm validateInput
    };

    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };


    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: 'priceNotax' | 'tax') => {
        let inputValue = event.target.value;
        // Loại bỏ các ký tự không phải số
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Kiểm tra xem giá trị sau khi loại bỏ ký tự không phải số có là chuỗi rỗng không
        if (inputValue === '') {
            // Nếu là chuỗi rỗng, có thể gán giá trị là 0 hoặc bất kỳ giá trị mặc định khác tùy theo yêu cầu của bạn
            inputValue = '0';
        }

        const newValue = parseInt(inputValue, 10);
        const formattedValue = newValue.toLocaleString();

        const newRows: Row[] = [...rows];
        const rowToUpdate = newRows[index];
        if (rowToUpdate) {
            rowToUpdate[field] = newValue;
            setRows(newRows);
        }

        if (field === 'priceNotax') {
            const newPriceNotax = [...priceNotax];
            newPriceNotax[index] = formattedValue;
            setPriceNotax(newPriceNotax);
        } else if (field === 'tax') {
            const newTax = [...tax];
            newTax[index] = formattedValue;
            setTax(newTax);
        }

        const total = newRows.reduce((acc, row) => acc + row.priceNotax, 0);
        const total2 = newRows.reduce((acc, row) => acc + row.tax, 0);
        setTotalPriceNotTax(total);
        setTotalPriceTax(total2);
    };

    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckedState = [...checkedState];
        newCheckedState[index] = isChecked ? 0 : 1;
        setCheckedState(newCheckedState);
    };

    // thêm
    const addRow = () => {
        const newRow: Row = { id: rows.length, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: 0, note: '' };
        setRows(prevRows => [...prevRows, newRow]);
    };
    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <table>
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>内容</th>
                                <th>支払先</th>
                                <th>金額（税抜）</th>
                                <th>消費税</th>
                                <th>軽減税率</th>
                                <th>備考</th>

                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id}>
                                    <td> <DatePicker onChange={(_date) => handleLeaveDateChange()} value={date} format="YYYY-MM-DD HH:mm:ss" /></td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'route')} /></td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'paymentDestination')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceNotax[index]} onChange={(e) => handleNumberChange(e, index, 'priceNotax')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={tax[index]} onChange={(e) => handleNumberChange(e, index, 'tax')} /></td>
                                    <td className='tdCheckbox'>
                                        <input type="checkbox" id={`checkbox-${index}`} checked={checkedState[index]} onChange={(e) => handleCheckboxChange(index, e)} />
                                        <label htmlFor={`checkbox-${index}`}></label>
                                    </td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'note')} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p onClick={addRow} className='plus-row'> 行を追加する</p>
                </div>


                {/* <div className='tbl_custom--04 table_custom'>
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
                </div> */}

            </div>
        </>
    );
};

export default C_ExpenseReport;
