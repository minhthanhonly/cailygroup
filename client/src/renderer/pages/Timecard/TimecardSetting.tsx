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
import DatePicker from "react-multi-date-picker";
import { format } from 'date-fns';


export const TimecardSetting = () => {
  type FieldHolidays = {
    id: any;
    name: string;
    days: string;
  };
  const [listOfHolidays, setListOfHolidays] = useState<FieldHolidays[] | []>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
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
    ["Ngày 01 Tháng 01","Tết Dương Lịch"],
    ["Ngày 30 Tháng 04","Ngày giải phóng miền Nam, Thống nhất Đất nước"],
  ];

  useEffect(() => {
    axios.get(urlControl + 'TimecardsSettingController.php').then((response) => {
      setListOfHolidays(response.data);
      setIsTableUpdated(false); //đặt lại trạng thái khi dữ liệu thay đổi
    });
  }, [isTableUpdated]); // khi state thay đổi useEffect sẽ chạy lại


  useEffect(() => {
    // Gửi yêu cầu GET đến server để lấy dữ liệu cấu hình
    fetch(urlControl + 'ConfigsController.php')
      .then(response => response.json())
      .then(data => {
        // Cập nhật state với dữ liệu từ server
        setConfigData(data);
      })
      .catch(error => console.error('Error fetching config data:', error));
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được mount

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
  const today = new Date()
  const tomorrow = new Date()
  // tomorrow.setDate(tomorrow.getDate() + 1)

  const [startDay, setStartDay] = useState([today, tomorrow])
  startDay 
  let DataTable: FieldHolidays[] = [];
  for (let i = 0; i < listOfHolidays.length; i++) {
    DataTable.push({
      days: `${listOfHolidays[i].days}`,
      name: `${listOfHolidays[i].name}`,
    });
  }
  const [name, setName] = useState('');
  const [days, SetDays] = useState(new Date());
  const handleStartDateChange = (date: Date | null) => {
    if (date !== null) {
      setStartDay(date);
    }
  };

  const handleSubmint = () => {
    const holiday_data = {
      name: name,
      days: format(startDay, 'dd-MM-yyyy').toString()
    };
    setName('');
    SetDays(new Date());
    fetch(urlControl + 'TimecardsSettingController.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ holiday_data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Data inserted successfully:', responseData);
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới

      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Server error message:', error.response.data);
        }
      });
  };
  return (
    <>
      <NavTimcard role="admin" />
      <Heading3 text="Cấu hình giờ vào - giờ ra" />
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeInput')} defaultHours={configData.openhour}
            defaultMinutes={configData.openminute} />
          <button className="btn btn--widthAuto" onClick={handleSaveTimeInput}>Cập nhật</button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeOut')} defaultHours={configData.closehour}
            defaultMinutes={configData.closeminute} />
          <button className="btn btn--widthAuto" onClick={handleSaveOutTime}>Cập nhật</button>
        </div>
      </div>
      <Heading3 text="Cấu hình ngày lễ" />
      <div className="box-holiday">
        <div className="form-group form-addgroup">
            <label>Tên Ngày Lễ :</label>
            <img
              src={require('../../../../assets/icn-group.png')}
              alt=""
              className="fluid-image form-addgroup__image"
            />
            <input
              className="form-input"
              type="text"
              placeholder="Tên ngày lễ muốn thêm"
            />
          </div>
          <div className="holiday">
              <div className="form-group">
                <label>Ngày Nghỉ Lễ</label>
                <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="form-input"
                  type="text"
                  placeholder="Tên ngày lễ muốn thêm"
                />
              </div>
          </div>
          <div className="holiday-button">
            <button className="btn" onClick={handleSubmint}>Thêm</button>
          </div>
      </div>
      <CTable>
        <CTableHead heads={["Ngày Tháng Năm", "Ngày lễ - Ngày nghỉ", "sửa", "Xóa"]} />
        <CTableBody path_edit={"edit"} data={DataTable.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} permission_edit={true} permission_delete={true} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      {/* <NavTimcard role="admin" />
      <Heading3 text="Cấu hình giờ vào - giờ ra" />
      <div className="card-box">
        <div className="card-box--center">
          <h4>Giờ vào</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeInput')} defaultHours={configData.openhour}
            defaultMinutes={configData.openminute} />
          <button className="btn btn--widthAuto" onClick={handleSaveTimeInput}>Cập nhật</button>
        </div>
        <div className="card-box--center">
          <h4>Giờ ra</h4>
          <CardTime onChange={(h, m) => handleCardTimeChange(h, m, 'timeOut')} defaultHours={configData.closehour}
            defaultMinutes={configData.closeminute} />
          <button className="btn btn--widthAuto" onClick={handleSaveOutTime}>Cập nhật</button>
        </div>
      </div>
      <Heading3 text="Cấu hình ngày lễ" />
      <div className="box-holiday">
        <div className="form-group form-addgroup">
          <label>Tên Ngày Lễ :</label>
          <img
            src={require('../../../../assets/icn-group.png')}
            alt=""
            className="fluid-image form-addgroup__image"
          />
          <input
            className="form-input"
            type="text"
            placeholder="Tên ngày lễ muốn thêm"
          />
        </div>
        <div className="holiday">
          <div className="form-group">
            <label>Ngày Nghỉ Lễ</label>
            <img
              src={require('../../../../assets/icon-time.jpg')}
              alt=""
              className="fluid-image"
            />
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-input"
              type="text"
              placeholder="Tên ngày lễ muốn thêm"
            />
          </div>
          <div className="holiday">
            <div className="form-group">
              <label>Ngày Nghỉ Lễ</label>
              <img
                  src={require('../../../../assets/icon-time.jpg')}
                  alt=""
                  className="fluid-image"
                />
              <DatePicker 
                multiple
                value={days}
                format="MM/DD/YYYY"
                onChange={(date) => handleStartDateChange(date)}
              />
            </div>
          </div>
          <div className="holiday-button">
            <button className="btn" onClick={handleSubmint}>Thêm</button>
          </div>
      </div>
      <CTable>
        <CTableHead heads={["Ngày Tháng Năm", "Ngày lễ - Ngày nghỉ", "sửa", "Xóa"]} />
        <CTableBody path_edit={"edit"} data={DataTable.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)} permission_edit={true} permission_delete={true} />
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
    </>
  )
}