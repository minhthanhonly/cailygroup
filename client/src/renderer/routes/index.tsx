import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';

type PublicRoutesProps = {
  routes: {
    path: string;
    component: any;
    layout?: any | null;
  }[];
};

export const PublicRoutes = (props: PublicRoutesProps) => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {props.routes.map((route) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};
