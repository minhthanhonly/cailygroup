import React, { useEffect, useState } from 'react';
import CardTime from '../../components/Card/Card';
import { Heading3 } from '../../components/Heading';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import { Pagination } from '../../components/Pagination';
import axios from "../../api/axios";
import TimecardHolidays from "./TimecardHolidays";
import { symlink } from 'fs';

export const TimecardSetting = () => {


  const [timeInputHours, setTimeInputHours] = useState<number>(0);
  const [timeInputMinutes, setTimeInputMinutes] = useState<number>(0);

  const [timeOutHours, setTimeOutHours] = useState<number>(0);
  const [timeOutMinutes, setTimeOutMinutes] = useState<number>(0);

  const [configData, setConfigData] = useState({
    openhour: 0,
    openminute: 0,
    closehour: 0,
    closeminute: 0,
  });

  const Data = [
    ['Ngày 01 Tháng 01', 'Tết Dương Lịch'],
    ['Ngày 30 Tháng 04', 'Ngày giải phóng miền Nam, Thống nhất Đất nước'],
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('timecards/setting');
        const data = response.data;
        console.log('Data from server:', data);

        if (!Array.isArray(data)) {
          console.error('Dữ liệu không phải là một mảng');
          return;
        }

        // Tìm đối tượng có config_key là 'opentime'
        const opentimeObject = data.find((item: { config_key: string; }) => item.config_key === 'opentime');

        // Tìm đối tượng có config_key là 'closetime'
        const closetimeObject = data.find((item: { config_key: string; }) => item.config_key === 'closetime');

        if (opentimeObject && closetimeObject) {
          // Tách giờ và phút từ chuỗi
          const opentimeParts = opentimeObject.config_value.trim().split(':');
          const closetimeParts = closetimeObject.config_value.trim().split(':');

          // Chắc chắn rằng có đủ phần tử để tránh lỗi
          if (opentimeParts.length === 2 && closetimeParts.length === 2) {
            const openHour = parseInt(opentimeParts[0], 10);
            const openMinute = parseInt(opentimeParts[1], 10);

            const closeHour = parseInt(closetimeParts[0], 10);
            const closeMinute = parseInt(closetimeParts[1], 10);

            // Kiểm tra xem giá trị đã được chuyển đổi đúng cách chưa
            if (!isNaN(openHour) && !isNaN(openMinute) && !isNaN(closeHour) && !isNaN(closeMinute)) {
              // Cập nhật state với giá trị số
              setConfigData((prevState) => ({
                ...prevState,
                openhour: openHour,
                openminute: openMinute,
                closehour: closeHour,
                closeminute: closeMinute,
              }));
            } else {
              console.error('Giá trị giờ và phút không hợp lệ');
            }
          } else {
            console.error('Định dạng giờ không đúng');
          }
        } else {
          console.error('Không tìm thấy đối tượng opentime hoặc closetime trong dữ liệu');
        }
      } catch (error) {
        console.error('Error fetching config data:', error);
      }
    };

    fetchData();
    console.log('chuyển đổi thành công');
  }, []);

  useEffect(() => {
    const fetchTimeValues = async () => {
      try {
        const response = await axios.get('timecards/setting');
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
  const itemsPerPage = 10;
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleCardTimeChange = (
    hours: number,
    minutes: number,
    type: string,
  ) => {
    if (type === 'timeInput') {
      setTimeInputHours(hours);
      setTimeInputMinutes(minutes);
      setConfigData((prevState) => ({
        ...prevState,
        openhour: hours,
        openminute: minutes,
      }));
    } else if (type === 'timeOut') {
      setTimeOutHours(hours);
      setTimeOutMinutes(minutes);
      setConfigData((prevState) => ({
        ...prevState,
        closehour: hours,
        closeminute: minutes,
      }));
    }
  };

  const handleSaveTimeInput = async () => {
    try {
      // Xác nhận giá trị trước khi gửi request
      const formattedHoursInput = String(timeInputHours).padStart(2, '0');
      const formattedMinutesInput = String(timeInputMinutes).padStart(2, '0');
      const timeInputString = `${formattedHoursInput}:${formattedMinutesInput}`
      const dataUpdateArray = [{ id: 1, config_key: 'opentime', hoursMinutes: timeInputString },];
      // Thêm các đối tượng khác nếu cần

      console.log("dataUpdateArray", dataUpdateArray);


      const response = await axios.post('timecards/getInput', dataUpdateArray);

      console.log("response.data", response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      // Xử lý lỗi nếu cần
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Response status:', (error as any).response.status);
        console.error('Server error message:', (error as any).response.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleSaveOutTime = async () => {

    try {

      const formattedHoursOutput = String(timeOutHours).padStart(2, '0');
      const formattedMinutesOutput = String(timeOutMinutes).padStart(2, '0');
      // Xác nhận giá trị trước khi gửi request
      const timeOutString = `${formattedHoursOutput}:${formattedMinutesOutput}`
      const dataUpdateArray = [{ id: 2, config_key: 'closetime', hoursMinutes: timeOutString },];
      // Thêm các đối tượng khác nếu cần

      console.log("closetime", dataUpdateArray);


      const response = await axios.post('timecards/getInput', dataUpdateArray);

      console.log("response.data", response.data);
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      // Xử lý lỗi nếu cần
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Response status:', (error as any).response.status);
        console.error('Server error message:', (error as any).response.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }



    // try {
    //   const dataUpdateArrayOut = [
    //     { id: 2, hours: timeOutHours, minutes: timeOutMinutes },
    //   ];

    //   axios
    //     .put(
    //       urlControl + 'ConfigsController.php',
    //       { data: dataUpdateArrayOut, method: 'UPDATE_OUTTIME' },
    //       { headers: { 'Content-Type': 'application/json' } },
    //     )
    //     .then((response) => {
    //       console.log(response.data);
    //       // console.log("cập nhật thành công");

    //       // Xử lý thành công nếu cần
    //     })
    //     .catch((error) => {
    //       console.error('Error inserting data:', error);
    //       // Xử lý lỗi nếu cần
    //       if (error.response) {
    //         console.error('Response status:', error.response.status);
    //         console.error('Server error message:', error.response.data);
    //       }
    //     });
    // } catch (error) {
    //   console.error('Lỗi khi cập nhật trạng thái:', error);
    // }
  };

  return (
    <>
      <NavTimcard role="admin" />
      <Heading3 text="Cấu hình giờ vào - giờ ra" />
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime
            onChange={(h, m) => handleCardTimeChange(h, m, 'timeInput')}
            defaultHours={configData.openhour}
            defaultMinutes={configData.openminute}
          />
          <button className="btn btn--widthAuto" onClick={handleSaveTimeInput}>
            Cập nhật
          </button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime
            onChange={(h, m) => handleCardTimeChange(h, m, 'timeOut')}
            defaultHours={configData.closehour}
            defaultMinutes={configData.closeminute}
          />
          <button className="btn btn--widthAuto" onClick={handleSaveOutTime}>
            Cập nhật
          </button>
        </div>
      </div>
      <TimecardHolidays />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
