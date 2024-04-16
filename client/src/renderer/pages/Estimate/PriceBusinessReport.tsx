import { useEffect, useRef, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import moment from "moment";

import { DateObject } from 'react-multi-date-picker';


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




export const PriceBusinessReport = (props: { id_table: any; }) => {

    const { id_table } = props;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();


    const [rows, setRows] = useState<Row[]>([{ id: 0, project: '', date: '', priceTrain: 0, priceHouse: 0, priceCustomer: 0, priceEat: 0, priceOther: 0, totalPrice: 0, note: '' }]);
    const [date, setDate] = useState(new Date());
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDomestic, setDomestic] = useState(1);
    const [isForeign, setForeign] = useState(0);
    const [totalColumnSum, setTotalColumnSum] = useState<number>(0);

    const [inputValue, setInputValue] = useState<number>(0);
    const [inputDate, setInputDate] = useState<number>(0);
    // const [totalPriceDate, setPriceDate] = useState<number>(0);
    const [totalSum, setTotalSum] = useState<number>(0);

    const [addressDomesticForeign, setAddressDomesticForeign] = useState('');
    const [dateRange, setDateRange] = useState<{ dateStart: Date | null, dateEnd: Date | null }>({
        dateStart: date,
        dateEnd: date
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof Row) => {
        const { value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index] = { ...newRows[index], [field]: value };
            return newRows;
        });

        validateInput(value, field, index); // Truyền index vào hàm validateInput
    };


    const handleDomesticCheck = () => {
        setDomestic(isDomestic === 1 ? 0 : 1);
        if (isForeign === 1) setForeign(0); // Deselect early leave if late is selected
    };

    const handleForeignCheck = () => {
        setForeign(isForeign === 1 ? 0 : 1);
        if (isDomestic === 1) setDomestic(0); // Deselect late if early leave is selected
    };

    // thêm 

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
            newRows[index] = { ...newRows[index], date: moment(normalDate).format("YYYY/MM/DD HH:mm:ss") };
        }
        setRows(newRows);
    };
    const handleFileChange = () => {
        const fileInput = fileInputRef.current;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0]; // Lấy tệp đầu tiên từ danh sách các tệp được chọn
            setSelectedFileName(file.name); // Lấy tên của tệp và cập nhật vào state
        }
    };
    const handleBtnFile = () => {
        // Kích hoạt sự kiện click trên input file
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.click();
        }
    };
    const handleClearBtnFile = () => {
        setSelectedFileName(""); // Xóa tên file
    };


    // ham changed and reda

    const [priceTrain, setpriceTrain] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceHouse, setpriceHouse] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceCustomer, setpriceCustomer] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceEat, setpriceEat] = useState<string[]>(new Array(rows.length).fill(''));
    const [priceOther, setpriceOther] = useState<string[]>(new Array(rows.length).fill(''));


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

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value.replace(/,/g, ''));
        setInputValue(isNaN(newValue) ? 0 : newValue);

    };
    const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue1 = parseFloat(event.target.value.replace(/,/g, ''));
        setInputDate(isNaN(newValue1) ? 0 : newValue1);

    };


    // tính tổng
    const calculatedPrice = inputDate * 3000;
    const finalPayment = totalSum - inputValue;

    const finalTotalPrice = finalPayment + calculatedPrice;


    useEffect(() => {
        calculateTotalSum();
    }, [rows]); // Lắng nghe sự thay đổi của mảng rows


    const saveAsDraft = async () => {
        await saveExpense(3); // Trạng thái cho bản nháp
    };

    const saveAsAwaitingApproval = async () => {
        await saveExpense(1); // Trạng thái cho đang chờ duyệt
    };


    const addRow = () => {
        const newRow = { id: rows.length, project: '', date: '', priceTrain: 0, priceHouse: 0, priceCustomer: 0, priceEat: 0, priceOther: 0, totalPrice: 0, note: '' };
        setRows([...rows, newRow]);
        calculateTotalSum();
    };


    const [tableName, setTableName] = useState(0);
    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await axiosPrivate.get('estimate');
                const { data } = response;
                const { id_table } = props;

                // Lặp qua mảng data để tìm name tương ứng với id_table
                const matchedTable = data.find((data: { id: any; }) => data.id === id_table);
                setTableName(matchedTable.name);

            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, [id_table]);
    const saveExpense = async (status: number) => {


        const dateStart = moment(dateRange.dateStart).format("YYYY/MM/DD HH:mm:ss");
        const dateEnd = moment(dateRange.dateEnd).format("YYYY/MM/DD HH:mm:ss");
        const date_form = moment(date).format("YYYY/MM/DD HH:mm:ss");

        try {
            const additionalData = {
                遅刻: isDomestic,
                早退: isForeign,
                出張期間: addressDomesticForeign, // giả sử bạn đã định nghĩa biến này trong phần state
                dateStart: dateStart,
                dateEnd: dateEnd,
                領収書添付: selectedFileName,
                inputDate: inputDate,
                inputValue: inputValue,
                // calculatedPrice: calculatedPrice,
                // finalPayment: finalPayment,
                // finalTotalPrice: finalTotalPrice,
                // Thêm các trường khác nếu cần
            };
            // Tạo mảng các đối tượng JSON đại diện cho mỗi hàng dữ liệu
            const dataToSend = rows.map((row, index) => ({
                date: date_form,
                project: row.project,
                priceTrain: row.priceTrain,
                priceHouse: row.priceHouse,
                priceCustomer: row.priceCustomer,
                priceEat: row.priceEat,
                priceOther: row.priceOther,
                totalPrice: calculateRowSum(row),

                // tax: row.tax,
                // check: checkedState[index], // Trạng thái checkbox tại index tương ứng
                note: row.note,
                owner: users.realname,
                calculatedPrice: calculatedPrice,
                finalPayment: finalPayment,
                tableName: tableName,
                finalTotalPrice: finalTotalPrice,
            }));

            // Tạo đối tượng JSON chứa các mảng dữ liệu
            const requestData = {
                rows: dataToSend,
                owner: users.realname,
                table_id: id_table,
                id_status: status,
                ...additionalData,
            };

            // Gửi yêu cầu POST với dữ liệu được định dạng theo yêu cầu
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

        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    };
    return (
        <>
            <h2 className="hdglv2"><span>出張旅費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p>

            <table className='tb-from'>
                <tbody>
                    <tr>
                        <th><div className='tb-from--th'>用途<span className='txt-red'>（必須）</span></div></th>
                        <td>
                            <div className='tb-from--td'>
                                <div className='tb-from--checkbox'>
                                    <label><input type="checkbox" name="checkbox" checked={isDomestic === 1} onChange={handleDomesticCheck} /><span></span>遅刻</label>
                                </div>
                                <div className='tb-from--checkbox'>
                                    <label><input type="checkbox" name="checkbox" checked={isForeign === 1} onChange={handleForeignCheck} /><span></span>早退</label>
                                </div>
                                <input
                                    type="text"
                                    className='tb-from--input'
                                    placeholder="address"
                                    value={addressDomesticForeign}
                                    onChange={handleInputChangeAdress}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><div className='tb-from--th'>期間<span className='txt-red'>（必須）</span></div></th>
                        <td>
                            <div className='tb-from--td'>
                                <div className='tb-from--times'>
                                    <span>
                                        <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateStart, 'start')} value={dateRange.dateStart} />
                                    </span>
                                    <span> <DatePicker onChange={(_date) => handleLeaveDateChange(dateRange.dateEnd, 'end')} value={dateRange.dateEnd} /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><div className='tb-from--th'>行先<span className='txt-red'>（必須）</span></div></th>
                        <td>
                            <div className='tb-from--td tb-from--file'>
                                <input type="file" id="fileInput" className='tb-from--fileInput' onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                                <input type="text" id="fileInputText" className='tb-from--input' value={selectedFileName} placeholder="ファイルを選択してください" disabled
                                />
                                <button className="tb-from--button" onClick={handleBtnFile}>ファイル選択</button>
                                <button className="tb-from--button tb-from--button__red" onClick={handleClearBtnFile}>キャンセル</button>
                                <p>※全てのデータをひとつのフォルダにまとめてzipファイルに圧縮してからアップロードしてください。</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

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

                <div className='tbl_custom--04 tbl_width tbl_right'>
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