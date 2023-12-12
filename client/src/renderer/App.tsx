import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './routes';
import { config } from './routes/router';

export default function App() {
  return (
    <Router basename="/index.html">
      <PublicRoutes routes={config} />
    </Router>
  );
}
