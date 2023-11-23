 import React, { useState, useEffect } from 'react';


 





 const MonthYearSelector = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Danh sách tháng và năm
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  useEffect(() => {
    // Lấy tháng và năm hiện tại
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Cập nhật giá trị ban đầu
    setSelectedMonth(currentMonth.toString());
    setSelectedYear(currentYear.toString());
  }, []); // Chỉ chạy một lần khi component được render

  const handleMonthChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <label>Tháng:</label>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Chọn tháng</option>
        {months.map((month) => (
          <option key={month} value={month}>{`Tháng ${month}`}</option>
        ))}
      </select>

      <label>Năm:</label>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Chọn năm</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Hiển thị giá trị được chọn */}
      <p>Tháng đã chọn: {selectedMonth}</p>
      <p>Năm đã chọn: {selectedYear}</p>
    </div>
  );
};

export default MonthYearSelector;



