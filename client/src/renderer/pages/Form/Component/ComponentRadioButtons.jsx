export default function ComponentRadioButtons(){
  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        <div className="c-form-content">
          <div className="grid-row grid-row--02">
            <div className="c-form-item--03">
              <label className="c-form-label--03"><input type="radio" name="radio_name_1" className="c-form-control" /><span className="checkmark checkmark--oval"></span>出社</label>
            </div>
            <div className="c-form-item--03">
              <label className="c-form-label--03"><input type="radio" name="radio_name_1" className="c-form-control" /><span className="checkmark checkmark--oval"></span>出社</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
