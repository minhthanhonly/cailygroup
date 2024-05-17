import { useRef, useState } from "react";

export default function ComponentInputFile(props) {
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleBtnFile = () => {
    // Kích hoạt sự kiện click trên input file
    event.preventDefault();
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]; // Lấy tệp đầu tiên từ danh sách các tệp được chọn
      setSelectedFileName(file.name); // Cập nhật tên tệp vào state
    }
  };

  const handleClearBtnFile = () => {
    event.preventDefault();
    setSelectedFileName(''); // Xóa tên tệp
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Xóa giá trị của input file
    }
  };


  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>{props.required === true ? (<span className="c-form-label--required txt-red">（必須）</span>) : null}
        </label>

        <div className="c-form-content">
          <div className="grid-row grid-row--02">
            <div className="c-form-item--04 w60per">
              <input type="file" id="fileInput" className="tb-from--fileInput" aria-label={props.label} title={props.label} name={props.id} onChange={handleFileChange} ref={fileInputRef} />
              <input type="text" id="fileInputText" className="tb-from--input" value={selectedFileName} name={props.id} placeholder="ファイルを選択してください" disabled />
            </div>
            <div className="c-form-item--04 w30per">
              <button className="group_box--button ml0" onClick={handleBtnFile}>  ファイル選択 </button>
              <button className="group_box--button group_box--button__red" onClick={handleClearBtnFile}>キャンセル</button>
            </div>
          </div>
          <p className="mt10 txt-note txt-note--01">  全てのデータをひとつのフォルダにまとめてzipファイルに圧縮してからアップロードしてください。  </p>
        </div>
      </div>
    </div>
  );
}