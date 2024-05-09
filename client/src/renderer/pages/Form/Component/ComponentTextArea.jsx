export default function ComponentTextArea(props){
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
        <textarea className="c-form-control" placeholder="入力してください" name={props.id} onChange={props.onHandle} title={props.label} required={props.required}></textarea>
      </div>
    </div>
  </div>
  )
}
