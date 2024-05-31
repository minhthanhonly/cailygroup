import { useImperativeHandle, forwardRef, useRef, useState } from "react";
import { isValidText, isValidTextArea } from "../../../components/Validate";

const ComponentTextArea = forwardRef((props, ref) => {
  const [isValue, setIsValue] = useState('');

  const handleChange = (e) => {
    setIsValue(e.target.value);
  }

  // const textAreaRef = useRef(null);
  // useImperativeHandle(ref, () => ({
  //   validate: () => {
  //     let valid = true;
  //     let required = true;
  //     if (isValue === '' && props.required === true) {
  //       valid = isValidText(isValue, props.label);
  //     } else {
  //       required = false;
  //     }
  //     return valid;
  //   },
  // }));

  return (
  <div className="c-form">
    <div className="c-form-inner">
      <label className="c-form-label">
        <span>{props.label}</span>
        {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
      </label>
      <div className="c-form-content">
        <textarea defaultValue={props.value} className="c-form-control" placeholder="入力してください" name={props.id} aria-label={props.label} title={props.label} required={props.required}/>
      </div>
    </div>
  </div>
  )
});

export default ComponentTextArea;
