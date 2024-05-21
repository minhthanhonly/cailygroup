import React, { useState } from 'react';
import TimePicker from 'react-times';
import 'react-times/css/material/default.css'; // sử dụng chủ đề material
// import 'react-times/css/classic/default.css'; // hoặc bạn có thể sử dụng chủ đề classic

const SomeComponent = () => {
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');

    const onTimeChange = (options) => {
        const { hour, minute } = options;
        setHour(hour);
        setMinute(minute);
    };


    console.log("hour", hour);
    console.log("hour", minute);
    return (
        <div>
            <TimePicker
                timeMode="24" // Đặt chế độ thời gian 24 giờ
                onTimeChange={onTimeChange}
                hour={hour} // Đặt giá trị giờ
                minute={minute} // Đặt giá trị phút
            />
            <div>
                Thời gian đã chọn: {hour}:{minute}
            </div>
        </div>
    );
};

export default SomeComponent;