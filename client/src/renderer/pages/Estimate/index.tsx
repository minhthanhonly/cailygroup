import { NavLink } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';

export const Estimate = () => {
    const axiosPrivate = useAxiosPrivate();
    const [empty, setEmpty] = useState(false);
    const [listOfTable, setListOfTable] = useState([]); // Khởi tạo một mảng trống

    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await axiosPrivate.get('estimate');
                // response.data là một mảng JSON từ API
                setListOfTable(response.data); // Cập nhật mảng với dữ liệu từ API

                console.log("sadsasss", (response.data));

                setEmpty(response.data.length === 0);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, []); // Chỉ gọi một lần khi component được tạo ra

    return (
        <>
            <nav>
                <ul>
                    {Array.isArray(listOfTable) && listOfTable.map((data, index) => (
                        <li key={data.id}>
                            <NavLink to={`/${data.name_table}`}>{data.name_table}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}