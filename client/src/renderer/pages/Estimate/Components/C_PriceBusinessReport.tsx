
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import '../../Module/moduleSCSS.scss';

interface Row {
    id: number;
    project: string;
    date: string; // Thêm thuộc tính 'date' với kiểu string
    priceTrain: number;
    priceHouse: number;
    priceCustomer: number;
    priceEat: number;
    priceOther: number;
    totalPrice: number;
    note: string;
}
const C_PriceBusinessReport = () => {
    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState<Row[]>([{ id: 0, project: '', date: '', priceTrain: 0, priceHouse: 0, priceCustomer: 0, priceEat: 0, priceOther: 0, totalPrice: 0, note: '' }]);
    const [priceTrain, setpriceTrain] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceHouse, setpriceHouse] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceCustomer, setpriceCustomer] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceEat, setpriceEat] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceOther, setpriceOther] = useState<string[]>(new Array(rows.length).fill(''));
    const [totalSum, setTotalSum] = useState<number>(0);

    const handleLeaveDateChange02 = (date: DateObject | DateObject[] | null, index: number) => {
        console.log("Date received:", date);
        const newRows = [...rows];
        if (date && !Array.isArray(date)) { // Kiểm tra nếu date không phải là một mảng
            const normalDate = date.toDate(); // Chuyển đổi đối tượng ngày sang một đối tượng ngày thông thường
            newRows[index] = { ...newRows[index], date: moment(normalDate).format("YYYY/MM/DD HH:mm:ss") };
        }
        setRows(newRows);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });


    };
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: 'priceTrain' | 'priceHouse' | 'priceCustomer' | 'priceEat' | 'priceOther') => {
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

        if (field === 'priceTrain') {
            const newpriceTrain = [...priceTrain];
            newpriceTrain[index] = formattedValue;
            setpriceTrain(newpriceTrain);
        } else if (field === 'priceHouse') {
            const newpriceHouse = [...priceHouse];
            newpriceHouse[index] = formattedValue;
            setpriceHouse(newpriceHouse);
        } else if (field === 'priceCustomer') {
            const newpriceCustomer = [...priceCustomer];
            newpriceCustomer[index] = formattedValue;
            setpriceCustomer(newpriceCustomer);
        } else if (field === 'priceEat') {
            const newpriceEat = [...priceEat];
            newpriceEat[index] = formattedValue;
            setpriceEat(newpriceEat);
        }
        else if (field === 'priceOther') {
            const newpriceOther = [...priceOther];
            newpriceOther[index] = formattedValue;
            setpriceOther(newpriceOther);
        }

    };
    const calculateTotalSum = () => {
        const newTotalSum = rows.reduce((acc, row) => {
            const valuesBeforeColumn5 = [row.priceTrain, row.priceHouse, row.priceCustomer, row.priceEat, row.priceOther].slice(0, 5);
            const totalForRow = valuesBeforeColumn5.reduce((sum, currentValue) => sum + currentValue, 0);
            return acc + totalForRow;
        }, 0);
        setTotalSum(newTotalSum);
    };
    const calculateRowSum = (row: Row) => {
        const valuesBeforeColumn5 = [row.priceTrain, row.priceHouse, row.priceCustomer, row.priceEat, row.priceOther].slice(0, 5);
        const totalForRow = valuesBeforeColumn5.reduce((acc, currentValue) => acc + currentValue, 0);
        return totalForRow;
    };
    useEffect(() => {
        calculateTotalSum();
    }, [rows]); // Lắng nghe sự thay đổi của mảng rows


    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const addRow = () => {
        const newRow = { id: rows.length, project: '', date: '', priceTrain: 0, priceHouse: 0, priceCustomer: 0, priceEat: 0, priceOther: 0, totalPrice: 0, note: '' };
        setRows([...rows, newRow]);
        calculateTotalSum();

    };
    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <table>
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>項目</th>
                                <th>交通費</th>
                                <th>宿泊費</th>
                                <th>交際費</th>
                                <th>食費</th>
                                <th>その他</th>
                                <th>合計</th>
                                <th>備考</th>

                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id}>
                                    <td><DatePicker onChange={(_date) => handleLeaveDateChange02(_date, index)} value={date} format="YYYY/MM/DD HH:mm:ss" /> </td>
                                    <td><input type="text" value={row.project} onChange={(e) => handleInputChange(e, index, 'project')} placeholder='入力してください' /></td>

                                    <td><input className="numberInput" type="text" placeholder='0' value={priceTrain[index]} onChange={(e) => handleNumberChange(e, index, 'priceTrain')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceHouse[index]} onChange={(e) => handleNumberChange(e, index, 'priceHouse')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceCustomer[index]} onChange={(e) => handleNumberChange(e, index, 'priceCustomer')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceEat[index]} onChange={(e) => handleNumberChange(e, index, 'priceEat')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceOther[index]} onChange={(e) => handleNumberChange(e, index, 'priceOther')} /></td>

                                    <td>{formatNumberWithCommas(calculateRowSum(row))}</td>

                                    <td><input type="text" value={row.note} onChange={(e) => handleInputChange(e, index, 'note')} placeholder='入力してください' /></td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                    <p onClick={addRow} className='plus-row'> 行を追加する</p>
                </div>

                {/* <div className='tbl_custom--04 tbl_width tbl_right'>
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
                </div> */}
            </div>
        </>
    );
};

export default C_PriceBusinessReport;
