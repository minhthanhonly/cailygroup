import React from 'react';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const labelText = props.data.label;
  if (!labelText) {
    return null;
  }
  return (
    <label className={props.className || 'form-label'}>
      <span dangerouslySetInnerHTML={{ __html: labelText }}/>
      {hasRequiredLabel && <span className="label-required badge badge-danger txt-red">（必須）</span>}
    </label>
  );
};

export default ComponentLabel;
