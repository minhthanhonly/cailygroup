

import { useEffect, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';

export default function ComponentDatePicker(props){
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
                    inputMode={props.label}
                  />
                </div>
              ))
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
              <div className="c-form-item ml0">
                <input type="text" name={props.id} className="c-form-control c-form-control--02" placeholder="数字を入力" aria-label="日間" />
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
