// FieldSelectionPage.js
import React, { useState } from 'react';
import Form from './From';

const FieldSelectionPage = () => {
  // const history = useHistory();
  const [selectedFields, setSelectedFields] = useState<string[]>([]); // Thêm kiểu dữ liệu là một mảng các chuỗi

  const handleFormSubmit = (selectedFields: string[]) => {
    // history.push(`/form?fields=${selectedFields.join(',')}`);
  };

  return (
    <div>
      <h1>Select Fields</h1>
      <Form selectedFields={selectedFields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default FieldSelectionPage;
