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

  const handleFileChange = (e) => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]; // Lấy tệp đầu tiên từ danh sách các tệp được chọn
      setSelectedFileName(file.name); // Cập nhật tên tệp vào state
      props.parentFileCallback(e.target.files[0]);
    }
  };

  const handleClearBtnFile = () => {
    event.preventDefault();
    setSelectedFileName(''); // Xóa tên tệp
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Xóa giá trị của input file
      props.parentClearFileCallback('');
    }
  };

  const japaneseCharactersRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/; // Biểu thức chính quy cho ký tự tiếng Nhật
  // const specialCharactersRegex = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/; // Biểu thức chính quy cho ký tự đặc biệt
  const spaceRegex = /\s/; // Biểu thức chính quy cho khoảng trắng

  if (japaneseCharactersRegex.test(selectedFileName)) {
    alert("ファイル名に日本語を含めることはできません。");
    setSelectedFileName('') // Xóa giá trị nhập nếu không hợp lệ
  }

  if (spaceRegex.test(selectedFileName)) {
    alert("ファイル名にはスペース、アクセント、特殊文字を含めることはできません。");
    setSelectedFileName('') // Xóa giá trị nhập nếu không hợp lệ
  }

  return (
    <div className="c-form">
      <div className="c-form-inner">
        <label className="c-form-label">
          <span>{props.label}</span>{props.required === true ? (<span className="c-form-label--required txt-red">（必須）</span>) : null}
        </label>
        <div className="c-form-content">
          <div className="grid-row grid-row--02">
            <div className="c-form-item--04 w60per">
              <input type="file" id="fileInput" className="tb-from--fileInput" name={props.id} aria-label={props.label} title={props.label} onChange={handleFileChange} ref={fileInputRef} />
              <input type="text" name="info-file" id="fileInputText" className="tb-from--input" value={selectedFileName} placeholder="ファイルを選択してください" disabled />
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
