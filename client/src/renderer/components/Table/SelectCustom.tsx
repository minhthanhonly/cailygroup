import './SelectMonthYears.scss'

const SelectCustom = () => {
    return (
        <>

            <div className='select__box group'>
                <div className='select__box--title'><p>nhóm</p></div>
                <div className='select__box--flex grid-row'>
                    <select>
                        <option value='thietbia'>Thiết bị A</option>
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

export default SelectCustom;