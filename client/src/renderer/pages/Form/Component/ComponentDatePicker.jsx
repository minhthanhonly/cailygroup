

import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';

export default function ComponentDatePicker(props){
  const [time, setTime] = useState('');
  const [countDay, setCountDay] = useState('');

  const handleTimeChange = (e) => {
    const { value } = e.target;
    // Đảm bảo giá trị nhập vào có định dạng HH:MM và không vượt quá 24 giờ và 59 phút
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      setTime(value);
    }
  };

  const handleCountDayChange = (e) => {
    setCountDay(e.target.value);
    // props.parentCountDayCallback(countDay);
  }



  const handleChange = () => {
    props.parentCallback(props.label);
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
              props.customOptions.map((option, index) => (
                <div className="c-form-item" key={index}>
                  <DatePicker
                    onChange={handleChange}
                    format="YYYY-MM-DD"
                    inputClass="c-form-control"
                    placeholder="yyyy/mm/dd"
                    name={props.id}
                    required={props.required}
                    title={option.text}
                  />
                </div>
              ))
            }
            {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} />
                </div>
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} />
                </div>
              </div>
              : ''
            }
            {props.days === true ?
              <div className="c-form-item ml0">
                <input type="text" name={props.id} className="c-form-control c-form-control--02" placeholder="数字を入力" onChange={handleChange} title="days" aria-label="日間" aria-description={true} />
                <label className="c-form-label--02">日間</label>
              </div>
              : ''
            }
            {props.times === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm　修正後の時間" onChange={handleTimeChange} title={props.label} aria-label={props.label}/>
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
