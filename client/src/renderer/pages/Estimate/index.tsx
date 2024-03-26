import { NavLink } from 'react-router-dom';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';



export const Estimate = () => {
    const axiosPrivate = useAxiosPrivate();
    const [empty, setEmpty] = useState(false);
    type Fieldtable = {
        id: number,
        name_table: string,
    }

    const [listOfTable, setListOfTable] = useState<Fieldtable[] | []>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('index');
                console.log(response.data);
                setListOfTable(response.data);



                response.data.length ? setEmpty(false) : setEmpty(true);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getUsers();
    }, [])

    return (

        <>
            {listOfTable}
            <nav>
                <ul>
                    <li><NavLink to="/TravelExpenses">交通費清算書</NavLink></li>
                    <li><NavLink to="/ExpenseReport">経費清算書</NavLink></li>
                    <li><NavLink to="/PriceBusinessReport">出張旅費清算書</NavLink></li>
                    <li><NavLink to="/TravelAllowance">通勤手当申請書</NavLink></li>
                    {/* <li><NavLink to="/about">Giới thiệu</NavLink></li>
                    <li><NavLink to="/contact">Liên hệ</NavLink></li> */}
                </ul>
            </nav>

        </>
    )
}