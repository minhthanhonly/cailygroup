import CTable_Col from './TableCustom/CTable_Col';
import CTable_Row from './TableCustom/CTable_Row';

let Col_count_rows = 3;
const Col_title = {
  col_1: 'STT',
  col_2: 'Tên Nhóm',
  col_3: 'Hành động',
};
export const TableGroup = () => {
  return (
    <div className="table-container">
      <table className="table table__custom">
        <thead>
          <CTable_Col Col_count={Col_count_rows} Col_title={Col_title} />
        </thead>
        <tbody>{/* <CTable_Row Rows_count={Col_count_rows} /> */}</tbody>
      </table>
    </div>
  );
};
