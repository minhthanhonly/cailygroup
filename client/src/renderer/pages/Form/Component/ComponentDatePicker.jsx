

import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';
import { isValidNumber, isValidText, isValidTime } from "../../../components/Validate";

const ComponentDatePicker = forwardRef((props, ref) => {
  const [time, setTime] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [isValue, setIsValue] = useState('');
  const [isDateValue, setIsDateValue] = useState({});
  const customOptions = props.customOptions.length;
  const [valid, setIsValid] = useState(false);

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleTimeToChange = (e) => {
    setTimeTo(e.target.value);
  };

  const handleChange = (e, index) => {
    props.parentCallback(props.label);
    setIsDateValue({...isDateValue, [index]: e.isValid});
  };

  const handleDaysChange = (e) => {
    setIsValue(e.target.value);
  };

  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    validate: () => {
      let valid = true;
      if (Object.values(isDateValue).length !== customOptions && props.required === true) {
        valid = isValidText("", props.label);
      }
      if (isValue === '' && props.required === true && props.days === true) {
        valid = isValidText(isValue, '日間');
      }
      if (isValue && props.required === true && props.days === true) {
        valid = isValidNumber(isValue, '日間');
      }

      if(props.required === true){
        // timesto
        if (props.timesto === true) {
          if (time === '') {
            valid = isValidText(time, '時 (From)');
          }
          if (time) {
            valid = isValidTime(time, '時 (From)');
          }
          if (timeTo === '') {
            valid = isValidText(timeTo, '時 (To)');
          }
          if (timeTo) {
            valid = isValidTime(timeTo, '時 (To)');
          }
        }

        // times
        if (props.times === true) {
          if (time === '') {
            valid = isValidText(time, '時');
          }
          if (time) {
            valid = isValidTime(time, '時');
          }
        }
      }
      return valid;
    },
  }));

  const filterDaysVal = props.value.find(item => item.includes('日間') ? true : false);

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
                    value={props.value[index]}
                    onChange={(e) => handleChange(e, index)}
                    format="YYYY-MM-DD"
                    inputClass="c-form-control"
                    placeholder="yyyy/mm/dd"
                    name={props.id}
                    required={props.required}
                    title={option.text}
                    ref={inputRef}
                  />
                </div>
              ))
            }
            {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} ref={inputRef} />
                </div>
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={timeTo} onChange={handleTimeToChange} title={props.label} aria-label={props.label} ref={inputRef} />
                </div>
              </div>
              : ''
            }
            {props.days === true ?
              <div className="c-form-item ml0">
                <input type="text" defaultValue={filterDaysVal} name={props.id} className="c-form-control c-form-control--02" placeholder="数字を入力" onChange={handleDaysChange} title="days" aria-label="日間" aria-description={true} required={props.required} data-type="is-Number" ref={inputRef} />
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
});

export default ComponentDatePicker;
