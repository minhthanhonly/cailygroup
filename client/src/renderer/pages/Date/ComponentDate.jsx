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
};

export default SomeComponent;
