
import { PublicRoutes } from './routes';
import { config } from './routes/router';

export default function App() {
  return <PublicRoutes routes={config} />;
}
