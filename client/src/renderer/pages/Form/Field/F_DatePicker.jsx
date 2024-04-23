import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';
import ComponentDays from '../Component/ComponentDays';
import ComponentTimes from '../Component/ComponentTimes';
import ComponentTimesTo from '../Component/ComponentTimesTo';

class F_DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.options = {};
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
              <div className="grid-row">
                {this.props.data.custom_options.map((option) => {
                  const this_key = `preview_${option.key}`;
                  const props = {};
                  props.name = `option_${option.key}`;
                  props.type = 'text';
                  props.value = option.value;
                  if (self.props.mutable) {
                    props.defaultChecked = self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.key) > -1;
                  }
                  if (this.props.read_only) {
                    props.disabled = 'disabled';
                  }
                  return (
                    <div className={`${classNames} c-form-item`}key={this_key}>
                      <input type='text' className="c-form-control" placeholder='yyyy/mm/dd' id={`fid_${this_key}`} ref={c => {
                        if (c && self.props.mutable) {
                          self.options[`child_ref_${option.key}`] = c;
                        }
                      }} {...props} />
                    </div>
                  );
                })}
                <ComponentDays {...this.props} />
                <ComponentTimes {...this.props} />
                <ComponentTimesTo {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_DatePicker;
