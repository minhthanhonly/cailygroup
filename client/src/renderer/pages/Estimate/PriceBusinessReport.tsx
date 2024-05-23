import { useEffect, useRef, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
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

    const currentDate = moment().format('YYYY/MM/DD HH:mm:ss');

    const [rows, setRows] = useState<Row[]>([{ id: 0, 項目: '', 日付: currentDate, 交通費: 0, 宿泊費: 0, 交際費: 0, 食費: 0, その他: 0, 備考: '', 合計: 0, 精算額: 0, }]);
    const [日付, setDate] = useState(new Date());

    const [inputValue, setInputValue] = useState<number>(0);
    const [inputDate, setInputDate] = useState<number>(0);
    // const [totalPriceDate, setPriceDate] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const [addressDomesticForeign, setAddressDomesticForeign] = useState('');
    const [dateRange, setDateRange] = useState<{ dateStart: Date | null, dateEnd: Date | null }>({
        dateStart: 日付,
        dateEnd: 日付
    });

    const handleLeaveDateChange = (date: Date | null, type: 'start' | 'end') => {
        setDateRange(prevState => ({
            ...prevState,
            [type === 'start' ? 'dateStart' : 'dateEnd']: date
        }));
    };



    const handleInputChangeAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressDomesticForeign(event.target.value);
        // Đây là nơi bạn có thể thực hiện các xử lý khác dựa trên giá trị mới của inputText
    };

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


    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [finalPayment, setFinalPayment] = useState(0);
    const [finalTotalPrice, setFinalTotalPrice] = useState(0);






    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };



            const newRowsWithTotal = newRows.map(row => ({
                ...row, 精算額: finalTotalPriceState,
            }));

            props.parentCallback(newRowsWithTotal); // callback props ve cha
            return newRowsWithTotal; // Trả về một giá trị từ hàm setRows
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
        console.log("Date received:", date);
        const newRows = [...rows];
        if (date && !Array.isArray(date)) { // Kiểm tra nếu date không phải là một mảng
            const normalDate = date.toDate(); // Chuyển đổi đối tượng ngày sang một đối tượng ngày thông thường
            newRows[index] = { ...newRows[index], 日付: moment(normalDate).format("YYYY/MM/DD HH:mm:ss") };
        }
        setRows(newRows);
    };

    // ham changed and reda

    const [priceTrain, setpriceTrain] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceHouse, setpriceHouse] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceCustomer, setpriceCustomer] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceEat, setpriceEat] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceOther, setpriceOther] = useState<string[]>(new Array(rows.length).fill(''));

    const [total, setTotal] = useState(0);


    const newCalculatedPrice = inputDate * 3000;
    const newFinalPayment = totalSum - inputValue;
    const newFinalTotalPrice = newFinalPayment + newCalculatedPrice;
    useEffect(() => {


        setCalculatedPrice(newCalculatedPrice);
        setFinalPayment(newFinalPayment);
        setFinalTotalPrice(newFinalTotalPrice);
        setFinalTotalPriceState(newFinalTotalPrice);

        const newRowsWithTotal = rows.map(row => ({
            ...row,
            精算額: newFinalTotalPrice,
        }));

        setRows(newRowsWithTotal);
        props.parentCallback(newRowsWithTotal);
    }, [inputValue, inputDate, totalSum]);

    const [finalTotalPriceState, setFinalTotalPriceState] = useState(newFinalTotalPrice);

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: '交通費' | '宿泊費' | '交際費' | '食費' | 'その他') => {
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

        return sum;
    };

    const calculateTotalSum = () => {
        const newTotalSum = rows.reduce((acc, row) => {
            const valuesBeforeColumn5 = [row.交通費, row.宿泊費, row.交際費, row.食費, row.その他].slice(0, 5);
            const totalForRow = valuesBeforeColumn5.reduce((sum, currentValue) => sum + currentValue, 0);
            return acc + totalForRow;
        }, 0);
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
            //  updateParentCallback(valueToSet, inputDate);
        } else if (type === 'date') {
            setInputDate(valueToSet);
            // updateParentCallback(inputValue, valueToSet);
        }
    };



    useEffect(() => {
        setFinalTotalPriceState(newFinalTotalPrice);
    }, [newFinalTotalPrice]);

    // const updateParentCallback = (newValue: number, newPrice: number) => {

    //     const newCalculatedPrice = newPrice * 3000;
    //     console.log("newCalculatedPrice", newCalculatedPrice);
    //     const newFinalPayment = totalSum - newValue;
    //     console.log("newFinalPayment", newFinalPayment);

    //     const newFinalTotalPrice = newFinalPayment + newCalculatedPrice;
    //     console.log("newFinalTotalPrice", newFinalTotalPrice);


    //     setFinalTotalPriceState(newFinalTotalPrice);

    //     const newRowsWithTotal = rows.map(row => ({
    //         ...row,
    //         精算額: finalTotalPriceState,
    //     }));

    //     props.parentCallback(newRowsWithTotal);
    // };

    useEffect(() => {
        calculateTotalSum();
    }, [rows]); // Lắng nghe sự thay đổi của mảng rows ////  

    const addRow = () => {
        const newRow = { id: rows.length, 項目: '', 日付: currentDate, 交通費: 0, 宿泊費: 0, 交際費: 0, 食費: 0, その他: 0, 備考: '', 合計: 0, 精算額: 0 };
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
                                    <td><DatePicker onChange={(_date) => handleLeaveDateChange02(_date, index)} value={日付} format="YYYY/MM/DD HH:mm:ss" /> </td>
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
                                    value={inputDate}
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
