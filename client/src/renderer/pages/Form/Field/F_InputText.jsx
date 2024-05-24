import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_InputText extends React.Component {
  constructor(props) {
    super(props);
    // this.inputField = React.createRef();
  }

  render() {
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

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <div className="c-form">
          <div className="c-form-inner">
            <ComponentLabel {...this.props} />
            <div className="c-form-content">
              <input className="c-form-control" id={this.props.data.id} placeholder="入力してください" {...props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_InputText;
