import DatabaseTable02_Columns from '../../components/Table/Table_02/DatabaseTable02_Columns';
import DatabaseTable02_Rows from '../../components/Table/Table_02/DatabaseTable02_Rows';

export const Dayoff = () => {
  return (
    <div className="table-container table--02">
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
  );
};
