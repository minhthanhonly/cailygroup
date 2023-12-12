import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { useEffect, useState } from 'react';

type PublicRoutesProps = {
  routes: {
    path: string;
    component: any;
    layout?: any | null;
    isPrivate?: boolean;
  }[];
};

export const PublicRoutes = (props: PublicRoutesProps) => {
  const [user, setUser] = useState(null);
  const [redirected, setRedirected] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false); // Người dùng đã đăng nhập
    } else {
      setLoading(false); // Người dùng chưa đăng nhập
      navigate('/login');
    }
  }, [navigate]);

  const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
    useEffect(() => {
      if (!user && !redirected && !loading) {
        setRedirected(true);
        navigate('/login');
      }
    }, [user, redirected, loading]);

    return element;
  };

  useEffect(() => {
    if (loading) {
      console.log('Đang trong quá trình loading...');
      return;
    }
  }, [loading]);

  return (
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
                <PrivateRoute
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};
