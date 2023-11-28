


import { SetStateAction, useState } from 'react';
import DatabaseTable_Columns from './Table_01/DatabaseTable_Columns';
import DatabaseTable_Rows from './Table_01/DatabaseTable_Rows';



import CTable_Col from './TableCustom/CTable_Col';
import CTable_Row from './TableCustom/CTable_Row';
import MonthYearSelector from './SelectMonthYears';
// import  TestOne  from "./TestOne";
import './Table.scss';



  let Col_count_rows = 5;
  const Col_title = {col_1: 'Họ Và Tên', col_2: 'Nhóm', col_3: 'Email', col_4: 'Skype ID', col_5: 'Phone',};
//   const Data_col = ['Họ Và Tên','Nhóm', 'Email', 'Skype ID', 'Phone'];
 

const TablePage = () =>  {


  return (
    <div>
      <h2>Table Page</h2>
        <MonthYearSelector />
		<h2 className='hdg-lv2'>Thẻ giờ</h2>
        <div className='table-container table--01'>
          <table className="table table__custom">
          <thead>
            <DatabaseTable_Columns  />
          </thead>
          <tbody>
            {/* RowCounts = {RowCounts} */}
            <DatabaseTable_Rows  />
          </tbody>
       	 </table>
        </div>


		<h2 className='hdg-lv2'>custom</h2>
        <div className='table-container'>
          <table className="table table__custom">
			<thead>
				<CTable_Col  Col_count={Col_count_rows} Col_title={Col_title} />
			</thead>
			<tbody>
				<CTable_Row Rows_count={Col_count_rows} />
			</tbody>
       	 </table>
        </div>

{/* 
		<TestOne /> */}
    </div>
  );
};

export default TablePage;