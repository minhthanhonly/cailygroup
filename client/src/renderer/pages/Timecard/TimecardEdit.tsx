import { useState } from "react"
import { SelectCustomName, SelectCustom } from "../../components/Table/SelectCustom"
import DatabaseTable_Columns from "../../components/Table/Table_01/DatabaseTable_Columns"
import DatabaseTable_Rows from "../../components/Table/Table_01/DatabaseTable_Rows"
import NavTimcard from "../../layouts/components/Nav/NavTimcard"
import MonthYearSelector from "../../components/Table/SelectMonthYears"

import './Timecard.scss'
import { Button } from "../../components/Button"

export const TimecardEdit = () => {

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const handleDateChange = (month: string, year: string, daysInMonth: Date[]) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setDaysInMonth(daysInMonth);

    console.log('setSelectedMonth(month);', month);
    console.log('setSelectedYear(year)', year);
  };
  return (
    <>
      <NavTimcard role="admin" />
      <div className="timeCard-edit">
        <div className="box-group box-group--second">
          <div className="box-group__item select-ml0">
            <SelectCustom />
          </div>
          <div className="box-group__item">
            <SelectCustomName />
          </div>
        </div>
        <div className='table-container table--01'>
          <table className="table table__custom">
            <thead>
              <DatabaseTable_Columns />
            </thead>
            <tbody>

              <DatabaseTable_Rows selectedMonth={selectedMonth} selectedYear={selectedYear} daysInMonth={daysInMonth} admin={true} />
            </tbody>
          </table>
        </div>


        <div className="grid-row mt-5 timeCard-edit--flex">
          <MonthYearSelector onChange={handleDateChange} />
          <Button color="orange">Tính Lại</Button>
          <Button>Hiện giờ trước khi chỉnh sửa</Button>
          <Button color="green" size="medium">Xuất Thẻ Giờ</Button>
        </div>

      </div>
    </>
  )
}
