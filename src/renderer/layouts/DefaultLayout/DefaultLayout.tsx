import { Sidebar } from '../components/Sidebar/Sidebar';

type DefaultLayoutProps = {
  children?: string;
};

export const DefaultLayout = (prop: DefaultLayoutProps) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="container">
        <div className="content">{prop.children}</div>
      </div>
    </div>
  );
};
