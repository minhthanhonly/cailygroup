import { useState } from "react";

export default function FormElementsEdit({...props}){
  const [fText, setFText] = useState('');
  const valFText = props.element.props.text;
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFText(event.target.value);
  };

  console.log(fText);


  return (
    <div>
      <input type="text" defaultValue={valFText} onChange={handleInput} />
    </div>
  )
}
