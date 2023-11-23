import { Sidebar } from '../components/Sidebar/Sidebar';
import './DefaultLayout.scss';

type DefaultLayoutProps = {
  children?: React.ReactNode;
};

export const DefaultLayout = (prop: DefaultLayoutProps) => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="container">
        <div className="content">{prop.children}</div>
      </div>
    </div>
  );
};
