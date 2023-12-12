import React, { useState } from 'react';
import ButtonAdd from '../Button/ButtonAdd';
import ButtonEdit from '../Button/ButtonEdit';
import ButtonView from '../Button/ButtonView';
import ButtonSave from '../Button/ButtonSave';
import ButtonExport from '../Button/ButtonExport';
import ButtonDelete from '../Button/ButtonDelete';
import MonthYearSelector from './SelectMonthYears';

  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const handleDateChange = (month: string, year: string, daysInMonth: Date[]) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);
  };

interface TableRowProps {
  rowData: {
    [key: string]: any;
  }; // Dữ liệu cho mỗi hàng
  onButtonClick?: () => void; // Hàm xử lý sự kiện khi button được click
  selector?: boolean;
  permission_add?: boolean;
  permission_edit?: boolean;
  permission_delete?: boolean;
  permission_view?: boolean;
  permission_save?: boolean;
  permission_export?: boolean;
  path_edit: string;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, onButtonClick, selector, permission_add, permission_edit, permission_delete, permission_view, permission_save, permission_export, path_edit }) => {
  const valuesRowData: any[] = Object.values(rowData);
  return (
    <tr>
      {valuesRowData.map((data, index) => (
        <td key={index}>{data}</td>
      ))}
      { selector == true ? <td><MonthYearSelector onChange={handleDateChange} /></td> : null }
      { permission_add == true ? <td><ButtonAdd path_add={''}/></td> : null }
      { permission_edit == true ? <td><ButtonEdit href={path_edit} /></td> : null }
      { permission_delete == true ? <td><ButtonDelete/></td> : null }
      { permission_view == true ? <td><ButtonView/></td>  : null }
      { permission_save == true ? <td><ButtonSave/></td>  : null }
      { permission_export == true ? <td><ButtonExport/></td> : null }
    </tr>
  );
};

interface TableProps {
  data: {
    [key: string]: any;
  }[]; // Dữ liệu cho bảng
  selector?: boolean;
  permission_add?: boolean;
  permission_edit?: boolean;
  permission_delete?: boolean;
  permission_view?: boolean;
  permission_save?: boolean;
  permission_export?: boolean;
  path_edit: string;
}

const CTableBody: React.FC<TableProps> = ({ data, selector, permission_add, permission_edit, permission_delete, permission_view, permission_save, permission_export, path_edit }) => {
  return (
    <tbody>
      {data.map((rowData, index) => (
        <TableRow key={index} rowData={rowData} selector={selector} permission_add={permission_add} permission_edit={permission_edit} path_edit={path_edit} permission_delete={permission_delete} permission_view={permission_view} permission_save={permission_save} permission_export={permission_export} />
      ))}
    </tbody>
  );
};

export default CTableBody;
