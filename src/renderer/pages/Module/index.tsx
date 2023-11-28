import { FormLogin, FormUser, FormLeave } from '../../components/Form/Form';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Button } from '../../components/Button/';
import TablePage from '../../components/Table/Table';
import TableCalendar from '../../components/Dashboard/date';
import { Heading, Heading2} from '../../components/Heading';
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
        <Heading text='Danh sách xin nghỉ phép'/>
        <br/><br/>
        <Heading2 text='Nhóm: Web'/>
        <br/><br/>
        <InputQuantity/>
        <br/><br/>
        <Search/><br/><br/><br/>
        <div className='box-group'>
          <p><Heading2 text='Nhóm: Web'/></p>
          <p><InputQuantity/></p>
          <p><Search/></p>
        </div>
        <h2 className="hdg-lv2">Chi tiết thành viên</h2>
        <br/><br/>
        <Heading text='Chi tiết thành viên'/>
        <div className='box-menberdetails'>
            <Heading2 text='Thông tin cá nhân'/>
            <Menberdetails/>
        </div>
        
        {/* <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus velit
          exercitationem hic incidunt ex repellendus, deserunt at asperiores
          reprehenderit atque, vel dolore, similique eveniet quasi culpa.
          Facilis culpa nisi odio?
        </p> */}
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
