import { useEffect, useRef, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import moment from "moment";

import { DateObject } from 'react-multi-date-picker';


interface Row {
    id: number;
    項目: string;
    日付: string; // Thêm thuộc tính 'date' với kiểu string
    交通費: number;
    宿泊費: number;
    交際費: number;
    食費: number;
    その他: number;
    備考: string;
    合計: number;
    精算額: number;
}

export default function PriceBusinessReport(props) {
    const { callback } = props;
    const currentDate = moment().format('YYYY/MM/DD');
    const initialRows = callback ? callback.map((item: { id: any; 日付: any; 項目: any; 交通費: any; 宿泊費: any; 交際費: any; 食費: any; その他: any; 備考: any; 合計: any; 精算額: any; 仮払金: any; 日: any; }) => ({
        id: item.id,
        日付: item.日付,
        項目: item.項目,
        交通費: item.交通費,
        宿泊費: item.宿泊費,
        交際費: item.交際費,
        食費: item.食費,
        その他: item.その他,
        備考: item.備考,
        合計: item.合計,
        精算額: item.精算額,
        仮払金: item.仮払金,
        日: item.日,


    })) : [{ id: 0, 項目: '', 日付: currentDate, 交通費: 0, 宿泊費: 0, 交際費: 0, 食費: 0, その他: 0, 備考: '', 合計: 0, 精算額: 0, 日: 0, 仮払金: 0 }];

    const [rows, setRows] = useState<Row[]>(initialRows);
    const [日付, setDate] = useState(new Date());


    const [inputValue, setInputValue] = useState<number>(() => {
        const initialInputValue = callback ? parseFloat(callback.仮払金?.toString().replace(/[^0-9.-]+/g, '')) : 0;
        return initialInputValue ? 0 : initialInputValue;
    });

    const [inputDate, setInputDate] = useState<number>(() => {
        const initialInputDate = callback ? parseFloat(callback.日?.toString().replace(/[^0-9.-]+/g, '')) : 0;
        return initialInputDate ? 0 : initialInputDate;
    });


    useEffect(() => {
        if (callback) {
            const inputDate2 = callback.reduce((acc: any, item: { 日: any; }) => item.日, 0);
            const 仮払金2 = callback.reduce((acc: any, item: { 仮払金: any; }) => item.仮払金, 0);
            setInputValue(Number(仮払金2));
            setInputDate(Number(inputDate2));
            // const newRows: Row[] = [...rows];
            // const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
            // props.parentCallback(newRowsWithTotal); // callback props ve cha
        }
    }, []);
    // const [totalPriceDate, setPriceDate] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [finalPayment, setFinalPayment] = useState(0);
    const [finalTotalPrice, setFinalTotalPrice] = useState(0);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };

            const newTotal = calculateTotal(newRows); // Tính toán tổng mới
            // Thêm total vào mỗi đối tượng trong newRows
            const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: newTotal }));
            props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
            return newRowsWithTotal;
        });
    };

    const updateRow = (updatedRow: Row) => {
        // Tìm chỉ mục của dòng được cập nhật trong mảng rows
        const rowIndex = rows.findIndex(row => row.id === updatedRow.id);
        if (rowIndex !== -1) {
            // Tạo một bản sao của mảng rows
            const updatedRows = [...rows];
            // Cập nhật dòng tương ứng trong mảng rows với dữ liệu mới
            updatedRows[rowIndex] = updatedRow;
            // Cập nhật mảng rows với dữ liệu đã được cập nhật
            setRows(updatedRows);
            // Gọi hàm calculateTotalSum để tính toán lại tổng
            calculateTotalSum();
        }
    };
    const handleLeaveDateChange02 = (date: DateObject | DateObject[] | null, index: number) => {
        const newRows = [...rows];
        if (date && !Array.isArray(date)) { // Kiểm tra nếu date không phải là một mảng
            const normalDate = date.toDate(); // Chuyển đổi đối tượng ngày sang một đối tượng ngày thông thường
            newRows[index] = { ...newRows[index], 日付: moment(normalDate).format("YYYY/MM/DD HH:mm:ss") };
        }
        setRows(newRows);
    };

    // ham changed and reda

    const priceTraines = callback ? callback.map((item: { 交通費: { toLocaleString: () => any; }; }) => item.交通費.toLocaleString()) : new Array(rows.length).fill('');
    const priceHousees = callback ? callback.map((item: { 宿泊費: { toLocaleString: () => any; }; }) => item.宿泊費.toLocaleString()) : new Array(rows.length).fill('');
    const priceCustomeres = callback ? callback.map((item: { 交際費: { toLocaleString: () => any; }; }) => item.交際費.toLocaleString()) : new Array(rows.length).fill('');
    const priceEates = callback ? callback.map((item: { 食費: { toLocaleString: () => any; }; }) => item.食費.toLocaleString()) : new Array(rows.length).fill('');
    const priceOtheres = callback ? callback.map((item: { その他: { toLocaleString: () => any; }; }) => item.その他.toLocaleString()) : new Array(rows.length).fill('');
    const [priceTrain, setpriceTrain] = useState<string[]>(priceTraines);
    const [priceHouse, setpriceHouse] = useState<string[]>(priceHousees);
    const [priceCustomer, setpriceCustomer] = useState<string[]>(priceCustomeres);
    const [priceEat, setpriceEat] = useState<string[]>(priceEates);
    const [priceOther, setpriceOther] = useState<string[]>(priceOtheres);
    const [total, setTotal] = useState(0);
    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: '交通費' | '宿泊費' | '交際費' | '食費' | 'その他') => {
        let inputValue2 = event.target.value;
        // Loại bỏ các ký tự không phải số
        inputValue2 = inputValue2.replace(/[^0-9]/g, '');
        // Kiểm tra xem giá trị sau khi loại bỏ ký tự không phải số có là chuỗi rỗng không
        if (inputValue2 === '') {
            // Nếu là chuỗi rỗng, có thể gán giá trị là 0 hoặc bất kỳ giá trị mặc định khác tùy theo yêu cầu của bạn
            inputValue2 = '0';
        }
        const newValue = parseInt(inputValue2, 10);
        const formattedValue = newValue.toLocaleString();

        const newRows: Row[] = [...rows];
        const rowToUpdate = newRows[index];
        if (rowToUpdate) {
            rowToUpdate[field] = newValue;
            setRows(newRows);
            // const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
            // props.parentCallback(newRowsWithTotal); // callback props ve cha
        }

        if (field === '交通費') {
            const newpriceTrain = [...priceTrain];
            newpriceTrain[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setpriceTrain(newpriceTrain);
        } else if (field === '宿泊費') {
            const newpriceHouse = [...priceHouse];
            newpriceHouse[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setpriceHouse(newpriceHouse);
        } else if (field === '交際費') {
            const newpriceCustomer = [...priceCustomer];
            newpriceCustomer[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setpriceCustomer(newpriceCustomer);
        } else if (field === '食費') {
            const newpriceEat = [...priceEat];
            newpriceEat[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setpriceEat(newpriceEat);
        }
        else if (field === 'その他') {
            const newpriceOther = [...priceOther];
            newpriceOther[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setpriceOther(newpriceOther);
        }
    };

    const calculateRowTotal = (row: Row) => {
        return row.交通費 + row.宿泊費 + row.交際費 + row.食費 + row.その他; // Tạm thời chỉ tính tổng từ trường mealExpense
    };

    useEffect(() => {
        calculateTotal(rows);
    }, [rows]);

    const calculateTotal = (rows: Row[]) => {
        let sum = 0;
        rows.forEach(row => {
            sum += row.交通費 + row.宿泊費 + row.交際費 + row.食費 + row.その他;
        });
        setTotal(sum); // Cập nhật state total

        // Tính tổng của tất cả các hàng
        let totalRowsSum = 0;
        rows.forEach(row => {
            totalRowsSum += row.合計;
        });

        // const newRows: Row[] = [...rows];
        // const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
        // props.parentCallback(newRowsWithTotal); // callback props ve cha
        return sum;
    };

    const calculateTotalSum = () => {
        const newTotalSum = rows.reduce((acc, row) => {
            const valuesBeforeColumn5 = [row.交通費, row.宿泊費, row.交際費, row.食費, row.その他].slice(0, 5);
            const totalForRow = valuesBeforeColumn5.reduce((sum, currentValue) => sum + currentValue, 0);
            return acc + totalForRow;
        }, 0);
        // const newRows: Row[] = [...rows];
        // const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
        // props.parentCallback(newRowsWithTotal); // callback props ve cha
        setTotalSum(newTotalSum);


    };

    const calculateRowSum = (row: Row) => {
        const valuesBeforeColumn5 = [row.交通費, row.宿泊費, row.交際費, row.食費, row.その他].slice(0, 5);
        const totalForRow = valuesBeforeColumn5.reduce((acc, currentValue) => acc + currentValue, 0);

        return totalForRow;
    };

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleInputChangeGeneral = (event: React.ChangeEvent<HTMLInputElement>, type: 'value' | 'date') => {
        const newValue = parseFloat(event.target.value.replace(/,/g, ''));
        const valueToSet = isNaN(newValue) ? 0 : newValue;

        if (type === 'value') {
            setInputValue(valueToSet);
            const newRows: Row[] = [...rows];
            const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
            props.parentCallback(newRowsWithTotal); // callback props ve cha
            //  updateParentCallback(valueToSet, inputDate);
        } else if (type === 'date') {
            setInputDate(valueToSet);


            const newRows: Row[] = [...rows];
            const newRowsWithTotal = newRows.map(row => ({ ...row, 日: valueToSet, 仮払金: inputValue, 精算額: finalTotalPrice }));
            props.parentCallback(newRowsWithTotal); // callback props ve cha
            // updateParentCallback(inputValue, valueToSet);
        }
    };

    useEffect(() => {
        calculateTotalSum();
    }, [rows]); // Lắng nghe sự thay đổi của mảng rows ////


    useEffect(() => {
        const newCalculatedPrice = inputDate * 3000;
        const newFinalPayment = totalSum - inputValue;
        const newFinalTotalPrice = newFinalPayment + newCalculatedPrice;
        setCalculatedPrice(newCalculatedPrice);
        setFinalPayment(newFinalPayment);
        setFinalTotalPrice(newFinalTotalPrice);
        if (callback) {
            const newRows: Row[] = [...rows];
            const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: newFinalTotalPrice }));
            props.parentCallback(newRowsWithTotal);
        }

    }, [inputValue, inputDate, totalSum]);


    const addRow = () => {
        const newRow = { id: rows.length, 項目: '', 日付: currentDate, 交通費: 0, 宿泊費: 0, 交際費: 0, 食費: 0, その他: 0, 備考: '', 合計: 0, 精算額: 0 };
        setRows([...rows, newRow]);
        calculateTotalSum();
    };

    const handleDateChange = (date: any, index: number) => {
        const formattedDate = date.format('YYYY/MM/DD');
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index].日付 = formattedDate;
            const newRowsWithTotal = newRows.map(row => ({ ...row, 日: inputDate, 仮払金: inputValue, 精算額: finalTotalPrice }));
            props.parentCallback(newRowsWithTotal);
            return newRows;
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
                                    <td>
                                        <DatePicker
                                            value={row.日付 ? new Date(row.日付) : new Date()}
                                            onChange={(date) => handleDateChange(date, index)}
                                            format="YYYY/MM/DD"
                                        />
                                    </td>
                                    <td><input type="text" value={row.項目} onChange={(e) => handleInputChange(e, index, '項目')} placeholder='入力してください' /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceTrain[index]} onChange={(e) => handleNumberChange(e, index, '交通費')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceHouse[index]} onChange={(e) => handleNumberChange(e, index, '宿泊費')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceCustomer[index]} onChange={(e) => handleNumberChange(e, index, '交際費')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceEat[index]} onChange={(e) => handleNumberChange(e, index, '食費')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceOther[index]} onChange={(e) => handleNumberChange(e, index, 'その他')} /></td>
                                    <td>{formatNumberWithCommas(calculateRowSum(row))}</td>
                                    <td><input type="text" value={row.備考} onChange={(e) => handleInputChange(e, index, '備考')} placeholder='入力してください' /></td>
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
                                <th>仮払金差引合計</th>
                                <td>{formatNumberWithCommas(finalPayment)}</td>
                            </tr>
                            <tr>
                                <th>仮払金</th>
                                <td>
                                    <input
                                        className='input_noboder numberInput'
                                        type="text"
                                        placeholder='金額を入力'
                                        value={formatNumberWithCommas(inputValue)}
                                        onChange={(e) => handleInputChangeGeneral(e, 'value')}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>出張手当</th>
                                <td><span>日当 3,000 × </span> <input
                                    className='input_noboder w100 numberInput'
                                    type="text"
                                    placeholder='日数を入力'
                                    value={formatNumberWithCommas(inputDate)}
                                    onChange={(e) => handleInputChangeGeneral(e, 'date')}
                                /><span>日</span><span className="price">{formatNumberWithCommas(calculatedPrice)}</span> </td>
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
    )

}
