import Sidebar from '../components/Sidebar/Sidebar';

function DefaultLayout({ children }: { children: any }) {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
