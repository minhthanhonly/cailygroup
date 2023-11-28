import { FormLogin, FormUser, FormLeave } from '../../components/Form/Form';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Button } from '../../components/Button/';
import TablePage from '../../components/Table/Table';
import TableCalendar from '../../components/Dashboard/date';
import { Heading2, Heading3, Heading3Center} from '../../components/Heading';
import { Search} from '../../components/Search';
import { Pagination } from '../../components/Pagination';
import { InputQuantity } from '../../components/InputQuantity';
import { Menberdetails } from '../../components/Menberdetails';



export const Module = () => {
  // props table colum
  // let ArrayTable = [ { index: 1, Textcolum: 'Ngày Tháng'},{index: 2, Textcolum: 'Thứ'}, { index: 3, Textcolum: 'tháng'},{ index: 4,  Textcolum: 'hi'}, { index: 5,  Textcolum: 'cột 5'},{ index: 6, Textcolum: 'cột 6'}];

  return (
    <div>
      <div className="wrp-container">
        <h2 className="hdg-lv2">HEADING H2</h2><br/>
        <Heading2 text='Danh sách xin nghỉ phép'/>
        <br/><br/>
        <h2 className="hdg-lv2">HEADING H3</h2><br/><br/>
        <Heading3 text='Nhóm: Web'/>
        <h2 className="hdg-lv2">HEADING H3 center</h2><br/><br/>
        <Heading3Center text='Thông tin cá nhân'/><br/>
        <br/>
        <br/><br/>
        <InputQuantity/>
        <br/><br/>
        <Search/><br/><br/><br/>
        <div className='box-group'>
          <p><Heading3 text='Nhóm: Web'/></p>
          <p><InputQuantity/></p>
          <p><Search/></p>
        </div>
        <h2 className="hdg-lv2">Chi tiết thành viên</h2>
        <br/><br/>
        <Heading2 text='Chi tiết thành viên'/>
        <div className='box-menberdetails'>
            <Heading3Center text='Thông tin cá nhân'/>
            <Menberdetails/>
        </div>

        {/* PHÂN TRANG */}
        <h2 className="hdg-lv2">PHÂN TRANG</h2>
        <br/>
        <Pagination/>
        {/* BUTTON */}
        <h2 className="hdg-lv2">BUTTON</h2>
        {/* <Button text="Đăng ký nghỉ phép" />
        <br />
        <br />
        <Button text="Đăng xuất" btnColor="orange" />
        <br />
        <br />
        <Button text="Kết thúc" btnSize="medium" btnColor="orange" />
        <br />
        <br />
        <Button text="Yes" btnSize="small" btnColor="green" />
        <br />
        <br />
        <Button text="No" btnSize="small" btnColor="red" /> */}

        {/* Màu Nền */}
        <h2 className="hdg-lv2">Màu Nền</h2><br/>
        <div className='box-bg'>
            <p className='bg bg-yellow'>Đang chờ xác nhận nghỉ phép</p><br/><br/>
            <p className='bg bg-green'>Xác nhận nghỉ phép</p>
            <br/><br/>
            <p className='bg bg-purple'>Nghỉ lễ</p>
            <br/><br/>
            <p className='bg bg-red'><span className='bg-text'>Không xác nhận nghỉ phép</span><span className='bg-red__btn'><button className='btn btn-white'>Hủy bỏ nghỉ phép</button></span></p>
        </div>
        
        {/* TABLE */}
        <h2 className="hdg-lv2">TABLE</h2>
        <TablePage />

        {/* IMAGE */}
        <h2 className="hdg-lv2">IMAGE</h2>
        <img
          src={require('../../assets/images/icon-home.png')}
          alt="phantu.dev"
          className="fluid-image"
        />
        <img
          src={require('../../assets/images/icon-home-active.png')}
          alt="phantu.dev"
          className="fluid-image"
        />

        {/* Dashboard */}
        <h2 className="hdg-lv2">Dashboard</h2>
        <Dashboard />
        <TableCalendar />

        {/* Form User*/}
        <h2 className="hdg-lv2">Form User</h2>
        <FormUser />
        {/* login from */}
        <h2 className="hdg-lv2">login form</h2>
        <FormLogin />
        {/* leave from */}
        <h2 className="hdg-lv2">leave form</h2>
        <FormLeave />
      </div>
    </div>
  );
};
