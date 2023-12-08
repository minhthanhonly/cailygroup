import { Link } from "react-router-dom";

interface ButtonEditProps {
  href: string;
}

const ButtonEdit: React.FC<ButtonEditProps> = ({ href }) => {
  return <Link to={href}><img src={require('../../assets/images/icnedit.png')} alt="edit" className="fluid-image" /></Link>
}

export default ButtonEdit;
