import { Button, Button2 } from '../../components/Button/Button';

export const Module = () => {
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
        <Button />
        <Button2 />

        {/* TABLE */}
        <h2 className="hdg-lv2">TABLE</h2>

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

        {/* Form */}
        <h2 className="hdg-lv2">Form</h2>
      </div>
    </div>
  );
};
