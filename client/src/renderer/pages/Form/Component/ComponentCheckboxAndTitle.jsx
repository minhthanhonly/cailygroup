export default function ComponentCheckboxAndTitle(props){
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
                              <input type='checkbox' className="c-form-control" value={option.text} name={props.id} title={props.label} />
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
}
