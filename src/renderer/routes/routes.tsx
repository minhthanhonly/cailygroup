import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Sidebar } from '../layouts/components/Sidebar/Sidebar';

type PublicRoutesProps = {
  routes: {
    path: string;
    component: any;
  }[];
};

export const PublicRoutes = (props: PublicRoutesProps) => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          {props.routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};
