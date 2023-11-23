import './Button.scss';

type ButtonProps = {
  btnSize?: string | null;
  btnColor?: string | null;
  text: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`btn ${props.btnSize ? 'btn--' + props.btnSize : ''} ${
        props.btnColor ? 'btn--' + props.btnColor : ''
      }`}
    >
      {props.text}
    </button>
  );
};
