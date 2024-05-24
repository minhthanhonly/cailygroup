import React from 'react';
import { forwardRef } from "react";

const F_MyInput = React.forwardRef((props, ref) => {
  const { name, defaultValue, disabled } = props;
  return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
});

export default F_MyInput;
