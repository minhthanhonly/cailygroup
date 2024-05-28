import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidCheck } from "../../../components/Validate";

const ComponentRadioButtons = forwardRef((props, ref) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setSelectedCheckbox(value);
    setIsChecked(e.target.checked);
  }

  const checkboxRef = useRef(null);
  useImperativeHandle(ref, () => ({
    validate: () => {
      let valid = true;
      if (isChecked === false && props.required === true) {
        valid = isValidCheck(isChecked, props.label);
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
                        type="radio"
                        ref={checkboxRef}
                        className="c-form-control"
                        value={option.text}
                        id={props.id}
                        name={props.id}
                        title={props.label}
                        onChange={handleCheckboxChange}
                        checked={selectedCheckbox === option.text}
                        required={props.required} />
                      <span className="checkmark checkmark--oval"></span>{option.text}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
});

export default ComponentRadioButtons;
