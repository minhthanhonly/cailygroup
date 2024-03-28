import { NavLink } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';

interface Table {
    id: number;
    name_table: string;
}

export const Estimate = () => {
    const axiosPrivate = useAxiosPrivate();
    const [empty, setEmpty] = useState(false);
    const [listOfTable, setListOfTable] = useState<Table[]>([]); // Sử dụng kiểu dữ liệu Table


    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await axiosPrivate.get('estimate');
                setListOfTable(response.data); // Cập nhật mảng với dữ liệu từ API
                console.log
                setEmpty(response.data.length === 0);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, []);

    return (
        <>
            {/* <li><NavLink to="/TravelExpenses">交通費清算書</NavLink></li>
            <li><NavLink to="/ExpenseReport">経費清算書</NavLink></li>
            <li><NavLink to="/PriceBusinessReport">出張旅費清算書</NavLink></li>
            <li><NavLink to="/TravelAllowance">通勤手当申請書</NavLink></li> */}
            <nav>
                <ul>
                    {listOfTable.map((data, index) => (
                        <li key={data.id}>
                            <NavLink to={`/${data.link}?selectedId=${data.id}`}>{data.name_table}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}