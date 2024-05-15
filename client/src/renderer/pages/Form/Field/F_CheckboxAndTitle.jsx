import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_CheckboxAndTitle extends React.Component {
  constructor(props) {
    super(props);
    this.custom_options = {};
  }

  render() {
    const self = this;
    let classNames = '';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    let cusProps = self.props.data.props;

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div className="c-form">
          <div className="c-form-inner">
            <ComponentLabel {...this.props} />
            <div className="c-form-content">
              {
                cusProps.map((item, index) => {
                  return (
                    <div className='c-form-row' key={index}>
                      <p className="c-form-title">{item.title}</p>
                      <div className="grid-row grid-row--02">
                        {
                          item.checkboxOptions.map((option, index) => {
                            const this_key = `preview_${option.key}`;
                            const this_name = `option_${option.key}`;
                            const this_value = option.value;
                            return (
                              <div className={`${classNames} c-form-item--03`} key={index}>
                                <label className="c-form-label--03">
                                <input type='checkbox' className="c-form-control" id={`fid_${this_key}`} name={this_name} value={this_value} />
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
      </div>
    );
  }
}

export default F_CheckboxAndTitle;
