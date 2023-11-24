import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Fragment } from 'react';

type PublicRoutesProps = {
  routes: {
    path: string;
    component: string;
    layout?: any | null;
  }[];
};

export const PublicRoutes = (props: PublicRoutesProps) => {
  return (
    <Router basename="/index.html">
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
