import { useEffect, useState } from "react";
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import moment from 'moment';
import C_ExpenseReport from "./Components/C_ExpenseReport";
import C_TotalExpenseReport from "./Components/C_TotalExpenseReport";


interface Params {
    id: string;
}
interface Row {
    id: number;
    route: string;
    paymentDestination: string;
    priceNotax: number;
    tax: number;
    check: number;
    note: string;
}

export const ExpenseReport = (props: { id_table: any; }) => {
    const { id_table } = props;


    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();



    const [date, setDate] = useState(new Date());
    // const [rows, setRows] = useState([{ id: 0, values: ['', ''] }]);
    const [rows, setRows] = useState<Row[]>([{ id: 0, route: '', paymentDestination: '', priceNotax: 0, tax: 0, check: 0, note: '' }]);
    const [total, setTotal] = useState(0);
    const [totalPriceNotTax, setTotalPriceNotTax] = useState<number>(0);
    const [totalpriceTax, setTotalPriceTax] = useState(0);





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

        const total = newRows.reduce((acc, row) => acc + row.priceNotax, 0);
        const total2 = newRows.reduce((acc, row) => acc + row.tax, 0);
        setTotalPriceNotTax(total);
        setTotalPriceTax(total2);
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

    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const saveExpense = async (status: number) => {
        const formattedDate = moment(date).format("YYYY/MM/DD HH:mm:ss");
        try {
            const isValid = checkBeforeSave();
            const totalTaxIncluded = totalPriceNotTax + totalpriceTax;
            if (isValid) {
                // Tạo mảng các đối tượng JSON đại diện cho mỗi hàng dữ liệu

                const dataToSend = rows.map((row, index) => ({
                    date: formattedDate,
                    route: row.route,
                    paymentDestination: row.paymentDestination,
                    priceNotax: formatNumberWithCommas(row.priceNotax),
                    tax: formatNumberWithCommas(row.tax),
                    check: checkedState[index], // Trạng thái checkbox tại index tương ứng
                    note: row.note,
                    owner: users.realname,
                    totalPriceNotTax: formatNumberWithCommas(totalPriceNotTax),
                    totalPriceTax: formatNumberWithCommas(totalpriceTax),
                    total: formatNumberWithCommas(totalTaxIncluded),
                    tableName: tableName,
                }));

                // Tạo đối tượng JSON chứa các mảng dữ liệu
                const requestData = {
                    rows: dataToSend,
                    owner: users.realname,
                    table_id: id_table,
                    id_status: status,

                    // totalPriceNotTax: totalPriceNotTax,
                    // totalPriceTax: totalpriceTax,
                    // total: totalTaxIncluded,
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
            }
        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    };

    const [checkedState, setCheckedState] = useState(new Array(rows.length).fill(0));

    const handleCheckboxChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckedState = [...checkedState];
        newCheckedState[index] = isChecked ? 0 : 1;
        setCheckedState(newCheckedState);
    };

    return (
        <>
            <h2 className="hdglv2"><span>交通費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p>

            <C_ExpenseReport />
            <C_TotalExpenseReport />

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