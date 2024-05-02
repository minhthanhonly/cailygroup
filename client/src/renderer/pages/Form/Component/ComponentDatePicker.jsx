
import e from "express";
import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';

export default function ComponentDatePicker(props){

  const [leaveDate, setLeaveDate] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(0);
  const handleDateChange = (date) => {
    // if (date !== null) {
    //   const dateObjects = date.map((dateString) => new Date(dateString));
    //   setLeaveDate(dateObjects);
    //   props.parentCallback(props.label, ...leaveDate);
    // }

    // const dateObjects = new Date(date);

    // props.parentCallback(props.label, dateObjects);
  };



  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        <div className="c-form-content">
          <div className="grid-row">
            {
              props.customOptions.map((option, index) => {
                return (
                  <div className="c-form-item" key={index}>
                    {/* <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" /> */}
                    <DatePicker
                      onChange={(date) => handleDateChange(date)}
                      value={option.key}
                      format="YYYY-MM-DD"
                      inputClass="c-form-control"
                      placeholder="yyyy/mm/dd"
                      name={option.key}
                    />
                  </div>
                )
              })
            }
            {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
              </div>
              : ''
            }
            {props.days === true ?
              <div className="c-form-item">
                <input type="text" className="c-form-control c-form-control--02" />
                <label className="c-form-label--02">日間</label>
              </div>
              : ''
            }
            {props.times === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm　修正後の時間" />
                </div>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}
