import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_TextAndLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const self = this;
    const props = {};
    props.type = 'text';
    // props.className = 'form-control';
    props.name = this.props.data.field_name;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let cusProps = self.props.data.props;

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div className="c-form">
          <div className="c-form-inner">
            <ComponentLabel {...this.props} />
            <div className="c-form-content">
              {
                cusProps.map((item, index) => {
                  return <p key={index}>{item.text}</p>
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_TextAndLabel;
