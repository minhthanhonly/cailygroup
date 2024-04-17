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

    console.log(this.props.data);
    return (
      <div style={{ ...this.props.style }} className={baseClasses}>

        {this.props.data.options.map((option) => {
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
            <div className={classNames} key={this_key}>
              <input id={`fid_${this_key}`} className="custom-control-input my_checkbox" ref={c => {
                if (c && self.props.mutable) {
                  self.options[`child_ref_${option.key}`] = c;
                }
              }} {...props} />
              <label className="custom-control-label my_checkbox" htmlFor={`fid_${this_key}`}>{option.text}</label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default F_Checkbox;
