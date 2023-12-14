export const AddGroup = () => {
  return (
    <div className="form-group form-addgroup">
      <label>Nhập Tên Nhóm:</label>
      <img
        src={require('../../../../assets/icn-group.png')}
        alt=""
        className="fluid-image form-addgroup__image"
      />
      <input
        className="form-input"
        type="text"
        placeholder="Tên nhóm muốn thêm"
      />
      <button className="btn">Thêm</button>
    </div>
  );
};
