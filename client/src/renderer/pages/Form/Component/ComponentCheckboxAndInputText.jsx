import { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";
import { isValidCheck, isValidText } from "../../../components/Validate";

const ComponentCheckboxAndInputText = forwardRef((props, ref) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isValue, setIsValue] = useState('');

  let newCheckboxVal = '';
  let newCheckboxArrVal = [];
  let isValOld = ''

  if(props.value) {
    props.value.map((item, index) => {
      props.customOptions.filter(item2 => item2.text === item ? newCheckboxArrVal.push(item) : false);
    })

    newCheckboxArrVal.map((item) => {
      newCheckboxVal = item;
    })

    isValOld = props.value.find(item => !item.includes(newCheckboxVal) ? true : false);
  }



  useEffect(() => {
    if(props.value) {
      setSelectedCheckbox(newCheckboxVal);
      setIsValue(isValOld);
      setIsChecked(true);
    }
  },[])

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
            <input type="text" name={props.id} className="c-form-control" value={isValue} onChange={handleChange} aria-label={props.label} title={props.label} required={props.required} placeholder='出張先を入力' ref={checkboxRef} />
          </div>
        </div>
      </div>
    </div>
  )
});

export default ComponentCheckboxAndInputText;
