export default function F_TextArea(){
  return (
    <div className="group_box">
      <div className="grid-row group_box--grid">
        <div className="group_box--title">
          <p>期間 <span className="txt-red">（必須）</span></p>
        </div>
        <div className="group_box__insert">
          <div className="grid-row group_box--form">
            <div className="group_box--box">
              <div className="group_box--flex">
                <textarea className="group_box--area"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
