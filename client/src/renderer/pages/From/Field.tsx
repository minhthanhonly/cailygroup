import { useState } from 'react';
import Modal from '../../components/Modal/Modal';

const Field = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fields, setFields] = useState('');
  const [fieldLable, setFieldLable] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');

  const handleInputChange = (event: any) => {
    setFieldLable(event.target.value);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="field">
      <h2 className="hdg-lv2">
        <span>Add new form:</span>
        <input type="text" className="form-input" />
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
            required <input type="checkbox" />
          </label>
          <table>
            <tr>
              <th>
                <p>Field Label</p>
              </th>
              <td>
                <input
                  type="text"
                  className="form-input"
                  value={fieldLable}
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
                <input type="text" className="form-input" />
                <p className="text-small">
                  * Single word, no spaces. Underscores and dashes allowed
                </p>
              </td>
            </tr>
          </table>
          <div className="wrp-button">
            <button className="btn">Xác nhận</button>
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
