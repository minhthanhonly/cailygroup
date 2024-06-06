import { useImperativeHandle, forwardRef, useRef, useState, useEffect } from "react";
import { isValidCheck } from "../../../components/Validate";

const ComponentCheckboxAndTitle = forwardRef((props, ref) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  let selectedCheckboxOld = '';

  if(props.value) {
    props.value.map(item => {
      selectedCheckboxOld = item;
    })
  };

  useEffect(() => {
    if(props.value) {
      setSelectedCheckbox(selectedCheckboxOld);
      setIsChecked(true);
    }
  },[])

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
          {
            props.customProps.map((item, index) => {
              return (
                <div className="c-form-row" key={index}>
                  <p className="c-form-title">{item.title}</p>
                  <div className="grid-row grid-row--02">
                    {
                      item.checkboxOptions.map((option, index) => {
                        return (
                          <div className="c-form-item--03" key={index}>
                            <label className="c-form-label--03">
                              <input
                              type='checkbox'
                              ref={checkboxRef}
                              className="c-form-control"
                              value={option.text}
                              id={props.id}
                              name={props.id}
                              title={props.label}
                              onChange={handleCheckboxChange}
                              checked={selectedCheckbox === option.text}
                              required={props.required}/>
                              <span className="checkmark"></span>
                              {option.text}
                            </label>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
});

export default ComponentCheckboxAndTitle;
