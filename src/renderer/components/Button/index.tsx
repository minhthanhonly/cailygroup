import './Button.scss';

type ButtonProps = {
  to?: string;
  href?: string;
  size?: string;
  children?: React.ReactNode;
  // onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  color?: string | null;
};

export const Button = (props: ButtonProps) => {
  let defineClassName: string[] = ['btn'];

  props.size ? defineClassName.push('btn--' + props.size) : defineClassName;
  props.color ? defineClassName.push('btn--' + props.color) : defineClassName;

  let className: string = defineClassName.join(' ');

  return props.href ? (
    <a href={props.href} className={className}>
      {props.children}
    </a>
  ) : (
    <button className={className}>{props.children}</button>
  );
};
