import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import dayjs from 'dayjs';

const SomeComponent = () => {
    const initialTime = dayjs('2022-04-17T15:30');
    const [selectedTime, setSelectedTime] = useState(initialTime);
    const [isClockOpen, setIsClockOpen] = useState(false);

    const handleTimeChange = (newValue) => {
        setSelectedTime(newValue);
        console.log('Selected time:', newValue.format('HH:mm'));
    };

    const handleOpenClock = () => {
        setSelectedTime(initialTime);
        setIsClockOpen(true);
    };

    const handleCloseClock = () => {
        setIsClockOpen(false);
    };

    const resetTime = () => {
        // Reset both hour and minute to the initial time's values
        setSelectedTime(selectedTime.hour(initialTime.hour()).minute(initialTime.minute()));
    };

<<<<<<< HEAD
    // console.log("hour", hour);
    // console.log("hour", minute);
    // return (
    //     <div>
    //         <TimePicker
    //             timeMode="24" // Đặt chế độ thời gian 24 giờ
    //             onTimeChange={onTimeChange}
    //             hour={hour} // Đặt giá trị giờ
    //             minute={minute} // Đặt giá trị phút
    //         />
    //         <div>
    //             Thời gian đã chọn: {hour}:{minute}
    //         </div>
    //     </div>
    // );
=======
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <>
                    <DemoItem label="AM PM disabled">
                        <TimeClock
                            value={selectedTime}
                            onChange={handleTimeChange}
                            ampm={false}
                            onClose={handleCloseClock}
                            open={isClockOpen}
                        />
                    </DemoItem>

                    <p>Thời gian đã chọn: {selectedTime.format('HH:mm')}</p>
                    <button onClick={resetTime}>Chọn lại thời gian</button>
                </>
            </div>
        </LocalizationProvider>
    );
>>>>>>> 0f86a390f7d89202563690008f68f1c168308119
};

export default SomeComponent;
