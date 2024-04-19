import React from 'react';
import ComponentLabel from './component-label';

class F_Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = 'custom-control custom-checkbox';
    if (this.props.data.inline) { classNames += ' option-inline'; }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    console.log(this.props.data.custom_options);
    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div className="group_box">
          <div className="grid-row group_box--grid">
            <div className="group_box--title">
              <ComponentLabel {...this.props} />
            </div>
            <div className="group_box__insert">
              <div className="grid-row group_box--form">
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
                    <div className={`${classNames} group_box--checkbox`}key={this_key}>
                      <div className="group_box--checkbox">

                        <label className="custom-control-label my_checkbox" htmlFor={`fid_${this_key}`}>
                          <input type='checkbox' id={`fid_${this_key}`} className="custom-control-input my_checkbox" ref={c => {
                            if (c && self.props.mutable) {
                              self.options[`child_ref_${option.key}`] = c;
                            }
                          }} {...props} />
                          <span></span>
                          {option.text}
                        </label>
                      </div>
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
