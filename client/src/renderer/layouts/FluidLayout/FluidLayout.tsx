import { Outlet } from "react-router-dom";

export default function FluidLayout() {
  return (
    <div className="wrapper">
      <div className="container-fluid"><Outlet/></div>
    </div>
  );
};
