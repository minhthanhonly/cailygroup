export default function ComponentInputFile(props){
  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>
          {props.required === true ? <span className="c-form-label--required txt-red">（必須）</span> : ''}
        </label>
        {/* <div className="c-form-content">
          <input type="text" className="c-form-control" placeholder="入力してください" name={props.id} onChange={props.onHandle} aria-label={props.label} title={props.label} required={props.required} />
        </div> */}

        <div className="c-form-content">
          <div className="grid-row grid-row--02">
            <div className="c-form-item--04 w60per">
              <input type="file" id="fileInput" className="group_box--fileInput" aria-label={props.label} title={props.label} />
              <input type="text" className="w50 box-input c-form-control" />
            </div>
            <div className="c-form-item--04 w30per">
              <button className="group_box--button ml0">ファイル選択</button>
              <button className="group_box--button group_box--button__red">キャンセル</button>
            </div>
          </div>
          <p className="mt10 txt-note txt-note--01">全てのデータをひとつのフォルダにまとめてzipファイルに圧縮してからアップロードしてください。</p>
        </div>
      </div>
    </div>
  )
}
