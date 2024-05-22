import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidCheck, isValidText } from "../../../components/Validate";

const ComponentCheckboxAndInputText = forwardRef((props, ref) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isValue, setIsValue] = useState('');

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setSelectedCheckbox(value);
    setIsChecked(e.target.checked);
  }

  const handleChange = (e) => {
    setIsValue(e.target.value);
  }

  const checkboxRef = useRef(null);
  useImperativeHandle(ref, () => ({
    validate: () => {
      let valid = true;
      if(props.required === true) {
        if (isChecked === false) {
          valid = isValidCheck(isChecked, props.label);
        }
        if (isValue === '') {
          valid = isValidText(isValue, props.label);
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
          <div className="grid-row grid-row--02">
            {
              props.customOptions.map((option, index) => {
                return (
                  <div className="c-form-item--03" key={index}>
                    <label className="c-form-label--03">
                      <input
                      type="checkbox"
                      ref={checkboxRef}
                      className="c-form-control"
                      value={option.text}
                      id={props.id}
                      name={props.id}
                      title={props.label}
                      onChange={handleCheckboxChange}
                      checked={selectedCheckbox === option.text}
                      required={props.required} />
                      <span className="checkmark"></span>
                      {option.text}
                    </label>
                  </div>
                )
              })
            }
          </div>
          <div className='c-form-row'>
            <input type="text" name={props.id} className="c-form-control" defaultValue={isValue} onChange={handleChange} aria-label={props.label} title={props.label} required={props.required} placeholder='出張先を入力' ref={checkboxRef} />
          </div>
        </div>
      </div>
    </div>
  )
});

export default ComponentCheckboxAndInputText;
