import { useEffect, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";


interface Row {
    id: number;
    route: string;
    paymentDestination: string;
    priceNotax: number;
    tax: number;
    check: number;
    note: string;
}

export const ExpenseReport = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedId = searchParams.get('selectedId');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();



    const [date, setDate] = useState(new Date());
    // const [rows, setRows] = useState([{ id: 0, values: ['', ''] }]);
    const [rows, setRows] = useState<Row[]>([{ id: 0, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: 0, note: '' }]);
    const [total, setTotal] = useState(0);
    const [priceNotTax, setPriceNotTax] = useState(0);
    const [priceTax, setPriceTax] = useState(0);


    const [priceNotax, setPriceNotax] = useState<string[]>(new Array(rows.length).fill(''));
    const [tax, setTax] = useState<string[]>(new Array(rows.length).fill(''));
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
    };

    const [visibleErrors, setVisibleErrors] = useState<string[]>([]);

    const handleLeaveDateChange = () => {
        const newRows = [...rows];
        setRows(newRows);
    };

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
    // thêm 
    const addRow = () => {
        const newRow: Row = { id: rows.length, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: 0, note: '' };
        setRows(prevRows => [...prevRows, newRow]);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });

        validateInput(value, field, index); // Truyền index vào hàm validateInput
    };

    const saveAsDraft = async () => {
        await saveExpense(3); // Trạng thái cho bản nháp
    };

    const saveAsAwaitingApproval = async () => {
        await saveExpense(1); // Trạng thái cho đang chờ duyệt
    };
    const checkBeforeSave = (): boolean => {
        // Kiểm tra xem mỗi hàng có đầy đủ dữ liệu không
        const isValid = rows.every(row => (
            row.route && row.paymentDestination && row.priceNotax && row.tax && row.note
        ));

        if (!isValid) {
            toast.error('Vui lòng nhập đầy đủ các thông tin mỗi hàng.');
        }

        return isValid;
    };


    const saveExpense = async (status: number) => {
        try {
            const isValid = checkBeforeSave();
            if (isValid) {
                // Tạo mảng requestData.dataToSend từ rows và checkedState
                const dataToSend = rows.map((row, index) => ({
                    date: date,
                    route: row.route,
                    paymentDestination: row.paymentDestination,
                    priceNotax: row.priceNotax,
                    tax: row.tax,
                    check: checkedState[index], // Trạng thái checkbox tại index tương ứng
                    note: row.note
                }));

                // Tạo đối tượng requestData
                const requestData = {
                    dataToSend: dataToSend,
                    owner: users.realname,
                    table_id: selectedId,
                    id_status: status
                };

                // Gửi yêu cầu POST với dữ liệu requestData
                const response = await axiosPrivate.post('travelexpenses/add', requestData, { headers: { 'Content-Type': 'application/json' } });

                if (response.status >= 200 && response.status < 300) {
                    if (status === 1) {
                        toast.success('Bạn đã gởi thông tin thành công vui lòng chờ');
                    } else {
                        toast.success('Bạn Lưu vào bản nháp thành công');
                    }
                } else {
                    console.error('Yêu cầu POST không thành công. Mã lỗi:', response.status);
                }
            }
        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    };

    const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(0));

    const handleCheckboxChange = (index: number) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = newCheckedState[index] === 1 ? 0 : 1;
        setCheckedState(newCheckedState);
    };

    return (
        <>
            <h2 className="hdglv2"><span>交通費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p>

            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <table>
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>路線</th>
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
                                    <td> <DatePicker onChange={(_date) => handleLeaveDateChange()} value={date} format="DD-MM" /></td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'route')} /></td>
                                    <td><input type="text" placeholder='入力してください' onChange={(e) => handleInputChange(e, index, 'paymentDestination')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={priceNotax[index]} onChange={(e) => handleNumberChange(e, index, 'priceNotax')} /></td>
                                    <td><input className="numberInput" type="text" placeholder='0' value={tax[index]} onChange={(e) => handleNumberChange(e, index, 'tax')} /></td>
                                    <td className='tdCheckbox'>
                                        <input type="checkbox" id={`checkbox-${index}`} checked={checkedState[index] === 1} onChange={() => handleCheckboxChange(index)} />
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
                                <td>{priceNotTax.toLocaleString()}</td>
                                <td>{priceTax.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th className='rowspan'>合計（税込）</th>
                                <td colSpan={2}>{total.toLocaleString()}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div className='box-router'>
                <div className='box-router__title'>承認ルート</div>
                <div className='grid-row box-router__grid'>
                    <div className='box-router__name'>
                        <p>承認者: </p> <p>齋藤社長</p>
                    </div>
                    <div className='box-router__name'>
                        <p>共有者: </p> <p>総務</p>
                    </div>

                </div>
                <div className='box-router__edit'>
                    <p className='plus-row box-router__edit--content'>承認ルートを編集</p>
                </div>
            </div>
            <div className="wrp-button">
                <button className="btn btn--from btn--gray" onClick={saveAsDraft}>下書き保存</button>
                <button className="btn btn--from btn--blue" onClick={saveAsAwaitingApproval}>申請する</button>
            </div>
        </>
    )

}