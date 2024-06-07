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
                // Truy cập vào phần tử rows trong parsedTableJson
                setAccordionItems(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        Load();
    }, [id]);
    return (
        <>
            {accordionItems &&
                accordionItems.formData &&
                accordionItems.formData.length > 0 ? (
                <div className="box-register">
                    <ul>
                        {accordionItems.formData.map((formDataItem, index) => {
                            if (formDataItem.label === '期間' && isPeriodDisplayed) {
                                return null;
                            }
                            if (formDataItem.label === '期間') {
                                isPeriodDisplayed = true;
                            }
                            if (!formDataItem.label) {
                                return null;
                            }
                            let valueToDisplay = formDataItem.value;
                            // Kiểm tra nếu label là "日間"
                            if (formDataItem.label === '日間') {
                                let duration = formDataItem.value.pop(); // Lấy giá trị "日間" ra khỏi mảng
                                valueToDisplay = formDataItem.value.join(' ~ '); // Nối giá trị còn lại
                                valueToDisplay += `  ${duration.value}   ${duration.label}  `; // Thêm "日間" vào cuối
                            } else if (
                                Array.isArray(formDataItem.value) &&
                                formDataItem.value.length >= 2 // Kiểm tra nếu có ít nhất 2 phần tử
                            ) {
                                // Kiểm tra nếu cả hai phần tử đều là ngày
                                if (
                                    !isNaN(Date.parse(formDataItem.value[0])) &&
                                    !isNaN(Date.parse(formDataItem.value[1]))
                                ) {
                                    valueToDisplay = formDataItem.value.join(' ~ '); // Nếu cả hai đều là ngày, nối chúng với dấu "~"
                                } else {
                                    let [date, ...times] = formDataItem.value; // Tách ngày và thời gian
                                    let timeRange = times.join(' ~ '); // Nối các phần tử thời gian
                                    valueToDisplay = `${date} ${timeRange}`; // Hiển thị ngày và khoảng thời gian
                                }
                            } else if (Array.isArray(formDataItem.value)) {
                                valueToDisplay = formDataItem.value.join('  '); // Nối giá trị với dấu cách
                            }
                            return (
                                <li key={index}>
                                    <div className="box-register__item">
                                        <span className="box-register__item__title">
                                            {formDataItem.label}
                                        </span>
                                        <span className="box-register__item__content">
                                            {valueToDisplay}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div className="box-register">
                    <div className="table tbl_custom table tbl_custom--register">
                        <div className="tbl_custom--03">
                            <table>
                                <thead>
                                    <tr>
                                        {accordionItems &&
                                            accordionItems.tableData &&
                                            Object.keys(accordionItems.tableData[0]).map(
                                                (key, index) => {
                                                    // Bỏ qua cột 'id'
                                                    if (key !== 'id') {
                                                        return <th key={index}>{key}</th>;
                                                    }
                                                    return null;
                                                },
                                            )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {accordionItems &&
                                        accordionItems.tableData &&
                                        accordionItems.tableData.map((tableDataItem, index) => (
                                            <tr key={index}>
                                                {Object.entries(tableDataItem).map(
                                                    ([key, value], index) => {
                                                        // Bỏ qua cột 'id'
                                                        if (key !== 'id') {
                                                            // Chuyển đổi 'date' thành 'yyyy-mm-dd' format
                                                            if (key === 'date') {
                                                                value = new Date(value)
                                                                    .toISOString()
                                                                    .split('T')[0];
                                                            }
                                                            return <td key={index}>{value}</td>;
                                                        }
                                                        return null;
                                                    },
                                                )}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
