import {
  FormLogin,
  FormUser,
  FormLeave,
  AddGroup,
  AddEditMember,
} from '../../components/Form/Form';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Button } from '../../components/Button/';
import TablePage from '../../components/Table/Table';
import TableCalendar from '../../components/Dashboard/date';
import { Heading2, Heading3 } from '../../components/Heading';
import { Search } from '../../components/Search';
import { Pagination } from '../../components/Pagination';
import { InputQuantity } from '../../components/InputQuantity';
import { Menberdetails } from '../../components/Menberdetails';
import CardTime from '../../components/Card/Card';
import {
  SelectCustom,
  SelectCustomName,
} from '../../components/Table/SelectCustom';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { ButtonCenter } from '../../components/Button/ButtonCenter';
import NavTimcard from '../../layouts/components/Nav/NavTimcard';
import ButtonEdit from '../../components/Button/ButtonEdit';

export const Module = () => {
  return (
    <div>
      <div className="wrp-container">
        <h2 className="hdg-lv2">HEADING H2</h2>
        <br />
        <Heading2 text="Danh sách xin nghỉ phép" />
        <br />
        <br />
        <h2 className="hdg-lv2">HEADING H3</h2>
        <Heading3 text="Thông tin cá nhân" />
        <br />
        <br />
        <h2 className="hdg-lv2">ListBranch</h2>
        <NavTimcard role="admin" />
        <br />
        <br />
        <h2 className="hdg-lv2">SELECT</h2>
        <br />
        <div className="left">
          <SelectCustom />
        </div>
        <br />
        <div className="center">
          <SelectCustom />
        </div>
        <br />
        <br />
        <h2 className="hdg-lv2">HEADING H3</h2>
        <Heading3 text="Thông tin cá nhân" />
        <br />
        <p className="txt-title">Nhóm: Web</p>
        <br />
        <br />
        <br />
        <br />
        <InputQuantity />
        <br />
        <br />
        <Search />
        <br />
        <br />
        <br />
        <div className="box-group box-group--second">
          <div className="box-group__item">
            <p className="txt-title">Nhóm: Web</p>
          </div>
          <div className="box-group__item left">
            <SelectCustom />
          </div>
          <div className="box-group__item">
            <SelectCustomName />
          </div>
        </div>
        <br />
        <br />
        <div className="box-group">
          <div className="box-group__item">
            <p className="txt-title">Nhóm: Web</p>
          </div>
          <div className="box-group__item">
            <InputQuantity />
          </div>
          <div className="box-group__item">
            <Search />
          </div>
        </div>
        <h2 className="hdg-lv2">Chi tiết thành viên</h2>
        <br />
        <br />
        <Heading2 text="Chi tiết thành viên" />
        <div className="box-menberdetails">
          <Heading3 text="Thông tin cá nhân" />
          <Menberdetails />
        </div>
        <h2 className="hdg-lv2">PHÂN TRANG</h2>
        <br />
        {/* <Pagination /> */}

        {/* BUTTON */}
        <h2 className="hdg-lv2">BUTTON</h2>
        <Button color="orange">Đăng xuất</Button>
        <br />
        <br />
        <Button>Kết thúc</Button>
        <br />
        <br />
        <Button>Đăng ký nghỉ phép</Button>
        <br />
        <br />
        <Button size="medium">Bắt đầu</Button>
        <br />
        <br />
        <Button color="green" size="small">
          Yes
        </Button>
        <br />
        <br />
        <Button color="red" size="small">
          No
        </Button>
        <br />
        <br />
        <ButtonDelete />
        <br />
        <br />
        <ButtonEdit href='/'/>
        <br />
        <br />
        <ButtonCenter>
          <Button color="green" size="medium">
            Xuất Thẻ Giờ
          </Button>
          <Button>Đăng ký nghỉ phép</Button>
        </ButtonCenter>
        <br />
        <br />
        <ButtonCenter>
          <Button color="green" size="medium">
            Xuất Thẻ Giờ
          </Button>
        </ButtonCenter>

        {/* Màu Nền */}
        <h2 className="hdg-lv2">Màu Nền</h2>
        <br />
        <div className="box-bg">
          <p className="bg bg-yellow">Đang chờ xác nhận nghỉ phép</p>
          <br />
          <br />
          <p className="bg bg-green">Xác nhận nghỉ phép</p>
          <br />
          <br />
          <p className="bg bg-purple">Nghỉ lễ</p>
          <br />
          <br />
          <p className="bg bg-red">
            <span className="bg-text">Không xác nhận nghỉ phép</span>
            <span className="bg-red__btn">
              <button className="btn btn-white">Hủy bỏ nghỉ phép</button>
            </span>
          </p>
        </div>

        {/* TABLE */}
        <h2 className="hdg-lv2">TABLE</h2>
        <TablePage />

        {/* IMAGE */}
        {/* <h2 className="hdg-lv2">IMAGE</h2>
        <img
          src={require('../../assets/images/icon-home.png')}
          alt="phantu.dev"
          className="fluid-image"
        />
        <img
          src={require('../../assets/images/icon-home-active.png')}
          alt="phantu.dev"
          className="fluid-image"
        /> */}

        {/* Dashboard */}
        <h2 className="hdg-lv2">Dashboard</h2>
        <Dashboard />
        <TableCalendar />

        {/* Form User*/}
        <h2 className="hdg-lv2">Form User</h2>
        <FormUser />

        <AddEditMember />
        {/* login from */}
        <h2 className="hdg-lv2">login form</h2>
        <FormLogin />
        {/* leave from */}
        <h2 className="hdg-lv2">leave form</h2>
        <FormLeave />
        <h2 className="hdg-lv2">Quản lý nhóm</h2>
        <br />
        <br />
        <AddGroup />
        <br />
        <br />
        <h2 className="hdg-lv2">Thẻ giờ</h2>
        <div className="card-box">
          <div className="card-box--center">
            <h4>Giờ vào</h4>
            <CardTime />
            <button className="btn btn--widthAuto">Cập nhật</button>
          </div>
          <div className="card-box--center">
            <h4>Giờ ra</h4>
            <CardTime />
            <button className="btn btn--widthAuto">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>
  );
};
