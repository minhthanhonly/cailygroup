import './Button.scss';

type ButtonProps = {
  to?: string;
  href?: string;
  disabled?: false;
  size?: string;
  children?: React.ReactNode;
  className?: any;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  color?: string | null;
  // passProps?: [];
};

export const Button = (props: ButtonProps) => {
  let Comp = 'button';
  props.href ? (Comp = 'a') : (Comp = 'button');

  return (
    <Comp
      className={`btn ${props.size ? 'btn--' + props.size : ''} ${
        props.color ? 'btn--' + props.color : ''
      }`}
    >
      {props.children}
    </Comp>
  );
};

// export const Button = (props: ButtonProps) => {
//   return (
//     <button
//       className={`btn ${props.btnSize ? 'btn--' + props.btnSize : ''} ${
//         props.btnColor ? 'btn--' + props.btnColor : ''
//       }`}
//     >
//       {props.text}
//     </button>
//   );
// };
