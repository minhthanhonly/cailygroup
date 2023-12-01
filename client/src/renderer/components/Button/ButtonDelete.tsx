

type ButtonDeleteProps = {
  onButtonClick?: () => void;
};

export const ButtonDelete = (props: ButtonDeleteProps) => {
  return <button className="btn--delete" onClick={props.onButtonClick}><img src={require('../../assets/images/icndelete.png')} alt="edit" className="fluid-image" /></button>;
};
