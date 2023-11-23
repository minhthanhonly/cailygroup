import { FromLogin, FromUser } from '../../components/Form/Form';

import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonThird,
  ButtonEdited,
  IconApprove,
} from '../../components/Button/Button';
import { Dashboard } from '../../components/Dashboard/Dashboard';

import TablePage from '../../components/Table/Table';
import TableCalendar from '../../components/Dashboard/date';

export const Module = () => {
  // props table colum
  // let ArrayTable = [ { index: 1, Textcolum: 'Ngày Tháng'},{index: 2, Textcolum: 'Thứ'}, { index: 3, Textcolum: 'tháng'},{ index: 4,  Textcolum: 'hi'}, { index: 5,  Textcolum: 'cột 5'},{ index: 6, Textcolum: 'cột 6'}];

  return (
    <div>
      <div className="wrp-container">
        <h2 className="hdg-lv2">HEADING H2</h2>
        {/* HEADING */}
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus velit
          exercitationem hic incidunt ex repellendus, deserunt at asperiores
          reprehenderit atque, vel dolore, similique eveniet quasi culpa.
          Facilis culpa nisi odio?
        </p>

        {/* BUTTON */}
        <h2 className="hdg-lv2">BUTTON</h2>
        {/* <Button />
        <Button2 /> */}
        <ButtonPrimary />
        <br />
        <ButtonSecondary />
        <br />
        <ButtonThird />

        <ButtonEdited />
        <IconApprove />
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

        {/* Form */}
        <h2 className="hdg-lv2">Form</h2>
        <FromUser />
        {/* login from */}
        <h2 className="hdg-lv2">login from</h2>
        <FromLogin />
      </div>
    </div>
  );
};