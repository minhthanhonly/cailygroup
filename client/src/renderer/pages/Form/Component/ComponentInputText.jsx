import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ERROR } from "../../../components/Validate/"

/* =======================================================================* */

export default function ComponentInputText(props){
  const [inputText, setInputText] = useState();

  const handleInput = (e) => {
    props.parentCallback(props.keys, props.id, props.label, e.target.value);
  }

  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        <div className="c-form-content">
          <input type="text" className="c-form-control" placeholder="入力してください" name={props.id} onChange={props.onHandle} title={props.label} required={props.required} />
        </div>
      </div>
    </div>
  )
}
