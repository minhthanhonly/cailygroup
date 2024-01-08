import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import './DefaultLayout.scss';

export default function DefaultLayout() {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="container">
        <div className="content"><Outlet/></div>
      </div>
    </div>
  );
};
