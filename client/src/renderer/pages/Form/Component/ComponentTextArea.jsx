export default function ComponentTextArea(props){
  const handleInput = (e) => {
    props.parentCallback(props.name, e.target.value);
  }
  return (
  <div className="c-form">
    <div className="c-form-inner">
      <label className="c-form-label">
        <span>{props.label}</span>
        {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
      </label>
      <div className="c-form-content">
        <textarea className="c-form-control" placeholder="入力してください" name={props.name} onChange={handleInput}></textarea>
      </div>
    </div>
  </div>
  )
}
