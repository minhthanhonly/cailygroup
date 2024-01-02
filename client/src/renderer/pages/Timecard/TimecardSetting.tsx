import React, { useEffect, useState } from 'react';
import CardTime from "../../components/Card/Card";
import { AddGroup } from "../../components/Form/Form";
import { Heading3 } from "../../components/Heading";
import { CTable } from "../../components/Table/CTable";
import CTableBody from "../../components/Table/CTableBody";
import { CTableHead } from "../../components/Table/CTableHead";
import NavTimcard from "../../layouts/components/Nav/NavTimcard";
import { Pagination } from "../../components/Pagination";
import axios from "axios";
import { urlControl } from "../../routes/server";

export const TimecardSetting = () => {
  const [timeInputHours, setTimeInputHours] = useState<number>(0);
  const [timeInputMinutes, setTimeInputMinutes] = useState<number>(0);

  const [timeOutHours, setTimeOutHours] = useState<number>(0);
  const [timeOutMinutes, setTimeOutMinutes] = useState<number>(0);

  const Data = [
    ["Ngày 01 Tháng 01", "2", "Tết Dương Lịch"],
    ["Ngày 30 Tháng 04", "4", "Ngày giải phóng miền Nam, Thống nhất Đất nước"],
  ];


  useEffect(() => {
    const fetchTimeValues = async () => {
      try {
        const response = await axios.get(urlControl + 'ConfigsController.php');
        const timeValues = response.data;

        // Giả sử cấu trúc của response là { openhour: '12', openminute: '30', closehour: '18', closeminute: '45' }
        setTimeInputHours(parseInt(timeValues.openhour, 10) || 0);
        setTimeInputMinutes(parseInt(timeValues.openminute, 10) || 0);
        setTimeOutHours(parseInt(timeValues.closehour, 10) || 0);
        setTimeOutMinutes(parseInt(timeValues.closeminute, 10) || 0);
      } catch (error) {
        console.error('Lỗi khi lấy giá trị thời gian:', error);
      }
    };

    fetchTimeValues();
  }, []); // Mảng phụ thuộc trống đảm bảo hiệu ứng chỉ chạy một lần khi component được mount


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleCardTimeChange = (hours: number, minutes: number, type: string) => {
    if (type === 'timeInput') {
      setTimeInputHours(hours);
      setTimeInputMinutes(minutes);
    } else if (type === 'timeOut') {
      setTimeOutHours(hours);
      setTimeOutMinutes(minutes);
    }
  };

  const handleSaveTimeInput = async () => {
    try {
      const dataUpdateArray = [
        { id: 1, hours: timeInputHours },
        { id: 2, minutes: timeInputMinutes }
      ];

      console.log("dataUpdateArray", dataUpdateArray);


      const promises = dataUpdateArray.map(async (dataUpdate) => {
        const response = await axios.put(
          urlControl + 'ConfigsController.php',
          { ...dataUpdate, method: 'UPDATE_LOGIN' },
          { headers: { 'Content-Type': 'application/json' } }
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  const handleSaveOutTime = async () => {
    try {
      const dataUpdateArrayOut = [
        { id: 3, hours: timeOutHours },
        { id: 4, minutes: timeOutMinutes }
      ];

      console.log("dataUpdateArrayOut", dataUpdateArrayOut);

      const promises = dataUpdateArrayOut.map(async (dataUpdateOut) => {
        const response = await axios.put(
          urlControl + 'ConfigsController.php',
          { ...dataUpdateOut, method: 'UPDATE_OUTTIME' },
          { headers: { 'Content-Type': 'application/json' } }
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
    }
  };

  return (
    <>
      <NavTimcard role="admin" />
      <Heading3 text="Cấu hình giờ vào - giờ ra" />
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeInput')} />
          <button className="btn btn--widthAuto" onClick={handleSaveTimeInput}>Cập nhật</button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeOut')} />
          <button className="btn btn--widthAuto" onClick={handleSaveOutTime}>Cập nhật</button>
        </div>
      </div>
      <Heading3 text="Cấu hình ngày lễ" />
      <AddGroup />
      <CTable>
        <CTableHead heads={["Ngày Tháng", "Thứ", "Ngày lễ - Ngày nghỉ", "Hành Động"]} />
        <CTableBody path_edit={"edit"} data={Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} permission_delete={true} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};