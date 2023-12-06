import React from 'react';
import { ButtonDelete } from '../Button/ButtonDelete';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

interface TableRowProps {
  rowData: string[]; // Dữ liệu cho mỗi hàng
  onButtonClick?: () => void; // Hàm xử lý sự kiện khi button được click
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
  editData?: boolean;
  accreptAdminData?: boolean; // đồng ý
  // refuseData? : boolean; // hủy
  // accreptMemberView ?: boolean;
}



const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick, admin, deleteData, showData, exportData, editData, accreptAdminData, }) => {




  // const filteredRowData = rowData.filter((item, index) => !(index === rowData.length - 1 && (item === '0' || item === '1')));

  // const rowDataIndexLast = rowData[rowData.length - 1];


  return (
    <tr>
      {rowData.map((data, index) => (
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
      {/* {refuseData == true ? <td>
        <Button href="/" size='medium' color="orange">Hủy</Button>
      </td>
        : "" } */}

      {/* {rowDataIndexLast === '0' ? <td>
          <p className="icon icon--check">
            <img
              src={require('../../assets/images/check.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
      </td> : <td>
        <Button href="/" size='medium' color="orange">Hủy</Button>
      </td> } */}
      {/* {rowDataIndexLast === '1' ? <td>
        <p className="icon icon--check">
          <img
            src={require('../../assets/images/check.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      </td> : <td>
        <Button href="/" size='medium' color="orange">Hủy</Button>
      </td>} */}

      {/* {accreptMemberView == true ?  <td>
          <p className="icon icon--check">
            <img
              src={require('../../assets/images/check.png')}
              alt="edit"
              className="fluid-image"
            />
          </p>
      </td>
        : ""  } */}


      {editData == true ? <td>
        <div className="grid-row icon-flex">
          <Link to={'/member-edit'}>
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
  data: string[][]; // Dữ liệu cho bảng 
  admin?: boolean;
  deleteData?: boolean;
  showData?: boolean;
  exportData?: boolean;
  editData?: boolean;
  accreptAdminData?: boolean; // đồng ý
  // refuseData? : boolean; // huy bo
  // accreptMemberView? :boolean;
}
// refuseData , accreptMemberView
const CTableBody: React.FC<TableProps> = ({ data, admin, deleteData, showData, exportData, editData, accreptAdminData, }) => {
  return (
    <tbody>
      {data.map((rowData, index) => (
        // <TableRow key={index} rowData={rowData} onButtonClick={() => console.log(`Button clicked for row ${index}`)} />
        <TableRow key={index} rowData={rowData} admin={admin} deleteData={deleteData} showData={showData} exportData={exportData} editData={editData} accreptAdminData={accreptAdminData} />
      ))}
    </tbody>
  );
};

export default CTableBody;
