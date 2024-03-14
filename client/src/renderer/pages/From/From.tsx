// Form.js
import React from 'react';

interface FormProps {
    selectedFields: string[]; // Chỉ định kiểu dữ liệu là một mảng các chuỗi
    onSubmit: (selectedFields: string[]) => void; // Chỉ định kiểu dữ liệu cho hàm onSubmit
  }
  
  const Form: React.FC<FormProps> = ({ selectedFields, onSubmit }) => {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onSubmit(selectedFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="checkbox" name="name" />
        Name
      </label>
      <label>
        <input type="checkbox" name="company" />
        Company
      </label>
      <label>
        <input type="checkbox" name="age" />
        Age
      </label>
      <label>
        <input type="checkbox" name="male" />
        Male
      </label>
      <label>
        <input type="checkbox" name="school" />
        School
      </label>
      {/* Thêm các trường khác nếu cần */}
      <button type="submit">Generate Form</button>
    </form>
  );
};

export default Form;
