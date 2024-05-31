import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidText } from "../../../components/Validate";

/* =======================================================================* */

const ComponentInputText = forwardRef((props, ref) => {
  const [isValue, setIsValue] = useState('');

  const handleChange = (e) => {
    setIsValue(e.target.value);
  }

  const inputTextRef = useRef(null);
  useImperativeHandle(ref, () => ({
    validate: () => {
      let valid = true;
      if (isValue === '' && props.required === true) {
        valid = isValidText(isValue, props.label);
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
          <input type="text" defaultValue={props.value} className="c-form-control" placeholder="入力してください" name={props.id} onChange={handleChange} aria-label={props.label} title={props.label} required={props.required} ref={inputTextRef} />
        </div>
      </div>
    </div>
  )
});

export default ComponentInputText;
