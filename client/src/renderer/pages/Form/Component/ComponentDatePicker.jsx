export default function ComponentDatePicker(props){
  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        <div className="c-form-content">
          <div className="grid-row">
            {
              props.customOptions.map((option, index) => {
                return (
                  <div className="c-form-item" key={index}>
                    <input type="text" className="c-form-control" placeholder="yyyy/mm/dd" />
                  </div>
                )
              })
            }
            {props.timesto === true ?
              <div className="c-form-inner">
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
                <div className="c-form-item--02">
                  <input type="text" className="c-form-control" placeholder="hh:mm" />
                </div>
              </div>
              : ''
            }
            {props.days === true ?
              <div className="c-form-item">
                <input type="text" className="c-form-control c-form-control--02" />
                <label className="c-form-label--02">日間</label>
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}
