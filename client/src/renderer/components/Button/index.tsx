import { Link } from 'react-router-dom';
import './Button.scss';
import { ReactElement } from 'react';

type ButtonProps = {
  to?: string;
  href?: string;
  size?: string;
  children?: React.ReactNode;
  onButtonClick?: () => void;
  color?: string | null;
};

export const Button = (props: ButtonProps) => {
  let defineClassName: string[] = ['btn'];

  props.size ? defineClassName.push('btn--' + props.size) : defineClassName;
  props.color ? defineClassName.push('btn--' + props.color) : defineClassName;

  let className: string = defineClassName.join(' ');
  let Comp: ReactElement;

  if(props.href) {
    Comp = <a href={props.href} className={className}>{props.children}</a>
  } else if(props.to) {
    Comp = <Link to={props.to} className={className}>{props.children}</Link>
  } else {
    Comp = <button className={className}>{props.children}</button>
  }
  return Comp
};
