

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
}

export const TravelExpenses = (props) => {

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();
    const [date, setDate] = useState(new Date());
    const [rows, setRows] = useState<Row[]>([{ date: new Date(), id: 0, route: '', boardingStation: '', alightingStation: '', mealExpense: 0, note: '' }]);
    const [total, setTotal] = useState(0);
    const [visibleErrors, setVisibleErrors] = useState<string[]>([]);


    const validateInput = (value: string, fieldName: string, index: number) => {
        const newVisibleErrors = [...visibleErrors];

        if (!value && !newVisibleErrors.includes(fieldName)) {
            newVisibleErrors.push(fieldName); // Thêm lỗi chỉ khi giá trị rỗng và lỗi chưa được hiển thị
        } else if (value && newVisibleErrors.includes(fieldName)) {
            // Loại bỏ lỗi nếu giá trị không rỗng và lỗi đã được hiển thị
            const errorIndex = newVisibleErrors.indexOf(fieldName);
            newVisibleErrors.splice(errorIndex, 1);
        }

        setVisibleErrors(newVisibleErrors);
    };

    const [mealExpenses, setMealExpenses] = useState<string[]>(new Array(rows.length).fill(''));

    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };

    // thêm
    const addRow = () => {
        const newRow: Row = { date: new Date(), id: rows.length, route: '', boardingStation: '', alightingStation: '', mealExpense: 0, note: '' };
        setRows(prevRows => [...prevRows, newRow]);
    };

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        calculateTotal();
    }, [rows]);

    const calculateTotal = () => {
        let sum = 0;
        rows.forEach(row => {
            sum += row.mealExpense;
        });
        setTotal(sum);
    };

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

        const newMealExpenses = [...mealExpenses];
        newMealExpenses[index] = formattedValue;
        setMealExpenses(newMealExpenses);

        const newRows: Row[] = [...rows];
        if (newRows[index]) {
            newRows[index].mealExpense = newValue;
            setRows(newRows);
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };

            console.log("newRows", newRows);


            props.parentCallback(newRows);

        });




    };


    const checkBeforeSave = (): boolean => {
        // Kiểm tra xem mỗi hàng có đầy đủ dữ liệu không
        const isValid = rows.every(row => (
            row.route && row.boardingStation && row.alightingStation && row.mealExpense && row.note
        ));

        if (!isValid) {
            toast.error('Vui lòng nhập đầy đủ các thông tin mỗi hàng.');
        }

        return isValid;
    };


    const [tableName, setTableName] = useState(0);



    const saveExpense = async (status: number) => {
        try {
            const isValid = checkBeforeSave();
            if (isValid) {
                const formattedTotal = formatNumberWithCommas(total);

                // Lặp qua mỗi dòng và gửi mỗi dòng dữ liệu là một yêu cầu POST riêng biệt
                await Promise.all(rows.map(async (row) => {
                    try {
                        const formattedDate = moment(row.date).format("YYYY/MM/DD HH:mm:ss");
                        const rowData = {
                            date: formattedDate,
                            route: row.route,
                            boardingStation: row.boardingStation,
                            alightingStation: row.alightingStation,
                            mealExpense: formatNumberWithCommas(row.mealExpense),
                            note: row.note,
                            total: formattedTotal,
                            tableName: tableName,
                            owner: users.realname,

                            id_status: status,
                        };

                        // Tạo object chứa key "rows" và mảng dữ liệu hàng
                        const rowsObject = {
                            rows: [rowData],
                            owner: users.realname,

                            id_status: status
                        };

                        console.log("rowsObject", rowsObject);



                    } catch (error) {
                        console.error('Error saving expense:', error);
                    }
                }));
            }
        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    };

    return (
        <>
            {visibleErrors.map((error, index) => (
                <div key={index}>{error} is required.</div>
            ))}
            {/* <h2 className="hdglv2"><span>交通費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p> */}

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
