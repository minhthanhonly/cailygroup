import './SelectMonthYears.scss'

export const SelectCustom = () => {
    return (
        <>

            <div className='select__box group '>
                <div className='select__box--title'><p>Nhóm:</p></div>
                <div className='select__box--flex grid-row select-dropdown'>
                    <select>
                        <option value='thietbia'>Năng Lượng</option>
                        <option value='thietbic'>Thiết bị C</option>
                        <option value='kientruc'>Kiến Trúc</option>
                        <option value='web'>Website</option>
                        <option value='layout'>Layout</option>
                    </select>
                </div>
            </div>
        </>

    )
}

export const SelectCustomName = () => {
    return (
        <>

            <div className='select__box group'>
                <div className='select__box--flex grid-row'>
                    <select>
                        <option value='1'>Phan Hồ Tú</option>
                        <option value='2'>Phan Hồ Tú</option>
                        <option value='3'>Phan Hồ Tú</option>
                        <option value='4'>Phan Hồ Tú</option>
                        <option value=''>Phan Hồ Tú</option>
                    </select>
                </div>
            </div>
        </>

    )
}


