import React from 'react';
import ComponentLabel from '../Component/ComponentLabel';

class F_InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
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
              <div className="grid-row grid-row--02">
                <div className="c-form-item--04 w60per">
                  <input type="file" id="fileInput" className="group_box--fileInput"/>
                  <input type="text" className="w50 box-input c-form-control" />
                </div>
                <div className="c-form-item--04 w30per">
                  <button className="group_box--button ml0">ファイル選択</button>
                  <button className="group_box--button group_box--button__red">キャンセル</button>
                </div>
              </div>
              <p className="mt10 txt-note txt-note--01">全てのデータをひとつのフォルダにまとめてzipファイルに圧縮してからアップロードしてください。</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default F_InputFile;
