import { Button } from '../../components/Button';
import MonthYearSelector from '../../components/Table/SelectMonthYears';
import DatabaseTable_Columns from '../../components/Table/Table_01/DatabaseTable_Columns';
import DatabaseTable_Rows from '../../components/Table/Table_01/DatabaseTable_Rows';

export const Timecard = () => {
  return (
    <div>
      <div className="table-container table--01">
        <table className="table table__custom">
          <thead>

          </thead>
          <tbody>


          </tbody>
        </table>
      </div>
      <p className="txt-note">Giờ nghỉ trưa từ 11:30 - 13:00.</p>
      <div className="wrp-button">
        <Button size="medium" color="green">
          Xuất Thẻ Giờ
        </Button>
        <Button>Đăng ký nghỉ phép</Button>
      </div>
    </div>
  );
};
