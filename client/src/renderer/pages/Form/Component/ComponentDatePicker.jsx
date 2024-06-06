

import { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker,  { DateObject } from 'react-multi-date-picker';
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { isValidNumber, isValidText, isValidTime } from "../../../components/Validate";

const ComponentDatePicker = forwardRef((props, ref) => {
  const [time, setTime] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [isValue, setIsValue] = useState('');
  const [isDateValue, setIsDateValue] = useState({});
  const customOptions = props.customOptions.length;
  let newfilterDaysVal = '';
  let isDateArrValue = [];
  let timeOld = '';
  let timeOld2 = '';

  if(props.value){
    const filterDaysVal = props.value.find(item => item.includes('日間') ? true : false);
    if(filterDaysVal){
      newfilterDaysVal = filterDaysVal.replace(/日間/g, '');
    }

    // let filteredArrVal = props.value.filter(function(item) {
    //   return !item.includes('日間');
    // });

    let filteredArrVal = props.value.filter(item => /^\d{4}-\d{2}-\d{2}/.test(item));

    filteredArrVal.map((value, index) => {
      isDateArrValue.push(value);
      Object.assign(isDateValue, {[index]: true});
    })

    // Truyền Label
    props.parentCallback(props.label);

    // Lấy ra thời gian trong mảng value
    const filterTimeVal = props.value.filter(item => item.includes('AM') || item.includes('PM') ? true : false);
    if(filterTimeVal.length === 1){

      // Lấy ra thời gian
      const [newHour, newMinute, aMpM]  = filterTimeVal[0].split(/:| /);
      let hourUpdate = 0;
      if(aMpM == "PM"){
        hourUpdate += hourUpdate + parseInt(newHour) + 12;
      } else {
        hourUpdate += hourUpdate + parseInt(newHour);
      }

      timeOld = new Date();
      timeOld.setHours(hourUpdate);
      timeOld.setMinutes(newMinute);
    }

    if(filterTimeVal.length > 1){

      // Lấy ra thời gian from
      const [newHour, newMinute, aMpM]  = filterTimeVal[0].split(/:| /);
      let hourUpdate = 0;
      if(aMpM == "PM"){
        hourUpdate += hourUpdate + parseInt(newHour) + 12;
      } else {
        hourUpdate += hourUpdate + parseInt(newHour);
      }

      timeOld = new Date();
      timeOld.setHours(hourUpdate);
      timeOld.setMinutes(newMinute);

      // Lấy ra thời gian to
      const [newHour2, newMinute2, aMpM2]  = filterTimeVal[1].split(/:| /);
      let hourUpdate2 = 0;
      if(aMpM2 == "PM"){
        hourUpdate2 += hourUpdate2 + parseInt(newHour2) + 12;
      } else {
        hourUpdate2 += hourUpdate2 + parseInt(newHour2);
      }

      timeOld2 = new Date();
      timeOld2.setHours(hourUpdate2);
      timeOld2.setMinutes(newMinute2);
    }
  }

  useEffect(() => {
    if(props.value) {
      setIsValue(newfilterDaysVal);
      setTime(timeOld);
      setTimeTo(timeOld2)
    }
  },[])


  const handleTimeChange = (e) => {
    let timeObj = new Date(e);
    setTime(timeObj);
	};

  const handleTimeToChange = (e) => {
    let timeToObj = new Date(e);
    setTimeTo(timeToObj);
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
          if(time === '') {
            valid = isValidText(time, '時 (From)');
          }
          if (timeTo === '') {
            valid = isValidText(timeTo, '時 (To)');
          }
        }

        // times
        if (props.times === true) {
          if (time === '') {
            valid = isValidText(time, '時');
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
                    editable={false}
                  />
                </div>
              ))
            }
            {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <DatePicker
                    value={time}
                    onChange={handleTimeChange}
                    format="hh:mm A"
                    plugins={[<TimePicker position="bottom" hideSeconds="true" />]}
                    hideWeekDays
                    disableDayPicker
                    inputClass="c-form-control"
                    placeholder="hh:mm"
                    name={props.id}
                    required={props.required}
                    title={props.label}
                    ref={inputRef}
                    editable={false}
                  />
                </div>
                <div className="c-form-item--02">
                  <DatePicker
                    value={timeTo}
                    onChange={handleTimeToChange}
                    format="hh:mm A"
                    plugins={[<TimePicker position="bottom" hideSeconds="true" />]}
                    hideWeekDays
                    disableDayPicker
                    inputClass="c-form-control"
                    placeholder="hh:mm"
                    name={props.id}
                    required={props.required}
                    title={props.label}
                    ref={inputRef}
                    editable={false}
                  />
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
                  <DatePicker
                    value={time}
                    onChange={handleTimeChange}
                    format="hh:mm A"
                    plugins={[<TimePicker position="bottom" hideSeconds="true" />]}
                    hideWeekDays
                    disableDayPicker
                    inputClass="c-form-control"
                    placeholder="hh:mm　修正後の時間"
                    name={props.id}
                    required={props.required}
                    title={props.label}
                    ref={inputRef}
                    editable={false}
                  />

                  {/* <input type="text" name={props.id} className="c-form-control" placeholder="hh:mm　修正後の時間" onChange={handleTimeChange} title={props.label} aria-label={props.label}/> */}
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
