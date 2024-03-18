import {
  ReactElement,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal from '../../components/Modal/Modal';
import React from 'react';
import './field.scss';

const Field = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fields, setFields] = useState('');
  const [required, setRequired] = useState(true);
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
  const handleFieldType = (event: any) => {
    setFieldType(event.target.value);
  };

  const [items, setItems] = useState([
    <div className="item-group" key={0}>
      <div className="item-title">
        <p className="text-error">name group</p>
        <input className="form-input" placeholder="title group checkbox" />
        <button className="btn btn--red" onClick={() => handleRemoveGroup(0)}>
          X
        </button>
      </div>
      <div className="item">
        <input type="checkbox" />
        <input type="text" placeholder="name checkbox" />
      </div>
      <div className="wrp-button">
        <button
          className="btn btn--small btn--blue"
          onClick={() => handleAddCheckbox(0)}
        >
          Add
        </button>
        <button
          className="btn btn--small btn--black"
          onClick={() => handleMinusCheckbox(0)}
        >
          Minus
        </button>
      </div>
    </div>,
  ]);

  const inputRefs = useRef<
    (HTMLInputElement | null | RefObject<HTMLInputElement>)[]
  >([]);

  useEffect(() => {
    inputRefs.current = Array(items.length)
      .fill(0)
      .map((_, i) => inputRefs.current[i] || createRef<HTMLInputElement>());
  }, [items]);

  const handleRemoveGroup = (index: number) => {
    setItems((prevItems) => {
      if (prevItems.length <= 1) return prevItems; // Đảm bảo rằng luôn có ít nhất một item-group
      const updatedItems = prevItems.filter((_, i) => i !== index); // Loại bỏ item-group tại chỉ số index
      return updatedItems;
    });
  };

  const handleAddCheckbox = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const newItem = (
        <div className="item">
          <input type="checkbox" />
          <input
            type="text"
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            placeholder="name checkbox"
          />
        </div>
      );
      const itemGroup = updatedItems[index];
      const children = React.Children.toArray(itemGroup.props.children);
      children.splice(1, 0, newItem);
      const newGroup = React.cloneElement(itemGroup, {}, ...children);
      updatedItems[index] = newGroup;
      return updatedItems;
    });
  };

  const handleMinusCheckbox = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemGroup = updatedItems[index];
      const children = React.Children.toArray(itemGroup.props.children);
      const itemsCount = children.filter(
        (child) =>
          React.isValidElement(child) && child.props.className === 'item',
      ).length;
      if (itemsCount <= 1) return prevItems; // Nếu số lượng items <= 1, không làm gì cả
      const lastIndex = children.findIndex(
        (child) =>
          React.isValidElement(child) && child.props.className === 'item',
      );
      if (lastIndex !== -1) {
        children.splice(lastIndex, 1); // Loại bỏ phần tử cuối cùng có class "item"
        const newGroup = React.cloneElement(itemGroup, {}, ...children);
        updatedItems[index] = newGroup;
      }
      return updatedItems;
    });
  };

  const handleAddGroupCheckbox = () => {
    setItems((prevItems) => [
      ...prevItems,
      <div className="item-group" key={prevItems.length}>
        <div className="item-title">
          <p className="text-error">name group</p>
          <input className="form-input" placeholder="title group checkbox" />
          <button
            className="btn btn--red"
            onClick={() => handleRemoveGroup(prevItems.length)}
          >
            X
          </button>
        </div>
        <div className="item">
          <input type="checkbox" />
          <input type="text" placeholder="name checkbox" />
        </div>
        <div className="wrp-button">
          <button
            className="btn btn--small btn--blue"
            onClick={() => handleAddCheckbox(prevItems.length)}
          >
            Add
          </button>
          <button
            className="btn btn--small btn--black"
            onClick={() => handleMinusCheckbox(prevItems.length)}
          >
            Minus
          </button>
        </div>
      </div>,
    ]);
  };
  const handleSubmit = () => {
    const checkboxValues = inputRefs.current.map((ref) => {
      if (ref instanceof HTMLInputElement) {
        return ref.value || '';
      } else if (ref.current?.value) {
        return ref.current.value || '';
      }
      return '';
    });
    console.log(checkboxValues);
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
          <table className="field-table">
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
                  <select className="form-input" onChange={handleFieldType}>
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
                  {fieldType == 'checkbox' ? (
                    <>
                      {items.map((item, index) => (
                        <div key={index}>{item}</div> // Render mỗi phần tử trong mảng items
                      ))}
                      <button
                        className="btn item-btn btn--green"
                        onClick={handleAddGroupCheckbox}
                      >
                        Multiple group checkbox
                      </button>
                    </>
                  ) : (
                    ''
                  )}
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
            <button className="btn" onClick={handleSubmit}>
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
