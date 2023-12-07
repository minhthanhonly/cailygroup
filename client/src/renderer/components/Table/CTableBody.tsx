import React from 'react';
import { ButtonDelete } from '../Button/ButtonDelete';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

interface TableRowProps {
  rowData: {
    [key: string]: any;
  }; // Dữ liệu cho mỗi hàng
  onButtonClick?: () => void; // Hàm xử lý sự kiện khi button được click
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
  editData?: boolean;
  accreptAdminData?: boolean; // đồng ý
}

const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick, admin, deleteData, showData, exportData, editData, accreptAdminData, }) => {

  const valuesRowData: any[] = Object.values(rowData);

  return (
    <tr>
      {valuesRowData.map((data, index) => (
        <td key={index}>{data}</td>
      ))}

      {admin == true && deleteData == true ? <td>
        <ButtonDelete onButtonClick={onButtonClick} />
      </td>
        : ""}
      {admin == true && showData == exportData ? <td>
        <Button href="/" size='medium'>Xem Thẻ Giờ</Button>
      </td>
        : ""}
      {admin == true && exportData == true ? <td>
        <Button href="/" size='medium' color="green">Xuất Thẻ Giờ</Button>
      </td>
        : ""}
      {accreptAdminData == true ? <td>
        <Button href="/" size='medium' color="green">Xác Nhận</Button>
      </td>
        : ""}
      {editData == true ? <td>
        <div className="grid-row icon-flex">
          <Link to={'/member/edit'}>
            <p className="icon icon--save">
              <img
                src={require('../../assets/images/icnedit.png')}
                alt="edit"
                className="fluid-image"
              />
            </p>
          </Link>
          <p className="icon icon--deleted">
            <img
              src={require('../../assets/images/icndelete.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
        </div>
      </td>
        : ""}
    </tr>
  );
};

interface TableProps {
  data: {
    [key: string]: any;
  }[]; // Dữ liệu cho bảng
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
  editData?: boolean;
  accreptAdminData?: boolean; // đồng ý
}

const CTableBody: React.FC<TableProps> = ({ data, admin, deleteData, showData, exportData, editData, accreptAdminData, }) => {

  return (
    <tbody>
      {data.map((rowData, index) => (
        <TableRow key={index} rowData={rowData} admin={admin} deleteData={deleteData} showData={showData} exportData={exportData} editData={editData} accreptAdminData={accreptAdminData} />
      ))}
    </tbody>
  );
};

export default CTableBody;
