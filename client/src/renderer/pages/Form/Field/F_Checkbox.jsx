import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_Checkbox extends React.Component {
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

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div className="c-form">
          <div className="c-form-inner">
            <ComponentLabel {...this.props} />
            <div className="c-form-content">
              <div className="grid-row grid-row--02">
                {this.props.data.custom_options.map((option) => {
                  const this_key = `preview_${option.key}`;
                  const props = {};
                  props.name = `option_${option.key}`;
                  props.type = 'checkbox';
                  props.value = option.value;
                  if (self.props.mutable) {
                    props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1;
                  }
                  if (this.props.read_only) {
                    props.disabled = 'disabled';
                  }
                  return (
                    <div className={`${classNames} c-form-item--03`}key={this_key}>
                      <label className="c-form-label--03">
                        <input type='checkbox' className="c-form-control" id={`fid_${this_key}`} ref={c => {
                          if (c && self.props.mutable) {
                            self.options[`child_ref_${option.key}`] = c;
                          }
                        }} {...props} />
                        <span className="checkmark"></span>
                        {option.text}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_Checkbox;
