import React from 'react';

class F_Text extends React.Component {

  render() {
    let classNames = 'static';
    // if (this.props.data.bold) { classNames += ' bold'; }
    // if (this.props.data.italic) { classNames += ' italic'; }

    let baseClasses = 'SortableItem rfb-item';
    // if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <p className={`${classNames} txt-lead`} dangerouslySetInnerHTML={{ __html: this.props.data.content }}/>
      </div>
    );
  }
}

export default F_Text;
