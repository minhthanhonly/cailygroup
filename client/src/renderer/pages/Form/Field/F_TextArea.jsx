import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    return (
      <div style={{ ...this.props.style }} className='SortableItem rfb-item'>
        <div className="c-form">
          <div className="c-form-inner">
            <ComponentLabel {...this.props} />
            <div className="c-form-content">
              <textarea className="c-form-control" id={this.props.data.id} placeholder="入力してください"></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_TextArea;

