import { useState } from 'react';
import Modal from '../../components/Modal/Modal';

const Field = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fields, setFields] = useState('');
  const [required, setRequired] = useState(false);
  const [fieldType, setFieldType] = useState('');

  const [inputValues, setInputValues] = useState({
    formName: '',
    fieldLable: '',
    fieldName: '',
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleCheckboxChange = () => {
    setRequired(!required);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const hadleSubmit = () => {
    console.log(inputValues);
    const form = '';
  };
  return (
    <div className="field">
      <h2 className="hdg-lv2">
        <span>Add new form:</span>
        <input
          placeholder="form title"
          type="text"
          className="form-input"
          onChange={handleInputChange}
          value={inputValues.formName}
          name="formName"
        />
      </h2>
      <button
        className="btn"
        onClick={(event) => {
          openModal();
        }}
      >
        Add field +
      </button>
      <div className="">
        <h2 className="hdg-lv2 mt50">Preview:</h2>
        <p>下記の通り申請致します。</p>
      </div>
      <div className="wrp-button">
        <button className="btn btn--from btn--gray">下書き保存</button>
        <button className="btn btn--from btn--blue">申請する</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-field">
          <h2 className="hdg-lv2 center">Add new field</h2>
          <label className="right text-required">
            required{' '}
            <input
              type="checkbox"
              checked={required}
              onChange={handleCheckboxChange}
            />
          </label>
          <table>
            <tbody>
              <tr>
                <th>
                  <p>Field Label</p>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    value={inputValues.fieldLable}
                    name="fieldLable"
                    onChange={handleInputChange}
                  />
                  <p className="text-small">
                    * This is the name which will appear on the EDIT page
                  </p>
                </td>
              </tr>
              <tr>
                <th>
                  <p>
                    Field Type <span className="text-error">(* required)</span>
                  </p>
                </th>
                <td>
                  <select className="form-input">
                    <option value="text">text</option>
                    <option value="text-area">text area</option>
                    <option value="hour">hour</option>
                    <option value="range-hour">range hour</option>
                    <option value="date">date</option>
                    <option value="range-date">range date</option>
                    <option value="range-date-number">
                      range date and number of days
                    </option>
                    <option value="checkbox">checkbox</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>
                  <p>
                    Field Name <span className="text-error">(* required)</span>
                  </p>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-input"
                    onChange={handleInputChange}
                    value={inputValues.fieldName}
                    name="fieldName"
                  />
                  <p className="text-small">
                    * Single word, no spaces. Underscores and dashes allowed
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="wrp-button">
            <button className="btn" onClick={hadleSubmit}>
              Xác nhận
            </button>
            <button className="btn btn--orange" onClick={closeModal}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Field;
