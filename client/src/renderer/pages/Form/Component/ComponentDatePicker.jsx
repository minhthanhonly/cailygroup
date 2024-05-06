

import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';

export default function ComponentDatePicker(props){
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [dateValue, setDateValue] = useState({StartDate: '', EndDate: ''});

  const handleDateChange = (date) => {
    if (date !== null) {
      const dateObjects = new Date(date);
      props.parentCallback(props.label, [...dateValue, dateObjects]);
    }
  };

  const handleStartDateChange = (date) => {
    const dateObjects = new Date(date);
    props.parentCallbackStartDate('StartDate', dateObjects);
  };

  const handleEndDateChange = (date) => {
    const dateObjects = new Date(date);
    props.parentCallbackEndDate('EndDate', dateObjects);
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
            {/* {
              props.customOptions.map((option, index) => (
                <div className="c-form-item" key={index}>
                  <DatePicker
                    onChange={(date) => handleDateChange(date)}
                    value={option.key}
                    format="YYYY-MM-DD"
                    inputClass="c-form-control"
                    placeholder="yyyy/mm/dd"
                    name={option.key}
                  />
                </div>
              ))
            } */}
            {
              (props.customOptions.length > 1) ?
                <>
                  <div className="c-form-item">
                    <DatePicker
                      onChange={handleStartDateChange}
                      value={startDate}
                      format="YYYY-MM-DD"
                      inputClass="c-form-control"
                      placeholder="yyyy/mm/dd"
                    />
                  </div>
                  <div className="c-form-item">
                    <DatePicker
                      onChange={handleEndDateChange}
                      value={endDate}
                      format="YYYY-MM-DD"
                      inputClass="c-form-control"
                      placeholder="yyyy/mm/dd"
                    />
                  </div>
                </>
              :
              <DatePicker
                onChange={(date) => handleDateChange(date)}
                format="YYYY-MM-DD"
                inputClass="c-form-control"
                placeholder="yyyy/mm/dd"
                onPropsChange={(key, date) => handleDateChange(key, date)}
              />
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
