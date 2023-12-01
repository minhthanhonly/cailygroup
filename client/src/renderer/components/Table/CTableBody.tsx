import React from 'react';
import { ButtonDelete } from '../Button/ButtonDelete';
import { Button } from '../Button';

interface TableRowProps {
  rowData: string[]; // Dữ liệu cho mỗi hàng
  onButtonClick?: () => void; // Hàm xử lý sự kiện khi button được click
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick, admin, deleteData, showData, exportData }) => {
  return (
    <tr>
      {rowData.map((data, index) => (
        <td key={index}>{data}</td>
      ))}
      {admin == true && deleteData == true  ? <td>
        <ButtonDelete onButtonClick={onButtonClick} />
      </td>
      :""}
      {admin == true && showData == exportData  ? <td>
        <Button href="/" size='medium'>Xem Thẻ Giờ</Button>
      </td>
      :""}
      {admin == true && exportData == true  ? <td>
        <Button href="/" size='medium' color="green">Xuất Thẻ Giờ</Button>
      </td>
      :""}
    </tr>
  );
};

interface TableProps {
  data: string[][]; // Dữ liệu cho bảng
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
}

const CTableBody: React.FC<TableProps> = ({ data, admin, deleteData, showData, exportData }) => {
  return (
      <tbody>
        {data.map((rowData, index) => (
          // <TableRow key={index} rowData={rowData} onButtonClick={() => console.log(`Button clicked for row ${index}`)} />
          <TableRow key={index} rowData={rowData} admin={admin} deleteData={deleteData} showData={showData} exportData={exportData}/>
        ))}
      </tbody>
  );
};

export default CTableBody;
