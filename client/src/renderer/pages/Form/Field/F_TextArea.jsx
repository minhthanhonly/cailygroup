import React from 'react';
import ComponentLabel from './component-label';

class F_TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {};
    // props.type = 'text';
    props.className = 'form-control';
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
        <div className="group_box">
          <div className="grid-row group_box--grid">
            <div className="group_box--title">
              <ComponentLabel {...this.props} />
            </div>
            <div className="group_box__insert">
              <div className="grid-row group_box--form ">
                <div className="group_box--box">
                  <div className="group_box--flex">
                    <textarea className="group_box--area"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_TextArea;

