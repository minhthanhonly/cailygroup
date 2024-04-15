export default function F_Text({text}){
  return (
    <p className="txt-lead" dangerouslySetInnerHTML={{ __html: text }}/>
  )
}
