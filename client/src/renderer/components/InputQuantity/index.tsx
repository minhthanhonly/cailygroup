import React, { ChangeEvent, useState } from 'react';

import './InputQuantity.scss';

type InputQuantityProps = {
  total: number;
  onItemsPerPageChange: (value: number) => void;
};

export const InputQuantity = (props: InputQuantityProps) => {
  const [inputValue, setInputValue] = useState('5');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    props.onItemsPerPageChange(Number(value));
  };

  return (
    <span className="title-quantity">
      Số Lượng Hiển Thị{' '}
      <span className="input-show">
        <input value={inputValue} onChange={handleInputChange} type="text" />
      </span>
    </span>
  );
};