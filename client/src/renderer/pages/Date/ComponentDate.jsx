// import React, { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimeClock } from '@mui/x-date-pickers/TimeClock';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';

const SomeComponent = () => {
    // const [initialDate, setInitialDate] = useState(dayjs('2022-04-17'));
    // const [initialTime, setInitialTime] = useState(dayjs().hour(0).minute(0)); // Thiết lập chỉ thời gian
    // const [selectedDate, setSelectedDate] = useState(initialDate);
    // const [selectedTime, setSelectedTime] = useState(initialTime);
    // const [isClockOpen, setIsClockOpen] = useState(false);

    // const handleDateChange = (event) => {
    //     const newValue = dayjs(event.target.value);
    //     const updatedDateTime = selectedTime
    //         .year(newValue.year())
    //         .month(newValue.month())
    //         .date(newValue.date());
    //     setSelectedDate(newValue);
    //     setSelectedTime(updatedDateTime);
    //     console.log('Selected date:', newValue.format('YYYY-MM-DD'));
    // };

    // const handleTimeChange = (newValue) => {
    //     setSelectedTime(newValue);
    //     console.log('Selected time:', newValue.format('HH:mm'));
    // };

    // const handleOpenClock = () => {
    //     setIsClockOpen(true);
    // };

    // const handleCloseClock = () => {
    //     setIsClockOpen(false);
    // };

    // const handleInitialDateChange = (event) => {
    //     setInitialDate(dayjs(event.target.value));
    // };

    // const handleInitialTimeChange = (event) => {
    //     const timeString = event.target.value;
    //     const updatedTime = dayjs().hour(parseInt(timeString.slice(0, 2))).minute(parseInt(timeString.slice(3))); // Thiết lập thời gian từ chuỗi
    //     setInitialTime(updatedTime);
    // };

    // const resetDateTime = () => {
    //     setSelectedDate(initialDate);
    //     setSelectedTime(initialTime);
    // };

    // return (
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //         <div>
    //             <TextField
    //                 label="Giờ ban đầu"
    //                 type="time"
    //                 defaultValue={initialTime.format('HH:mm')}
    //                 onChange={handleInitialTimeChange}
    //             />
    //             <TextField
    //                 label="Chọn ngày"
    //                 type="date"
    //                 value={selectedDate.format('YYYY-MM-DD')}
    //                 onChange={handleDateChange}
    //             />

    //             <DemoItem label="Chọn giờ">
    //                 <TimeClock
    //                     value={selectedTime}
    //                     onChange={handleTimeChange}
    //                     ampm={false}
    //                     onClose={handleCloseClock}
    //                     open={isClockOpen}
    //                 />
    //             </DemoItem>

    //             <p>Ngày đã chọn: {selectedDate.format('YYYY-MM-DD')}</p>
    //             <p>Giờ đã chọn: {selectedTime.format('HH:mm')}</p>
    //             <button onClick={resetDateTime}>Đặt lại ngày và giờ</button>
    //             <button onClick={handleOpenClock}>Mở lại đồng hồ</button>
    //         </div>
    //     </LocalizationProvider>
    // );
};

export default SomeComponent;
