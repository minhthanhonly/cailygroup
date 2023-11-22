


import DatabaseTable_Columns from './DatabaseTable_Columns';
import DatabaseTable_Rows from './DatabaseTable_Rows';
import MonthYearSelector from './SelectMonthYears';
import './Table.scss';


  // let RowCounts = 9;
  let ColumCounts = 9;


const TablePage = () =>  {




  return (
    <div>
      <h2>Table Page</h2>
        <MonthYearSelector />
      <table className="table table__custom">
        <thead>
          <DatabaseTable_Columns ColumCounts={ColumCounts} />
        </thead>
        <tbody>
          {/* RowCounts = {RowCounts} */}
          <DatabaseTable_Rows    />
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;