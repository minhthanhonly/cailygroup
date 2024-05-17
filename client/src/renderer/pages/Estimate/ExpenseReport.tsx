import { useEffect, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import moment from 'moment';


interface Params {
    id: string;
}
interface Row {
    id: number;
    route: string;
    paymentDestination: string;
    priceNotax: number;
    tax: number;
    check: boolean;
    total: number;
    note: string;
    totalrows: number;
}

export default function ExpenseReport(props) {


    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();

    const [date, setDate] = useState(new Date());
    // const [rows, setRows] = useState([{ id: 0, values: ['', ''] }]);
    const [rows, setRows] = useState<Row[]>([{ id: 0, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: false, note: '', total: 0, totalrows: 0 }]);
    const [total, setTotal] = useState(0);
    const [totalPriceNotTax, setTotalPriceNotTax] = useState<number>(0);
    const [totalpriceTax, setTotalPriceTax] = useState(0);
    const [priceNotax, setPriceNotax] = useState<string[]>(new Array(rows.length).fill(''));
    const [tax, setTax] = useState<string[]>(new Array(rows.length).fill(''));

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: 'priceNotax' | 'tax') => {
        let inputValue = event.target.value.replace(/[^0-9]/g, '');
        inputValue = inputValue === '' ? '0' : inputValue;

        const newValue = parseInt(inputValue, 10);
        const formattedValue = newValue.toLocaleString();

        const newRows: Row[] = [...rows];
        const rowToUpdate = newRows[index];
        if (rowToUpdate) {
            rowToUpdate[field] = newValue;
            rowToUpdate.total = rowToUpdate.priceNotax + rowToUpdate.tax;
            setRows(newRows);
        }

        if (field === 'priceNotax') {
            const newPriceNotax = [...priceNotax];
            newPriceNotax[index] = formattedValue;
            newRows[index].totalrows = calculateRowTotal(newRows[index]);
            setPriceNotax(newPriceNotax);
        } else if (field === 'tax') {
            const newTax = [...tax];
            newTax[index] = formattedValue;
            newRows[index].totalrows = calculateRowTotal(newRows[index]);
            setTax(newTax);
        }

        const total = newRows.reduce((acc, row) => acc + row.priceNotax, 0);
        const total2 = newRows.reduce((acc, row) => acc + row.tax, 0);
        setTotalPriceNotTax(total);
        setTotalPriceTax(total2);

        const totalTaxIncluded = total + total2;
        //props.parentCallback({ rows: newRows, total: totalTaxIncluded.toLocaleString() });
    };

    const calculateRowTotal = (row: Row) => {
        return row.priceNotax + row.tax; // Tạm thời chỉ tính tổng từ trường mealExpense
    };

    useEffect(() => {
        calculateTotal(rows);
    }, [rows]);

    const calculateTotal = (rows: Row[]) => {
        let sum = 0;
        rows.forEach(row => {
            sum += row.priceNotax + row.tax;
        });
        setTotal(sum); // Cập nhật state total

        // Tính tổng của tất cả các hàng
        let totalRowsSum = 0;
        rows.forEach(row => {
            totalRowsSum += row.totalrows;
        });

        return sum;
    };


    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };


    // thêm
    const addRow = () => {
        const newRow: Row = { id: rows.length, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: false, note: '', total: 0, totalrows: 0 };
        setRows(prevRows => [...prevRows, newRow]);
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };

            const totalTaxIncluded = totalPriceNotTax + totalpriceTax;
            // Thêm total vào mỗi đối tượng trong newRows
            const newRowsWithTotal = newRows.map(row => ({ ...row, total: totalTaxIncluded }));
            props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
            // props.parentCallback(newRows, total: totalTaxIncluded.toLocaleString() });
            // props.parentCallback(newRows); // callback props ve cha

            return newRowsWithTotal; // Trả về một giá trị từ hàm setRows
        });
    };




    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(0));

    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckedState = [...checkedState];
        newCheckedState[index] = isChecked;

        setCheckedState(newCheckedState);
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], check: isChecked };
        setRows(newRows);

        console.log("Checked state updated: ", newCheckedState);
    };

    return (
        <>
            {/* <h2 className="hdglv2"><span>交通費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p> */}

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
                                    <td className='tdCheckbox form-checkbox'>
                                        {/* <input type="checkbox" name="checkbox" id="checkbox" onChange={(e) => handleCheckboxChange(index, e)} checked={checkedState[index]} /> */}
                                        <input
                                            className="custom-check-box"
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={checkedState[index]}
                                            onChange={(e) => handleCheckboxChange(index, e)}
                                        />
                                        <label htmlFor={`checkbox-${index}`}></label>
                                    </td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'note')} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p onClick={addRow} className='plus-row'> 行を追加する</p>
                </div>

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
    )

}
