export default function F_InputText(){
  return (
    <div className="group_box">
      <div className="grid-row group_box--grid">
        <div className="group_box--title">
          <p>期間 <span className="txt-red">（必須）</span></p>
        </div>
        <div className="group_box__insert">
          <div className="grid-row group_box--form ">
            <div className="group_box--box">
              <div className="group_box--flex"><input type="text" className="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
