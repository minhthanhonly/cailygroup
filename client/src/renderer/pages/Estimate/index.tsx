import { NavLink } from 'react-router-dom';
export const Estimate = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/TravelExpenses">交通費清算書</NavLink></li>
                    <li><NavLink to="/ExpenseReport">経費清算書</NavLink></li>
                    {/* <li><NavLink to="/about">Giới thiệu</NavLink></li>
                    <li><NavLink to="/contact">Liên hệ</NavLink></li> */}
                </ul>
            </nav>

        </>
    )
}