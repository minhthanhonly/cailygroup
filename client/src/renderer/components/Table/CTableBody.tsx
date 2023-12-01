import React from 'react';
import { ButtonDelete } from '../Button/ButtonDelete';

interface TableRowProps {
  rowData: string[]; // Dữ liệu cho mỗi hàng
  onButtonClick?: () => void; // Hàm xử lý sự kiện khi button được click
  admin?: boolean;
  action: string;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick, admin, action }) => {
  return (
    <tr>
      {rowData.map((data, index) => (
        <td key={index}>{data}</td>
      ))}
      {admin == true && action == "delete"  ? <td>
        <ButtonDelete onButtonClick={onButtonClick} />
      </td>
      :""}
    </tr>
  );
};

interface TableProps {
  data: string[][]; // Dữ liệu cho bảng
  admin?: boolean;
  action: string;
}

const CTableBody: React.FC<TableProps> = ({ data, admin, action }) => {
  return (
      <tbody>
        {data.map((rowData, index) => (
          // <TableRow key={index} rowData={rowData} onButtonClick={() => console.log(`Button clicked for row ${index}`)} />
          <TableRow key={index} rowData={rowData} admin={admin} action={action} />
        ))}
      </tbody>
  );
};

export default CTableBody;
