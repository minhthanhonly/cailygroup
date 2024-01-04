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
import { format, isValid } from 'date-fns';
import Modaldelete from '../../components/Modal/Modaldelete';


interface HolidayProps {
  id: string;
  name: string;
  update: React.ReactNode;
  delete: React.ReactNode;
}
export const TimecardSetting = () => {
  type FieldHolidays = {
    id: any;
    name: string;
    days: string;
    update: React.ReactNode;
    delete: React.ReactNode;
  };
  const [listOfHolidays, setListOfHolidays] = useState<FieldHolidays[] | []>([]);
  const [isTableUpdated, setIsTableUpdated] = useState(false);
  const [timeInputHours, setTimeInputHours] = useState<number>(0);
  const [timeInputMinutes, setTimeInputMinutes] = useState<number>(0);

  const [timeOutHours, setTimeOutHours] = useState<number>(0);
  const [timeOutMinutes, setTimeOutMinutes] = useState<number>(0);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteModalid, setDeleteModalId] = useState('');
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
  const itemsPerPage = 10;
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
  // update
  let dynamicUpdate = (id, groupName) => (
      <button onClick={() => openModal(groupName, id)}>
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/icnedit.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      </button>
  );
  // delete
  const handleDelete = async (holidayId, event) => {
    if (event) {
      event.preventDefault();
      try {
        const payload = { id: holidayId };
        let response = await axios.delete(urlControl + 'TimecardsSettingController.php', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: payload,
        });
        console.log('DELETE Response:', response.data);
        closeModaldelete();
        setIsTableUpdated(true); //Khi thêm nhóm mới ,cập nhật state mới
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    }
  };
  let dynamicDelete = (id) => (
    <>
      <button onClick={(event) => { openModaldelete(id, event); }}>
        <p className="icon icon--check">
          <img
            src={require('../../../../assets/icndelete.png')}
            alt="edit"
            className="fluid-image"
          />
        </p>
      </button>
      <Modaldelete isOpen={isDeleteModalOpen} onRequestClose={closeModaldelete}>
        <h2>Bạn có chắc chắn muốn xóa không?</h2>
        <div className='wrp-button'>
          <button className='btn btn--green' onClick={(event) => handleDelete(isDeleteModalid, event)}>Đồng ý</button>
          <button className='btn btn--orange' onClick={closeModaldelete}>Hủy</button>
        </div>
      </Modaldelete>
    </>
  );
  const openModaldelete = (initialId: string) => {
    setDeleteModalId(initialId);
    setDeleteModalOpen(true);
  };
  const closeModaldelete = () => {
    setDeleteModalOpen(false);
  };

  let DataTable: FieldHolidays[] = [];
  for (let i = 0; i < listOfHolidays.length; i++) {
    DataTable.push({
      days: `${listOfHolidays[i].days}`,
      name: `${listOfHolidays[i].name}`,
      update: dynamicUpdate({
        id: listOfHolidays[i].id,
        groupName: listOfHolidays[i].group_name,
      }),
      delete: dynamicDelete(listOfHolidays[i].id),
    });
  }
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [name, setName] = useState('');

  const [days, setDays] = useState();
  const handleDatePickerChange = (date) => {
    if (date !== null) {
      setDays(date);
      console.log("Ngày đã chọn (dạng chuỗi JSON):", JSON.stringify(date));
      const dateObjects = date.map(dateString => new Date(dateString));

    setDays(dateObjects);

    // Log toàn bộ mảng với thông tin ngày tháng năm
    // console.log("Ngày đã chọn:");
    // for (let i = 0; i < dateObjects.length; i++) {
    //   const day = dateObjects[i];
    //   const year = day.getFullYear();
    //   const month = day.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
    //   const dayOfMonth = day.getDate();

    //   console.log(`Ngày ${i + 1}: ${dayOfMonth}/${month}/${year}`);
    // }
    }
  };
  const handleSubmint = () => {

   // const validDays = days.filter(date => isValid(date)); // Lọc bỏ các đối tượng ngày không hợp lệ
    //const formattedDays = validDays.map(date => format(date, 'yyyy-MM-dd'));

    const holiday_data = {
      name: name,
      days: days,
    };
    console.log(holiday_data);
    // setName('');

    // fetch(urlControl + 'TimecardsSettingController.php', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'cors',
    //   body: JSON.stringify({ holiday_data }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     console.log('Data inserted successfully:', responseData);
    //     setIsTableUpdated(true);
    //   })
    //   .catch((error) => {
    //     console.error('Error inserting data:', error);
    //     if (error.response) {
    //       console.error('Response status:', error.response.status);
    //       console.error('Server error message:', error.response.data);
    //     }
    //   });
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
                  onChange={(date) => handleDatePickerChange(date)}
                />
              </div>
          </div>
          <div className="holiday-button">
            <button className="btn" onClick={handleSubmint}>Thêm</button>
          </div>
      </div>
      <CTable>
        <CTableHead heads={["Ngày Tháng Năm", "Ngày lễ - Ngày nghỉ", "sửa", "Xóa"]} />
        <CTableBody path_edit={"edit"} data={DataTable.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}/>
      </CTable>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
}