import { Button } from ".";

interface ButtonDeleteProps {
  onButtonClick?: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onButtonClick }) => {
  return <Button onButtonClick={onButtonClick} color="transparent"><img src={require('../../../../assets/icndelete.png')} alt="delete" className="fluid-image" /></Button>
}

export default ButtonDelete;
