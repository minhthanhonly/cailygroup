import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidText } from "../../../components/Validate";

const ComponentTextArea = forwardRef((props, ref) => {
  const [isValue, setIsValue] = useState();

  const handleChange = (e) => {
    setIsValue(e.target.value);
  }

  const textAreaRef = useRef(null);
  useImperativeHandle(ref, () => ({
    validate: () => {
      let valid = true;
      if (isValue.trim() === '' && props.required === true) {
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
        <textarea className="c-form-control" placeholder="入力してください" name={props.id} onChange={handleChange} value="" aria-label={props.label} title={props.label} required={props.required} ref={textAreaRef}/>
      </div>
    </div>
  </div>
  )
});

export default ComponentTextArea;
