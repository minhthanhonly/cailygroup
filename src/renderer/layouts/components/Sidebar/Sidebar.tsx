import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/module" style={{ padding: 5 }}>
          Module
        </Link>
      </nav>
    </div>
  );
};
