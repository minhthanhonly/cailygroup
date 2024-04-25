

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from 'moment';
import { toast } from "react-toastify";
import C_TravelExpenses from './Components/C_TravelExpenses';



export const TravelExpenses = (props: { id_table: any; }) => {


    const { id_table } = props;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const axiosPrivate = useAxiosPrivate();
    const [date, setDate] = useState(new Date());

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

    //const [mealExpenses, setMealExpenses] = useState<string[]>(new Array(rows.length).fill(''));


    const formatNumberWithCommas = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const saveAsDraft = async () => {
        //    await saveExpense(3); // Trạng thái cho bản nháp
    };

    const saveAsAwaitingApproval = async () => {
        //   await saveExpense(1); // Trạng thái cho đang chờ duyệt
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


    // const saveExpense = async (status: number) => {
    //     try {
    //         const isValid = checkBeforeSave();
    //         if (isValid) {
    //             const formattedTotal = formatNumberWithCommas(total);

    //             // Lặp qua mỗi dòng và gửi mỗi dòng dữ liệu là một yêu cầu POST riêng biệt
    //             await Promise.all(rows.map(async (row) => {
    //                 try {
    //                     const formattedDate = moment(row.date).format("YYYY/MM/DD HH:mm:ss");
    //                     const rowData = {
    //                         date: formattedDate,
    //                         route: row.route,
    //                         boardingStation: row.boardingStation,
    //                         alightingStation: row.alightingStation,
    //                         mealExpense: formatNumberWithCommas(row.mealExpense),
    //                         note: row.note,
    //                         total: formattedTotal,
    //                         tableName: tableName,
    //                         owner: users.realname,
    //                         table_id: id_table,
    //                         id_status: status,
    //                     };

    //                     // Tạo object chứa key "rows" và mảng dữ liệu hàng
    //                     const rowsObject = {
    //                         rows: [rowData],
    //                         owner: users.realname,
    //                         table_id: id_table,
    //                         id_status: status
    //                     };

    //                     // Gửi yêu cầu POST với dữ liệu được định dạng theo yêu cầu
    //                     const response = await axiosPrivate.post('travelexpenses/add', rowsObject, { headers: { 'Content-Type': 'application/json' } });

    //                     if (response && response.status >= 200 && response.status < 300) {
    //                         if (status === 1) {
    //                             toast.success('Bạn đã gởi thông tin thành công vui lòng chờ');
    //                         } else {
    //                             toast.success('Bạn Lưu vào bản nháp thành công');
    //                         }
    //                     } else {
    //                         console.error('Yêu cầu POST không thành công.');
    //                     }
    //                 } catch (error) {
    //                     console.error('Error saving expense:', error);
    //                 }
    //             }));
    //         }
    //     } catch (error) {
    //         console.error('Error saving expenses:', error);
    //     }
    // };

    return (
        <>
            {visibleErrors.map((error, index) => (
                <div key={index}>{error} is required.</div>
            ))}
            <h2 className="hdglv2"><span>交通費清算書</span></h2>
            <p className="txt-lead">下記の通り申請致します。</p>

            <div className="table tbl_custom">
                <div className='tbl_custom--03'>
                    <C_TravelExpenses />

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
                    <p className='plus-row box-router__edit--content' >承認ルートを編集</p>
                </div>
            </div>
            <div className="wrp-button">
                <button className="btn btn--from btn--gray" onClick={saveAsDraft}>下書き保存</button>
                <button className="btn btn--from btn--blue" onClick={saveAsAwaitingApproval}>申請する</button>
            </div>
        </>
    )

};
