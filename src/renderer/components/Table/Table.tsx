


import { SetStateAction, useState } from 'react';
import DatabaseTable_Columns from './Table_01/DatabaseTable_Columns';
import DatabaseTable_Rows from './Table_01/DatabaseTable_Rows';
import DatabaseTable02_Columns from './Table_02/DatabaseTable02_Columns';
import DatabaseTable02_Rows from './Table_02/DatabaseTable02_Rows';
import DatabaseTable03_Columns from './Table_03/DatabaseTable03_Columns';
import DatabaseTable03_Rows from './Table_03/DatabaseTable03_Rows';

import DatabaseTable04_Columns from './Table_04/DatabaseTable04_Columns';
import DatabaseTable04_Rows from './Table_04/DatabaseTable04_Rows';

import DatabaseTable05_Columns from './Table_05/DatabaseTable05_Columns';
import DatabaseTable05_Rows from './Table_05/DatabaseTable05_Rows';
import MonthYearSelector from './SelectMonthYears';
import './Table.scss';


  // let RowCounts = 9;
 
 

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
            <DatabaseTable_Rows />
          </tbody>
        </table>
        </div>

        <h2 className='hdg-lv2'>danh sách xin nghỉ phép - member</h2>
         <div className='table-container table--02'>
			<table className="table table__custom">
				<thead>
					<DatabaseTable02_Columns />
				</thead>
				<tbody>
					{/* RowCounts = {RowCounts} */}
					<DatabaseTable02_Rows />
				</tbody>
        	</table>
        </div>

		<h2 className='hdg-lv2'>Danh sách duyệt nghỉ phép admin</h2>
         <div className='table-container table--03'>
			<table className="table table__custom">
				<thead>
					<DatabaseTable03_Columns />
				</thead>
				<tbody>
					{/* RowCounts = {RowCounts} */}
					<DatabaseTable03_Rows />
				</tbody>
        	</table>
        </div>

		<h2 className='hdg-lv2'>danh sahcs thanh vien admin</h2>
         <div className='table-container table--04'>
			<table className="table table__custom">
				<thead>
					<DatabaseTable04_Columns />
				</thead>
				<tbody>
					{/* RowCounts = {RowCounts} */}
					<DatabaseTable04_Rows />
				</tbody>
        	</table>
        </div>
    </div>
  );
};

export default TablePage;