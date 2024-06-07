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
    日付: string;
    内容: string;
    支払先: string;
    税抜: number;
    消費税: number;
    軽減税率: boolean;
    合計金額: number;
    備考: string;
    合計: number;
}

export default function ExpenseReport(props) {

    const { callback } = props;





    const [日付, setDate] = useState(new Date());
    const currentDate = moment().format('YYYY/MM/DD');


    const initialRows = callback ? callback.map((item: { id: any; 日付: any; 内容: any; 支払先: any; 税抜: any; 消費税: any; 軽減税率: any; 合計金額: any; 備考: any; 合計: any; TotalPriceNotTax2: any; TotalPriceTax2: any; }) => ({
        id: item.id,
        日付: item.日付,
        内容: item.内容,
        支払先: item.支払先,
        税抜: item.税抜,
        消費税: item.消費税,
        軽減税率: item.軽減税率,
        合計金額: item.合計金額,
        備考: item.備考,
        合計: item.合計,
        TotalPriceNotTax2: item.TotalPriceNotTax2,

        TotalPriceTax2: item.TotalPriceTax2,




    })) : [{ id: 0, 日付: currentDate, 内容: '', 支払先: '', 税抜: 0, 消費税: 0, 軽減税率: false, 備考: '', 合計金額: 0, 合計: 0, TotalPriceTax2: 0, TotalPriceNotTax2: 0, }];
    // const [rows, setRows] = useState([{ id: 0, values: ['', ''] }]);
    const [rows, setRows] = useState<Row[]>(initialRows);
    const [合計金額, setTotal] = useState(0);
    const [totalPriceNotTax, setTotalPriceNotTax] = useState<number>(0);
    const [totalpriceTax, setTotalPriceTax] = useState(0);




    useEffect(() => {
        if (callback) {
            // Tính tổng của TotalPriceNotTax2 và TotalPriceTax2 từ các phần tử trong callback
            const totalNotTax2 = callback.reduce((acc: any, item: { TotalPriceNotTax2: any; }) => item.TotalPriceNotTax2, 0);
            const totalTax2 = callback.reduce((acc: any, item: { TotalPriceTax2: any; }) => item.TotalPriceTax2, 0);
            // Cập nhật giá trị cho TotalPriceNotTax2 và TotalPriceTax2
            setTotalPriceNotTax(totalNotTax2);
            setTotalPriceTax(totalTax2);
            const totalTaxIncluded = totalTax2 + totalNotTax2;
            const newRows: Row[] = [...rows];
            // Thêm total vào mỗi đối tượng trong newRows
            const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: totalTaxIncluded, TotalPriceNotTax2: totalNotTax2, TotalPriceTax2: totalTax2 }));
            props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
        }
    }, []);


    const 税抜ses = callback ? callback.map((item: { 税抜: { toLocaleString: () => any; }; }) => item.税抜.toLocaleString()) : new Array(rows.length).fill('');
    const 消費税ses = callback ? callback.map((item: { 消費税: { toLocaleString: () => any; }; }) => item.消費税.toLocaleString()) : new Array(rows.length).fill('');
    const checkedStateses = callback ? callback.map((item: { 軽減税率: boolean; }) => item.軽減税率) : [];
    //const 日付ses = callback ? callback.map((item: { 日付: string }) => moment(item.日付).toDate()) : new Array(rows.length).fill(new Date());


    const [checkedState, setCheckedState] = useState(checkedStateses);

    const [税抜, setPriceNotax] = useState<string[]>(税抜ses);
    const [消費税, setTax] = useState<string[]>(消費税ses);
    //const [日付, setDate] = useState<Date[]>(日付ses);

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: '税抜' | '消費税') => {
        let inputValue = event.target.value.replace(/[^0-9]/g, '');
        inputValue = inputValue === '' ? '0' : inputValue;

        const newValue = parseInt(inputValue, 10);
        const formattedValue = newValue.toLocaleString();

        const newRows: Row[] = [...rows];
        const rowToUpdate = newRows[index];
        if (rowToUpdate) {
            rowToUpdate[field] = newValue;
            rowToUpdate.合計金額 = rowToUpdate.税抜 + rowToUpdate.消費税;
            setRows(newRows);
            const totalTaxIncluded = totalPriceNotTax + totalpriceTax;
            // Thêm total vào mỗi đối tượng trong newRows
            const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: totalTaxIncluded }));
            props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha

        }

        if (field === '税抜') {
            const newPriceNotax = [...税抜];
            newPriceNotax[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setPriceNotax(newPriceNotax);
        } else if (field === '消費税') {
            const newTax = [...消費税];
            newTax[index] = formattedValue;
            newRows[index].合計 = calculateRowTotal(newRows[index]);
            setTax(newTax);
        }

        const total = newRows.reduce((acc, row) => acc + row.税抜, 0);
        const total2 = newRows.reduce((acc, row) => acc + row.消費税, 0);
        setTotalPriceNotTax(total);
        setTotalPriceTax(total2);

        const totalTaxIncluded = total + total2;
        //props.parentCallback({ rows: newRows, total: totalTaxIncluded.toLocaleString() });
        // Thêm total vào mỗi đối tượng trong newRows
        const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: totalTaxIncluded, TotalPriceNotTax2: total, TotalPriceTax2: total2 }));
        props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
    };

    const calculateRowTotal = (row: Row) => {
        return row.税抜 + row.消費税; // Tạm thời chỉ tính tổng từ trường mealExpense
    };

    useEffect(() => {
        calculateTotal(rows);
    }, [rows]);

    const calculateTotal = (rows: Row[]) => {
        let sum = 0;
        rows.forEach(row => {
            sum += row.税抜 + row.消費税;
        });
        setTotal(sum); // Cập nhật state total

        // Tính tổng của tất cả các hàng
        let totalRowsSum = 0;
        rows.forEach(row => {
            totalRowsSum += row.合計;
        });

        return sum;
    };

    // const handleLeaveDateChange = (index: number, date: any) => {
    //     const momentDate = moment(date); // Chuyển đổi giá trị ngày thành đối tượng Moment
    //     if (!momentDate.isValid()) {
    //         console.error('Invalid date:', date);
    //         return;
    //     }
    //     const formattedDate = momentDate.format('YYYY/MM/DD');
    //     const newRows = [...rows];
    //     newRows[index].日付 = formattedDate;
    //     setRows(newRows);
    //     const newDateArray = [...日付];
    //     newDateArray[index] = momentDate.toDate(); // Lưu giá trị là Date object
    //     setDate(newDateArray);
    //     const newRowsWithTotal = newRows.map(row => ({ ...row }));
    //     props.parentCallback(newRowsWithTotal);
    // };

    // const handleLeaveDateChange = () => {
    //     const newRows = [...rows];
    //     setRows(newRows);
    //     const newRowsWithTotal = newRows.map(row => ({ ...row, }));
    //     props.parentCallback(newRowsWithTotal);
    // };


    // thêm
    const addRow = () => {
        const newRow: Row = { id: rows.length, 日付: currentDate, 内容: '', 支払先: '', 税抜: 0, 消費税: 0, 軽減税率: false, 備考: '', 合計金額: 0, 合計: 0 };
        setRows(prevRows => [...prevRows, newRow]);
        setCheckedState((prevState: any) => [...prevState, false]);
    };

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
    //     const { value } = event.target;
    //     setRows((prevRows: Row[]) => {
    //         const newRows = [...prevRows];
    //         newRows[index] = { ...newRows[index], [field]: value };

    //         const totalTaxIncluded = totalPriceNotTax + totalpriceTax;
    //         // Thêm total vào mỗi đối tượng trong newRows
    //         const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: totalTaxIncluded }));
    //         props.parentCallback(newRowsWithTotal); // Gửi dữ liệu mới và tổng mới lên component cha
    //         // props.parentCallback(newRows, total: totalTaxIncluded.toLocaleString() });
    //         // props.parentCallback(newRows); // callback props ve cha

    //         return newRowsWithTotal; // Trả về một giá trị từ hàm setRows
    //     });
    // };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            const totalTaxIncluded = totalPriceNotTax + totalpriceTax;
            const newRowsWithTotal = newRows.map(row => ({ ...row, 合計金額: totalTaxIncluded, TotalPriceNotTax2: totalPriceNotTax, TotalPriceTax2: totalpriceTax }));
            props.parentCallback(newRowsWithTotal); // callback props ve cha
            return newRowsWithTotal; // Trả về một giá trị từ hàm setRows
        });
    };



    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };



    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckedState = [...checkedState];
        newCheckedState[index] = isChecked;

        setCheckedState(newCheckedState);
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], 軽減税率: isChecked };
        setRows(newRows);
    };

    const handleDateChange = (date: any, index: number) => {
        const formattedDate = date.format('YYYY/MM/DD');
        setRows((prevRows: Row[]) => {
            const newRows = [...prevRows];
            newRows[index].日付 = formattedDate;
            const newRowsWithTotal = newRows.map(row => ({ ...row }));
            props.parentCallback(newRowsWithTotal);
            return newRows;
        });
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
                                    <td>
                                        <DatePicker
                                            value={row.日付 ? new Date(row.日付) : new Date()}
                                            onChange={(date) => handleDateChange(date, index)}
                                            format="YYYY/MM/DD"
                                        />
                                    </td>
                                    <td><input type="text" placeholder='入力してください' value={row.内容} onChange={(e) => handleInputChange(e, index, '内容')} /></td>
                                    <td><input type="text" placeholder='入力してください' value={row.支払先} onChange={(e) => handleInputChange(e, index, '支払先')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={税抜[index]} onChange={(e) => handleNumberChange(e, index, '税抜')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={消費税[index]} onChange={(e) => handleNumberChange(e, index, '消費税')} /></td>
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
                                    <td><input type="text" placeholder='入力してください' value={row.備考} onChange={(e) => handleInputChange(e, index, '備考')} /></td>
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
                                <td colSpan={2}>{(合計金額).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}
