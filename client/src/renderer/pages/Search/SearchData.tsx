import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Key, useEffect, useState } from 'react';

interface SearchDataProps {
    id: number;
    table: number;
    // Other props if applicable
}
interface TableFields {
    [key: number]: string[]; // Định nghĩa index signature cho key là số và giá trị là một mảng các chuỗi
}

export const SearchData: React.FC<SearchDataProps> = ({ id, table }) => {
    const axiosPrivate = useAxiosPrivate();
    const [accordionItems, setAccordionItems] = useState<any>([]);



    useEffect(() => {
        const Load = async () => {
            try {
                const response = await axiosPrivate.get('application/getforid/' + id);
                const data = response.data;
                // Parse tablejson thành JSON
                const parsedTableJson = JSON.parse(data.tablejson);
                // Truy cập vào phần tử rows trong parsedTableJson
                setAccordionItems(parsedTableJson);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        Load();
    }, [id]);


    return (
        <>
            <div className="box-register">
                <ul>
                    {accordionItems.rows && accordionItems.rows.map((rowData: any, index: number) => {
                        try {
                            console.log("rowData", rowData);
                            return (
                                <li key={index}>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title"> {table === 7 || table === 8 || table === 9 ? "日付" : "鉄道名"} </span>
                                        <span className="box-register__item__content">
                                            {rowData.date}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">路線</span>
                                        <span className="box-register__item__content">
                                            {rowData.route}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">乗車駅</span>
                                        <span className="box-register__item__content">
                                            {rowData.boardingStation}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">下車駅</span>
                                        <span className="box-register__item__content">
                                            {rowData.alightingStation}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">金額</span>
                                        <span className="box-register__item__content">
                                            {rowData.mealExpense}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">備考</span>
                                        <span className="box-register__item__content">
                                            {rowData.note}
                                        </span>
                                    </div>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">合計金額</span>
                                        <span className="box-register__item__content">
                                            {rowData.total}
                                        </span>
                                    </div>

                                    {/* Tiếp tục hiển thị các trường dữ liệu khác tương tự */}
                                </li>

                            );

                        } catch (error) {
                            console.error('Error parsing JSON data:', error);
                        }


                    })}
                </ul>
            </div>
        </>
    );
};
