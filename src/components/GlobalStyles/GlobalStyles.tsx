import React from 'react';
import './GlobalStyles.scss';

const GlobalStyles: React.FC<Props> = (props: Props): JSX.Element => {
  const { children } = props;

  return children;
};

export default GlobalStyles;
