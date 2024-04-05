export default function F_CheckboxGroup(){
  return (
    <div className="group_box">
      <div className="grid-row group_box--grid">
        <div className="group_box--title">
          <p>期間 <span className="txt-red">（必須）</span></p>
        </div>
        <div className="group_box__insert">
          <div className="grid-row group_box--form ">
            <div className="group_box--checkbox">
              <label><input type="checkbox" name="checkbox" /><span></span>遅刻</label>
            </div>
            <div className="group_box--checkbox">
              <label><input type="checkbox" name="checkbox" /><span></span>遅刻</label>
            </div>
            <div className="group_box--checkbox">
              <label><input type="checkbox" name="checkbox" /><span></span>遅刻</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
