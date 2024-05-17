

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from 'moment';
import { toast } from "react-toastify";

interface Row {
    date: Date;
    id: number;
    route: string;
    boardingStation: string;
    alightingStation: string;
    mealExpense: number;
    note: string;
    totalrows: number;
}




export default function TravelExpenses(props) {

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();
    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState<Row[]>([{ date: new Date(), id: 0, route: '', boardingStation: '', alightingStation: '', mealExpense: 0, note: '', totalrows: 0 }]);
    const [total, setTotal] = useState(0);
    const [visibleErrors, setVisibleErrors] = useState<string[]>([]);

    const [mealExpenses, setMealExpenses] = useState<string[]>(new Array(rows.length).fill(''));

    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };

    // thêm
    const addRow = () => {
        const newRow: Row = { date: new Date(), id: rows.length, route: '', boardingStation: '', alightingStation: '', mealExpense: 0, note: '', totalrows: 0 };
        setRows(prevRows => [...prevRows, newRow]);
    };

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        calculateTotal(rows);
    }, [rows]);

    const calculateTotal = (rows: Row[]) => {
        let sum = 0;
        rows.forEach(row => {
            sum += row.mealExpense;
        });
        setTotal(sum); // Cập nhật state total

        // Tính tổng của tất cả các hàng
        let totalRowsSum = 0;
        rows.forEach(row => {
            totalRowsSum += row.totalrows;
        });

        return sum;
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/[^0-9]/g, '');

        if (inputValue === '') {
            inputValue = '0';
        }

        const newValue = parseInt(inputValue, 10);
        const formattedValue = newValue.toLocaleString();

        const newMealExpenses = [...mealExpenses];
        newMealExpenses[index] = formattedValue;
        setMealExpenses(newMealExpenses);

        const newRows: Row[] = [...rows];
        if (newRows[index]) {
            newRows[index].mealExpense = newValue;
            newRows[index].totalrows = calculateRowTotal(newRows[index]); // Cập nhật totalrows của hàng
            setRows(newRows);
        }
    };


    const calculateRowTotal = (row: Row) => {
        return row.mealExpense; // Tạm thời chỉ tính tổng từ trường mealExpense
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };

            const newTotal = calculateTotal(newRows); // Tính toán tổng mới
            // Thêm total vào mỗi đối tượng trong newRows
            const newRowsWithTotal = newRows.map(row => ({ ...row, total: newTotal }));
            props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
            return newRowsWithTotal;
        });
    };


    return (
        <>
            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <table>
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>路線</th>
                                <th>乗車駅</th>
                                <th>下車駅</th>
                                <th>金額</th>
                                <th>備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={row.id}>
                                    <td> <DatePicker onChange={(_date) => handleLeaveDateChange()} value={date} format="YYYY/MM/DD HH:mm:ss" /></td>
                                    <td><input type="text" value={row.route} onChange={(e) => handleInputChange(e, index, 'route')} placeholder='入力してください' /></td>
                                    <td><input type="text" value={row.boardingStation} onChange={(e) => handleInputChange(e, index, 'boardingStation')} placeholder='入力してください' /></td>
                                    <td><input type="text" value={row.alightingStation} onChange={(e) => handleInputChange(e, index, 'alightingStation')} placeholder='入力してください' /></td>
                                    <td><input className="numberInput" type="text" value={mealExpenses[index]} onChange={(e) => handleNumberChange(e, index)} placeholder='0' /></td>
                                    <td><input type="text" value={row.note} onChange={(e) => handleInputChange(e, index, 'note')} placeholder='入力してください' /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p onClick={addRow} className='plus-row'> 行を追加する</p>
                </div>

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
    )

};
