

import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';
import { isValidNumber, isValidText } from "../../../components/Validate";

const ComponentDatePicker = forwardRef((props, ref) => {
  const [time, setTime] = useState('');
  const [isValue, setIsValue] = useState('');
  const [isDateValue, setIsDateValue] = useState({});
  const customOptions = props.customOptions.length;
  const [valid, setIsValid] = useState(false);

  const handleTimeChange = (e) => {
    const { value } = e.target;
    // Đảm bảo giá trị nhập vào có định dạng HH:MM và không vượt quá 24 giờ và 59 phút
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      setTime(value);
    }
  };

  const handleChange = (e, index) => {
    props.parentCallback(props.label);
    setIsDateValue({...isDateValue, [index]: e.isValid});
  };

  const handleDaysChange = (e) => {
    setIsValue(e.target.value)
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
      return valid;
    },
  }));

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
            {/* {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} />
                </div>
                <div className="c-form-item--02">
                  <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} />
                </div>
              </div>
              : ''
            } */}
            {props.days === true ?
              <div className="c-form-item ml0">
                <input type="text" name={props.id} className="c-form-control c-form-control--02" placeholder="数字を入力" onChange={handleDaysChange} title="days" aria-label="日間" aria-description={true} required={props.required} data-type="is-Number" ref={inputRef} />
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
