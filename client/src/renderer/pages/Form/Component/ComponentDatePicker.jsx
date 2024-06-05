

import { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { isValidNumber, isValidText, isValidTime } from "../../../components/Validate";

const ComponentDatePicker = forwardRef((props, ref) => {
  const [time, setTime] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [isTimeValue, setIsTimeValue] = useState(false);
  const [isHour, setIsHour] = useState(1);
  const [isValue, setIsValue] = useState('');
  const [isDateValue, setIsDateValue] = useState({});
  const customOptions = props.customOptions.length;
  let newfilterDaysVal = '';
  let isDateArrValue = [];

  if(props.value){
    const filterDaysVal = props.value.find(item => item.includes('日間') ? true : false);
    if(filterDaysVal){
      newfilterDaysVal = filterDaysVal.replace(/日間/g, '');
    }

    let filteredArrVal = props.value.filter(function(item) {
      return !item.includes('日間');
    });

    filteredArrVal.map((value, index) => {
      isDateArrValue.push(value);
      Object.assign(isDateValue, {[index]: true});
    })

    // Truyền Label
    props.parentCallback(props.label);
  }

  useEffect(() => {
    if(props.value) {
      setIsValue(newfilterDaysVal);
    }
  },[])

  const handleTimeChange = (e, input, isTyping) => {
    setIsTimeValue(true);
    console.log(e);
    console.log(input.value);
    console.log(isTyping);
    // if(input) {
    //   setTime(input.value);
    //   setIsTimeValue(true);
    // }

    // if(isTyping === true){
    //   setIsHour(e.hour);
    // }
	};

  const handleTimeToChange = (e, input, isTyping) => {
    // if (!isTyping) return setTimeTo(e);

    if(input) {
      // setTime(input.value);
      setIsTimeValue(true);
      console.log(input.value);
    }

    if(isTyping){
      setTime(input.value);
      setIsTimeValue(true);
    }
  };

  const handleChange = (e, index, date) => {
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

      if(props.required === true) {
        // timesto
        if (props.timesto === true) {

          if(time === '' && isTimeValue === false) {
            valid = isValidText(time, '時 (From)')
          } else if(isHour === 0) {
            valid = isValidText(time, '時 (From)')
          }

          console.log(isHour);
          // if (time) {
          //   valid = isValidTime(time, '時 (From)');
          // }
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
                    value={isDateArrValue[index]}
                    onChange={(e, date) => handleChange(e, index, date)}
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
                  <DatePicker
                    value={time}
                    onChange={(e, { input, isTyping }) => handleTimeChange(e, input, isTyping)}
                    format="hh:mm A"
                    plugins={[<TimePicker position="bottom" format="hh:ii" hideSeconds="true" />]}
                    hideWeekDays
                    disableDayPicker
                    inputClass="c-form-control"
                    placeholder="hh:mm"
                    name={props.id}
                    required={props.required}
                    title={props.label}
                    ref={inputRef}
                  />

                  {/* <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={time} onChange={handleTimeChange} title={props.label} aria-label={props.label} ref={inputRef} /> */}
                </div>
                <div className="c-form-item--02">
                  <DatePicker
                    value={timeTo}
                    onChange={(e, { input, isTyping }) => handleTimeToChange(e, input, isTyping)}
                    format="hh:mm A"
                    plugins={[<TimePicker position="bottom" format="hh:ii" hideSeconds="true" />]}
                    hideWeekDays
                    disableDayPicker
                    inputClass="c-form-control"
                    placeholder="hh:mm"
                    name={props.id}
                    required={props.required}
                    title={props.label}
                    ref={inputRef}
                  />
                  {/* <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm" defaultValue={timeTo} onChange={handleTimeToChange} title={props.label} aria-label={props.label} ref={inputRef} /> */}
                </div>
              </div>
              : ''
            }
            {props.days === true ?
              <div className="c-form-item ml0">
                <input type="text" value={isValue} name={props.id} className="c-form-control c-form-control--02" placeholder="数字を入力" onChange={handleDaysChange} title="days" aria-label="日間" aria-description={true} required={props.required} data-type="is-Number" ref={inputRef} />
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
