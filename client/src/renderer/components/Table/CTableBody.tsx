import React from 'react';

interface TableRowProps {
  rowData: string[]; // Dữ liệu cho mỗi hàng
  onButtonClick: () => void; // Hàm xử lý sự kiện khi button được click
}

let admin = true;

const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick }) => {
  return (
    <tr>
      {rowData.map((data, index) => (
        <td key={index}>{data}</td>
      ))}
      {admin == true ? <td>
        <button onClick={onButtonClick}>Click me</button>
      </td>
      :""}
    </tr>
  );
};

interface TableProps {
  data: string[][]; // Dữ liệu cho bảng
}

const CTableBody: React.FC<TableProps> = ({ data }) => {
  return (
      <tbody>
        {data.map((rowData, index) => (
          <TableRow key={index} rowData={rowData} onButtonClick={() => console.log(`Button clicked for row ${index}`)} />
        ))}
      </tbody>
  );
};

export default CTableBody;
