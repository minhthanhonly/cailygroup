import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidCheck } from "../../../components/Validate";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-multi-date-picker';

const ComponentCheckboxAndDate = forwardRef((props, ref) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isDate, setIsDate] = useState('');

  const handleCheckboxChange = (e) => {
    setSelectedCheckbox(e.target.value);
    setIsChecked(false);
    if(e.target.checked === true) {
      setIsDate('');
    }
  }

  const handleCheckboxChange02 = (e) => {
    setSelectedCheckbox(e.target.value);
    setIsChecked(true);
  }

  const handleChange = (date) => {
    setIsChecked(true);
    if (date !== null) {
      const dateObjects = new Date( date);
      setIsDate(dateObjects);
    }
    setSelectedCheckbox('');
  };

  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        <div className="c-form-content">
          <div className="grid-row grid-row--02">
            {
              props.customOptions.map((option, index) => {
                return (
                  <div className="c-form-item--03" key={index}>
                    <label className="c-form-label--03">
                      <input
                      id={props.id}
                      type="checkbox"
                      checked={selectedCheckbox === option.text}
                      className="c-form-control"
                      value={option.text}
                      name={props.id}
                      onChange={handleCheckboxChange}
                      title={props.label} />
                      <span className="checkmark"></span>
                      {option.text}
                    </label>
                  </div>
                )
              })
            }
            <div className="c-form-item--03">
              <label className="c-form-label--03">
                <input type='checkbox' className="c-form-control" checked={isChecked} value={null} name={props.id} onChange={handleCheckboxChange02} title={props.label} /><span className="checkmark"></span>
                <DatePicker
                  onChange={(date) => handleChange(date)}
                  value={isDate}
                  format="YYYY-MM-DD"
                  inputClass="c-form-control c-form-control--03"
                  placeholder="yyyy/mm"
                  name={props.id}
                  required={props.required}
                  title={props.id}
                />
                <span className='c-form-label--02'>から適用</span>
              </label>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
});

export default ComponentCheckboxAndDate;
