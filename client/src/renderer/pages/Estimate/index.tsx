import { NavLink } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';

interface Table {
    id: number;
    name: string;
    content: string;
}

export const Estimate = () => {
    const axiosPrivate = useAxiosPrivate();
    const [empty, setEmpty] = useState(false);
    const [listOfTable, setListOfTable] = useState<Table[]>([]); // Sử dụng kiểu dữ liệu Table
    const [selectedId, setSelectedId] = useState<number | null>(null); // Đặt kiểu dữ liệu cho selectedId là number | null
    const [selectedname, setSelectedName] = useState('');


    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await axiosPrivate.get('estimate');
                setListOfTable(response.data); // Cập nhật mảng với dữ liệu từ API
                setEmpty(response.data.length === 0);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err);
            }
        }
        getTables();
    }, []);

    const handleButtonClick = (id: number, name: string) => {
        setSelectedId(id); // Cập nhật selectedId khi click vào button
        setSelectedName(name); // Cập nhật selectedName khi click vào button
    }

    return (
        <>

            <table className="table-base">
                <tbody>
                    {listOfTable.map((data, index) => (
                        <tr key={data.id}>
                            <th>
                                <NavLink to={`/estimate/${data.id}`} className="link" onClick={() => handleButtonClick(data.id, data.name)}>{data.name}</NavLink>
                            </th>
                            <td>
                                {data.content}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}